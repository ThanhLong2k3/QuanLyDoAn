import React, { useEffect, useState } from 'react'
import { Card, Table, Button, Popconfirm, Row, Col, Input, Space, Typography, Divider, message, Upload } from 'antd'
import { DeleteOutlined, SearchOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { useQuanLyDuLieu } from '../../../ultils/hook'
import ReusableModal from '../../../components/UI/Modal'
import { COLUMS } from '../../../components/UI/Table'
import { FormGiangVien } from '../../../components/QLDoAnComponent/QLGiangVien/form'
import { CotGiangVien } from '../../../components/QLDoAnComponent/QLGiangVien/table'
import { GiangVien } from "../../../components/InterFace"
import * as XLSX from 'xlsx'

const { Title } = Typography

const giangVienBatDau: GiangVien[] = [
  {
    key: 1,
    maGiangVien:1689,
    tenGiangVien:"Đặng Việt Hưng",
    tenBoMon:"Khoa học máy tính",
    chucVu:"Giảng viên",
    tenHocVi:"Thạc sĩ",
    SDT:"0966348117",
    email:"dangviethung1107@gmail.com",
  },
  {
    key: 2,
    maGiangVien:1248,
    tenGiangVien:"Nguyễn Minh Tiến",
    tenBoMon:"Khoa học máy tính",
    chucVu:"Giảng viên",
    tenHocVi:"Tiến sĩ",
    tenHocHam:"Phó giáo sư",
    SDT:"0983860318",
    email:"minhtienhy@gmail.com",
  },
]

export default function QuanLygiangvien() {
  const {
    duLieu: giangvien,
    setDuLieu: setgiangvien,
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
  } = useQuanLyDuLieu<GiangVien>({
    duLieuBanDau: giangVienBatDau,
    khoaLuuTru: 'utehy_giangvien',
  })

  const [timKiem, setTimKiem] = useState("")
  const [duLieuLoc, setDuLieuLoc] = useState(giangvien)

  useEffect(() => {
    document.title = 'Quản lý cán bộ, giảng viên'
  }, [])

  useEffect(() => {
    const ketQuaLoc = giangvien.filter(
      (hv) =>
        hv.tenBoMon.toLowerCase().includes(timKiem.toLowerCase()) ||
        hv.tenGiangVien.toLowerCase().includes(timKiem.toLowerCase())
    )
    setDuLieuLoc(ketQuaLoc)
  }, [giangvien, timKiem])

  const cotBang = COLUMS(CotGiangVien, hienThiModal, xuLyXoa)

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
      const jsonData = XLSX.utils.sheet_to_json(worksheet) as GiangVien[]

  
      const duLieuMoi = jsonData.map((item, index) => ({
        ...item,
        key: giangvien.length + index + 1,
      }))
    
      setgiangvien((giangvienHienTai) => [...giangvienHienTai, ...duLieuMoi])
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
            QUẢN LÝ CÁN BỘ, GIẢNG VIÊN
           </Title>
          <hr />
          <Row gutter={16} className="mb-6">
            <Col xs={22} sm={22} md={14} lg={16} xl={16}>
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
                    title={`Bạn có chắc chắn muốn xóa ${cacDongDaChon.length} giảng viên đã chọn?`}
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
                  Thêm cán bộ, giảng viên
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
        add_Titel="Thêm cán bộ, giảng viên"
        update_Titel="Sửa cán bộ, giảng viên "
      >
        <FormGiangVien formdulieu={form} />
      </ReusableModal>
    </div>
  )
}