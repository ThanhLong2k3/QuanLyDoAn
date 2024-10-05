import React, { useEffect, useState } from 'react'
import { Card, Table, Button, Popconfirm, Row, Col, Input, Space, Typography, Divider, message, Upload } from 'antd'
import { DeleteOutlined, SearchOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { useQuanLyDuLieu } from '../../../ultils/hook'
import ReusableModal from '../../../components/UI/Modal'
import { COLUMS } from '../../../components/UI/Table'
import { FormLop } from '../../../components/QLDoAnComponent/QLLop/form'
import { cotLop } from '../../../components/QLDoAnComponent/QLLop/Table'
import { Lop } from "../../../components/InterFace"
import * as XLSX from 'xlsx'

const { Title } = Typography

const lopBatDau: Lop[] = [
  {
    key: 1,
    maLop: 125217,
    tenLop: "SEK19.7",
    tenChuyenNganh: "Công nghệ web",
    khoaHoc: "2021-2025",
  },
  {
    key: 2,
    maLop: 125211,
    tenLop: "SEK19.1",
    tenChuyenNganh: "Công nghệ web",
    khoaHoc: "2021-2025",
  },
]

export default function QuanLyLop() {
  const {
    duLieu: lop,
    setDuLieu: setLop,
    hienModal,
    setHienModal,
    form,
    keyDangSua,
    cacDongDaChon,
    hienThiModal,
    xuLyDongY,
    xuLyXoa,
    xuLyXoaNhieu,
    chonDong,
  } = useQuanLyDuLieu<Lop>({
    duLieuBanDau: lopBatDau,
    khoaLuuTru: 'utehy_lop',
  })

  const [timKiem, setTimKiem] = useState("")
  const [duLieuLoc, setDuLieuLoc] = useState(lop)

  useEffect(() => {
    document.title = 'Quản lý lớp'
  }, [])

  useEffect(() => {
    const ketQuaLoc = lop.filter(
      (hv) =>
        hv.tenLop.toLowerCase().includes(timKiem.toLowerCase()) ||
        hv.tenChuyenNganh.toLowerCase().includes(timKiem.toLowerCase())
    )
    setDuLieuLoc(ketQuaLoc)
  }, [lop, timKiem])

  const cotBang = COLUMS(cotLop, hienThiModal, xuLyXoa)

  const luaChonDong = {
    selectedRowKeys: cacDongDaChon,
    onChange: chonDong,
  }

  const xuLyNhapExcel = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer)
      const workbook = XLSX.read(data, { type: 'array' })
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      const jsonData = XLSX.utils.sheet_to_json(worksheet) as Lop[]

  
      const duLieuMoi = jsonData.map((item, index) => ({
        ...item,
        key: lop.length + index + 1,
      }))
    
      setLop((lopHienTai) => [...lopHienTai, ...duLieuMoi])
      message.success(`Đã nhập ${duLieuMoi.length} lớp từ file Excel`)
    }
    reader.readAsArrayBuffer(file)
    return false 
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Card className="shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <Title level={2} className="text-center custom-blue mb-8" style={{color: '#1e88e5', fontSize: '25px', fontWeight: 'bold'}}>
            QUẢN LÝ LỚP
          </Title>
          <hr />
          <Row gutter={16} className="mb-6">
            <Col xs={24} sm={24} md={16} lg={18} xl={18}>
              <Input
                placeholder="Tìm kiếm theo tên lớp hoặc chuyên ngành"
                value={timKiem}
                onChange={(e) => setTimKiem(e.target.value)}
                prefix={<SearchOutlined className="text-gray-400" />}
                className="w-full"
              />
            </Col>
            <Col xs={24} sm={24} md={8} lg={6} xl={6} className="flex justify-end">
              <Space>
                {cacDongDaChon.length > 0 && (
                  <Popconfirm
                    title={`Bạn có chắc chắn muốn xóa ${cacDongDaChon.length} lớp đã chọn?`}
                    onConfirm={xuLyXoaNhieu}
                    okText="Đồng ý"
                    cancelText="Hủy"
                  >
                    <Button type="primary" danger icon={<DeleteOutlined />}>
                      Xóa {cacDongDaChon.length} mục
                    </Button>
                  </Popconfirm>
                )}
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />} 
                  onClick={() => hienThiModal()}
                  className="bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600"
                >
                  Thêm Lớp
                </Button>
                <Upload
                  accept=".xlsx,.xls"
                  showUploadList={false}
                  beforeUpload={xuLyNhapExcel}
                >
                  <Button icon={<UploadOutlined />}>Nhập Excel</Button>
                </Upload>
              </Space>
            </Col>
          </Row>
          <Divider className="my-6" />
          <Table
            rowSelection={luaChonDong}
            columns={cotBang}
            dataSource={duLieuLoc}
            rowKey="key"
            scroll={{ x: 768 }}
            className="shadow-sm rounded-md overflow-hidden"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} mục`,
            }}
          />
        </div>
      </Card>
      <ReusableModal
        visible={hienModal}
        onOk={xuLyDongY}
        onCancel={() => setHienModal(false)}
        keyDangSua={keyDangSua}
        add_Titel="Thêm Lớp Mới"
        update_Titel="Chỉnh sửa Lớp"
      >
        <FormLop formdulieu={form} />
      </ReusableModal>
    </div>
  )
}