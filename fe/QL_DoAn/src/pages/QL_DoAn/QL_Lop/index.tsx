import React, { useEffect, useState, useCallback } from 'react'
import { Card, Table, Button, Popconfirm, Row, Col, Input, Space, Typography, Divider, message, Upload, Form } from 'antd'
import { DeleteOutlined, SearchOutlined, PlusOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons'
import ReusableModal from '../../../components/UI/Modal'
import { COLUMS } from '../../../components/QLDoAnComponent/QLLop/Table'
import { FormLop } from '../../../components/QLDoAnComponent/QLLop/form'
import { Lop } from "../../../components/InterFace"
import { getAll, addLop, delLop, editLop } from "../../../sevices/Api/QL_DoAn/QL_Lop-servives"
import * as XLSX from 'xlsx'

const { Title } = Typography

export default function QuanLyLop() {
  const [lop, setLop] = useState<Lop[]>([]);
  const [form] = Form.useForm();
  const [hienModal, setHienModal] = useState(false);
  const [keyDangSua, setKeyDangSua] = useState<string | null>(null);
  const [cacDongDaChon, setCacDongDaChon] = useState<React.Key[]>([]);
  const [timKiem, setTimKiem] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    document.title = 'Quản lý lớp'
    getAllLop()
  }, [])

  const getAllLop =async () => {
    try{
      const data = await getAll();
      setLop(data);
    }
    catch{
      message.error("Lỗi Sever!");
    }
    finally {
      setLoading(false);
    }
  }

  const xuLyXoa = async (maLop: string) => {
    await delLop(maLop, getAllLop);
    
  };

  const hienThiModal = useCallback(
    (banGhi?: Lop) => {
      form.resetFields();
      if (banGhi) {
        form.setFieldsValue(banGhi);
        setKeyDangSua(banGhi.maLop);
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
      await editLop(giatri, getAllLop);
      
    }
    else {
      await addLop(giatri, getAllLop);
      
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
      const jsonData = XLSX.utils.sheet_to_json(worksheet) as Lop[]

      const duLieuMoi = jsonData.map((item, index) => ({
        ...item,
        key: lop.length + index + 1,
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

  const xulyXoaNhieu = async() => {
    for(let i=0;i<cacDongDaChon.length;i++)
    {
      await xuLyXoa(cacDongDaChon[i].toString());
    }
    setCacDongDaChon([]);
  };

  const xuLyXuatExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(lop);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách lớp");
    XLSX.writeFile(workbook, "danh_sach_lop.xlsx");
    message.success("Xuất Excel thành công!");
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Card className="shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <Title level={2} className="text-center custom-blue mb-8" style={{color: '#1e88e5', fontSize: '25px', fontWeight: 'bold'}}>
            QUẢN LÝ LỚP
          </Title>
          <hr />
          <Row gutter={16} className="mb-6">
            <Col xs={16} sm={16} md={8} lg={6} xl={6}>
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
                    onConfirm={xulyXoaNhieu}
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
                   <Button icon={<DownloadOutlined />}>Nhập Excel</Button>
                </Upload>
                <Button 
                  icon={< UploadOutlined />} 
                  onClick={xuLyXuatExcel}
                >
                  Xuất Excel
                </Button>
              </Space>
            </Col>
          </Row>
          <Divider className="my-6" />
          <Table
            rowSelection={luaChonDong}
            columns={cotBang}
            dataSource={lop}
            loading={loading}
            rowKey="maLop"
            scroll={{ x: 768 }}
            className="shadow-sm rounded-md overflow-hidden"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
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