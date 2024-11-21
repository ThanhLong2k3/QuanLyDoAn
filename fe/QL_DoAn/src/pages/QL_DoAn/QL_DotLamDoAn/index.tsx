import React, { useEffect, useState } from 'react'
import { Card, Table, Button, Popconfirm, Row, Col, Input, Space, Typography, Divider} from 'antd'
import { DeleteOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons'
import { useQuanLyDuLieu } from '../../../ultils/hook'
import ReusableModal from '../../../components/UI/Modal'
import { columDotLamDoAn } from '../../../components/QLDoAnComponent/QLDotLamDoAn/table'
import { FormDotLamDoAn } from '../../../components/QLDoAnComponent/QLDotLamDoAn/form'
import { DotLamDoAn } from "../../../components/InterFace"

const { Title } = Typography

const dotBatDau: DotLamDoAn[] = [
  {
    key:1,
    maDot:"DOT1",
    tenDot:"Đồ án 1",
    ngayBatDau:"10/8/2024",
    namApDung:"2024-2025",
    dangKyDeTai:true,
    choPhepSinhVienDangKyGiangVienKhacBoMon:true,
    choPhepGiangVienBaoCaoKhacTuanHienTai:true,
    choPhepSinhVienBaoCaoKhacTuanHienTai:true,
    ChoPhepGiangVienSuaDeTai:true,
    trangThai:true,
  },
  {
    key:2,
    maDot:"DOT2",
    tenDot:"Đồ án 2",
    ngayBatDau:"10/8/2024",
    namApDung:"2024-2025",
    dangKyDeTai:true,
    choPhepSinhVienDangKyGiangVienKhacBoMon:false,
    choPhepGiangVienBaoCaoKhacTuanHienTai:true,
    choPhepSinhVienBaoCaoKhacTuanHienTai:true,
    ChoPhepGiangVienSuaDeTai:true,
    trangThai:true,
  },
]

export default function QuanLyDotLamDoAn() {
  const {
    duLieu: dotlamdoan,
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
  } = useQuanLyDuLieu<DotLamDoAn>({
    duLieuBanDau: dotBatDau,
    khoaLuuTru: 'utehy_dotlamdoan',
  })

  const [timKiem, setTimKiem] = useState("")
  const [duLieuLoc, setDuLieuLoc] = useState(dotlamdoan)

  useEffect(() => {
    document.title = 'Quản lý đợt làm đồ án'
  }, [])

  useEffect(() => {
    const ketQuaLoc = dotlamdoan.filter(
      (hv) =>
        hv.tenDot.toLowerCase().includes(timKiem.toLowerCase()) ||
        hv.maDot.toLowerCase().includes(timKiem.toLowerCase())
    )
    setDuLieuLoc(ketQuaLoc)
  }, [dotlamdoan, timKiem])

  const cotBang=columDotLamDoAn(hienThiModal,xuLyXoa)
  const luaChonDong = {
    selectedRowKeys: cacDongDaChon,
    onChange: chonDong,
  }


  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Card className="shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <Title level={2} className="text-center custom-blue mb-8" style={{color: '#1e88e5', fontSize: '25px', fontWeight: 'bold'}}>
            QUẢN LÝ ĐỢT LÀM ĐỒ ÁN
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
                    title={`Bạn có chắc chắn muốn xóa ${cacDongDaChon.length} đợt đã chọn?`}
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
                  Thêm đợt làm đồ án
                </Button>
               
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
        add_Titel="Thêm đợt làm đồ án"
        update_Titel="Sửa đợt làm đồ án"
      >
        <FormDotLamDoAn formdulieu={form} />
      </ReusableModal>
    </div>
  )
}