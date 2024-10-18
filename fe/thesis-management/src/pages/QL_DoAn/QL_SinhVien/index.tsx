import React, { useEffect, useState } from 'react'
import { Card, Table, Button, Popconfirm, Row, Col, Input, Space, Typography, Divider, message, Upload,Form } from 'antd'
import { DeleteOutlined, SearchOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import ReusableModal from '../../../components/UI/Modal'
import { SinhVienForm } from '../../../components/QLDoAnComponent/QLSinhVien/form'
import { COLUMS } from '../../../components/QLDoAnComponent/QLSinhVien/table'
import { SinhVien } from "../../../components/InterFace"
import * as XLSX from 'xlsx'
import {getAll,addSinhVien,delSinhVien,editSinhVien} from '../../../sevices/Api/QL_SinhVien-servives'
import moment from 'moment';

const { Title } = Typography



export default function QuanLySinhVien() {
  const [sinhVien,setsinhVien]=useState<SinhVien[]>([]);
  const [form] = Form.useForm();
  const [hienModal, setHienModal] = useState(false);
  const [keyDangSua, setKeyDangSua] = useState<string | null>(null);
  const [cacDongDaChon, setCacDongDaChon] = useState<React.Key[]>([]);
  const [timKiem, setTimKiem] = useState('');

  useEffect(()=>{
    document.title="Quản lý sinh viên";
    getAllSinhVien();
  },[])

  const getAllSinhVien= async()=>{
      getAll().then((data)=>setsinhVien(data));
  }
  const hienThiModal = (banGhi?: SinhVien) => {
    form.resetFields();
    if (banGhi) {
        const ngaySinhValue = banGhi.ngaySinh ? moment(banGhi.ngaySinh) : null;
        form.setFieldsValue({ ...banGhi, ngaySinh: ngaySinhValue });
        setKeyDangSua(banGhi.maSinhVien);
    } else {
        setKeyDangSua(null);
    }
    setHienModal(true);
  };
  
  const xuLyDongY = async () => {
    try {
      const giatri = await form.validateFields();
      if (keyDangSua !== null) {
        const kq = await editSinhVien(giatri, getAllSinhVien);
        message.success(kq.data);
      } else {
        const kq = await addSinhVien(giatri, getAllSinhVien);
        message.success(kq.data);
      }
      setHienModal(false);
      form.resetFields();
      setKeyDangSua(null);
    } catch (error) {
      message.error("Có lỗi xảy ra! Vui lòng thử lại.");
    }
  };
  
  const xuLyXoa = async (maSinhVien: string) => {
    let kq = await delSinhVien(maSinhVien, getAllSinhVien);
    message.success(`Đã xóa thành công sinh viên ${kq.data}`);
  };
  const cotBang = COLUMS(hienThiModal, xuLyXoa)

  const chonDong = (cacKeyChon: React.Key[]) => {
    setCacDongDaChon(cacKeyChon);
  };
  const luaChonDong = {
    selectedRowKeys: cacDongDaChon,
    onChange: chonDong,
  }
 const xuLyXoaNhieu = () => {
    
    message.success(`Xóa thành công!`);
  };
 
  const xuLyNhapExcel = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer)
      const workbook = XLSX.read(data, { type: 'array' })
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      const jsonData = XLSX.utils.sheet_to_json(worksheet) as SinhVien[]

  
      const duLieuMoi = jsonData.map((item, index) => ({
        ...item,
        key: sinhVien.length + index + 1,
      }))
    
      setsinhVien((sinhVienHienTai) => [...sinhVienHienTai, ...duLieuMoi])
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
            QUẢN LÝ SINH VIÊN
          </Title>
          <hr />
          <Row gutter={16} className="mb-6">
            <Col xs={24} sm={24} md={16} lg={18} xl={18}>
              <Input
                placeholder="Tìm kiếm theo mã lớp hoặc tên sinh viên"
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
                    title={`Bạn có chắc chắn muốn xóa ${cacDongDaChon.length} sinh viên đã chọn?`}
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
                  Thêm Sinh Viên
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
            dataSource={sinhVien}
            rowKey="maSinhVien"
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
        add_Titel="Thêm Sinh Viên Mới"
        update_Titel="Chỉnh sửa Sinh Viên"
      >
        <SinhVienForm formdulieu={form} />
      </ReusableModal>
    </div>
  )
}