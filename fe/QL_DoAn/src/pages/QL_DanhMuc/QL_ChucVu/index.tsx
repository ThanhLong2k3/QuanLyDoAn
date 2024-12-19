import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Popconfirm, Row, Col, Input, Space, Typography, Divider, Form, message } from 'antd';
import { DeleteOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import ReusableModal from '../../../components/UI/Modal';
import { COLUMS } from '../../../components/UI/Table';
import { FormChucVu } from '../../../components/QLDanhMucComponent/QL_ChucVu/QL_FromChucVu';
import { cotChucVu } from '../../../components/QLDanhMucComponent/QL_ChucVu/TableChucVu';
import { ChucVu } from "../../../components/InterFace";
import { getAll_ChucVu, addChucVu, delChucVu, editChucVu } from "../../../sevices/Api/QL_DanhMuc/QL_ChucVu-sevives";

const { Title } = Typography;

const QuanLyChucVu: React.FC = () => {
  const [listChucVu, setChucVu] = useState<ChucVu[]>([]);
  const [hienModal, setHienModal] = useState(false);
  const [form] = Form.useForm();
  const [keyDangSua, setKeyDangSua] = useState<string | null>(null);
  const [timKiem, setTimKiem] = useState("");
  const [duLieuLoc, setDuLieuLoc] = useState<ChucVu[]>([]);
  const [cacDongDaChon, setCacDongDaChon] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const GetAll_ChucVu = async () => {
    try {
      setLoading(true);
      const response = await getAll_ChucVu();
      if (response ) {
        setChucVu(response);
      } else {
        setChucVu([]);
        message.error("Không có dữ liệu chức vụ.");
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu chức vụ:", error);
      message.error("Không thể lấy dữ liệu chức vụ. Vui lòng thử lại sau.");
      setChucVu([]);
    } finally {
      setLoading(false);
    }
  };
  const dongModal=()=>{
    setHienModal(false);
    setIsEditing(false);
  }
  const hienThiModal = (banGhi?: ChucVu) => {
    form.resetFields();
    if (banGhi) {
      form.setFieldsValue(banGhi);
      setIsEditing(true);
      setKeyDangSua(banGhi.maChucVu);
    } else {
      setKeyDangSua(null);
    }
    setHienModal(true);
  };

  useEffect(() => {
    document.title = 'Quản lý chức vụ';
    GetAll_ChucVu();
  }, []);

  useEffect(() => {
    const ketQuaLoc = listChucVu.filter(
      (hv) =>
        hv.tenChucVu.toLowerCase().includes(timKiem.toLowerCase())  );
    setDuLieuLoc(ketQuaLoc);
  }, [listChucVu, timKiem]);

  const xuLyDongY = async () => {
    try {
        debugger;
      const giaTri = await form.validateFields();
      if (keyDangSua !== null) {
        console.log(keyDangSua);
        await editChucVu(giaTri, GetAll_ChucVu);
      
      } else {
        await addChucVu(giaTri, GetAll_ChucVu);
      }
      setHienModal(false);
      form.resetFields();
      setKeyDangSua(null);
    } catch (error) {
      console.error("Lỗi khi lưu dữ liệu:", error);
      message.error("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  const xuLyXoa = async (banGhi: ChucVu) => {
    try {
      await delChucVu(banGhi.maChucVu, GetAll_ChucVu);
    } catch (error) {
      console.error("Lỗi khi xóa dữ liệu:", error);
      message.error("Không thể xóa chức vụ. Vui lòng thử lại.");
    }
  };

  const cotBang = COLUMS(cotChucVu, hienThiModal, xuLyXoa);

  const luaChonDong = {
    selectedRowKeys: cacDongDaChon,
    onChange: (cacKeyChon: React.Key[]) => setCacDongDaChon(cacKeyChon),
  };

  const xuLyXoaNhieu = async () => {
    try {
      await Promise.all(cacDongDaChon.map((key) => delChucVu(key.toString(), GetAll_ChucVu)));
      setCacDongDaChon([]);
      message.success(`${cacDongDaChon.length} chức vụ đã được xóa thành công!`);
      await GetAll_ChucVu();
    } catch (error) {
      console.error("Lỗi khi xóa nhiều chức vụ:", error);
      message.error("Có lỗi xảy ra khi xóa chức vụ. Vui lòng thử lại.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Card className="shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <Title level={2} className="text-center mb-8" style={{color: '#1e88e5', fontSize: '25px', fontWeight: 'bold'}}>
            QUẢN LÝ CHỨC VỤ
          </Title>
          <Divider />
          <Row gutter={16} className="mb-6">
            <Col xs={24} sm={24} md={16} lg={18} xl={18}>
              <Input
                placeholder="Tìm kiếm theo tên chức vụ hoặc ký hiệu"
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
                    title={`Bạn có chắc chắn muốn xóa ${cacDongDaChon.length} chức vụ đã chọn?`}
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
                  Thêm chức vụ
                </Button>
              </Space>
            </Col>
          </Row>
          <Table
            rowSelection={luaChonDong}
            columns={cotBang}
            dataSource={duLieuLoc}
            rowKey="maChucVu"
            scroll={{ x: 768 }}
            loading={loading}
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
        onCancel={dongModal}
        keyDangSua={keyDangSua}
        add_Titel="Thêm chức vụ mới"
        update_Titel="Chỉnh sửa chức vụ"
      >
        <FormChucVu  formdulieu={form} isEditing={isEditing} />
      </ReusableModal>
    </div>
  );
};

export default QuanLyChucVu;

