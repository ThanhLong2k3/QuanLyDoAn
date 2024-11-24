import React, { useEffect, useState,useCallback } from 'react'
import { Card, Table, Button, Popconfirm, Row, Col, Input, Space, Typography, Divider, message, Upload,Form } from 'antd'
import { DeleteOutlined, SearchOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import ReusableModal from '../../../components/UI/Modal'
import { FormGiangVien } from '../../../components/QLDoAnComponent/QLGiangVien/form'
import { COLUMS } from '../../../components/QLDoAnComponent/QLGiangVien/table'
import { GiangVien } from "../../../components/InterFace"
import * as XLSX from 'xlsx'
import {getAll,editGiangVien,addGiangVien,delGiangVien} from '../../../sevices/Api/QL_GiangVien-servives'
import moment from 'moment';

const { Title } = Typography


export default function QuanLygiangvien() {
  const [giangVien, setGiangVien] = useState<GiangVien[]>([]);
  const [form] = Form.useForm();
  const [hienModal, setHienModal] = useState(false);
  const [keyDangSua, setKeyDangSua] = useState<string | null>(null);
  const [cacDongDaChon, setCacDongDaChon] = useState<React.Key[]>([]);
  const [timKiem, setTimKiem] = useState('');

  useEffect(() => {
    document.title = 'Quản lý cán bộ, giảng viên'
    getAllGiangVien()
  }, [])

  const getAllGiangVien = () => {
    getAll().then((data) => setGiangVien(data))
  }

  const xuLyXoa = async (maGiangVien: string) => {
    let kq = await delGiangVien(maGiangVien, getAllGiangVien);
    console.log(kq);
    debugger;
    message.success(`Đã xóa thành công giảng viên ${kq.data}`);
  };

  const hienThiModal = useCallback(
    (banGhi?: GiangVien) => {
      form.resetFields();
      if (banGhi) {
        const ngaySinhValue = banGhi.ngaySinh ? moment(banGhi.ngaySinh) : null;
        form.setFieldsValue({ ...banGhi, ngaySinh: ngaySinhValue });
        setKeyDangSua(banGhi.maGiangVien);
        
      } else {
        setKeyDangSua(null);
      }
      setHienModal(true);
    },
    [form]
  );

  const xuLyDongY = async () => {
    const giatri = await form.validateFields();
    if (keyDangSua !== null) {
      let kq = await editGiangVien(giatri, getAllGiangVien);
      message.success(kq.data);
    }
    else {
      let kq = await addGiangVien(giatri, getAllGiangVien);
      message.success(kq.data);
    }
    setHienModal(false);
    form.resetFields();
    setKeyDangSua(null);
  };

  const cotBang = COLUMS(hienThiModal, xuLyXoa);

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
        key: giangVien.length + index + 1,
      }))
      
      console.log(duLieuMoi);
    }
    reader.readAsArrayBuffer(file)
    return false 
  }

  const chonDong = (cacKeyChon: React.Key[]) => {
    setCacDongDaChon(cacKeyChon);
  };

  const luaChonDong = {
    selectedRowKeys: cacDongDaChon,
    onChange: chonDong,
  };

  const xuLyXoaNhieu = () => {
    
    message.success(`Xóa thành công!`);
  };

  

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
            dataSource={giangVien}
            rowKey="maGiangVien"
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