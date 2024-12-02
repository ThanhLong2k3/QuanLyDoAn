import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Popconfirm, Row, Col, Input, Space, Typography, Divider, Form, message } from 'antd';
import { DeleteOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import ReusableModal from '../../../components/UI/Modal';
import { COLUMS } from '../../../components/UI/Table';
import { FormKhoa } from '../../../components/QLDanhMucComponent/QL_Khoa/QL_FromKhoa';
import { cotKhoa } from '../../../components/QLDanhMucComponent/QL_Khoa/TableKhoa';
import { Khoa } from "../../../components/InterFace";
import { getAll_Khoa, addKhoa, delKhoa, editKhoa } from "../../../sevices/Api/QL_DanhMuc/QL_Khoa-sevives";

const { Title } = Typography;

const QuanLyKhoa: React.FC = () => {
  const [listKhoa, setKhoa] = useState<Khoa[]>([]);
  const [hienModal, setHienModal] = useState(false);
  const [form] = Form.useForm();
  const [keyDangSua, setKeyDangSua] = useState<string | null>(null);
  const [timKiem, setTimKiem] = useState("");
  const [duLieuLoc, setDuLieuLoc] = useState<Khoa[]>([]);
  const [cacDongDaChon, setCacDongDaChon] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(true);

  const GetAll_Khoa = async () => {
    try {
      setLoading(true);
      const response = await getAll_Khoa();
      if (response ) {
        setKhoa(response);
      } else {
        setKhoa([]);
        message.error("Không có dữ liệu Khoa.");
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu Khoa:", error);
      message.error("Không thể lấy dữ liệu Khoa. Vui lòng thử lại sau.");
      setKhoa([]);
    } finally {
      setLoading(false);
    }
  };

  const hienThiModal = (banGhi?: Khoa) => {
    form.resetFields();
    if (banGhi) {
      form.setFieldsValue(banGhi);
      setKeyDangSua(banGhi.maKhoa);
    } else {
      setKeyDangSua(null);
    }
    setHienModal(true);
  };

  useEffect(() => {
    document.title = 'Quản lý khoa';
    GetAll_Khoa();
  }, []);

  useEffect(() => {
    const ketQuaLoc = listKhoa.filter(
      (hv) =>
        hv.tenKhoa.toLowerCase().includes(timKiem.toLowerCase())  );
    setDuLieuLoc(ketQuaLoc);
  }, [listKhoa, timKiem]);

  const xuLyDongY = async () => {
    try {
      const giaTri = await form.validateFields();
      if (keyDangSua !== null) {
        const Khoa:Khoa={
          ...giaTri,
          maKhoa:keyDangSua,
      }
        await editKhoa(Khoa, GetAll_Khoa);
      } else {
        await addKhoa(giaTri, GetAll_Khoa);
      }
      setHienModal(false);
      form.resetFields();
      setKeyDangSua(null);
    } catch (error) {
      console.error("Lỗi khi lưu dữ liệu:", error);
      message.error("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  const xuLyXoa = async (banGhi: Khoa) => {
    try {
      debugger;
      await delKhoa(banGhi.maKhoa, GetAll_Khoa);
    } catch (error) {
      console.error("Lỗi khi xóa dữ liệu:", error);
      message.error("Không thể xóa Khoa. Vui lòng thử lại.");
    }
  };

  const cotBang = COLUMS(cotKhoa, hienThiModal, xuLyXoa);

  const luaChonDong = {
    selectedRowKeys: cacDongDaChon,
    onChange: (cacKeyChon: React.Key[]) => setCacDongDaChon(cacKeyChon),
  };

  const xuLyXoaNhieu = async () => {
    try {
      await Promise.all(cacDongDaChon.map((key) => delKhoa(key.toString(), GetAll_Khoa)));
      setCacDongDaChon([]);
      message.success(`${cacDongDaChon.length} Khoa đã được xóa thành công!`);
      await GetAll_Khoa();
    } catch (error) {
      console.error("Lỗi khi xóa nhiều Khoa:", error);
      message.error("Có lỗi xảy ra khi xóa Khoa. Vui lòng thử lại.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Card className="shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <Title level={2} className="text-center mb-8" style={{color: '#1e88e5', fontSize: '25px', fontWeight: 'bold'}}>
            QUẢN LÝ KHOA
          </Title>
          <Divider />
          <Row gutter={16} className="mb-6">
            <Col xs={24} sm={24} md={16} lg={18} xl={18}>
              <Input
                placeholder="Tìm kiếm theo tên Khoa hoặc ký hiệu"
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
                    title={`Bạn có chắc chắn muốn xóa ${cacDongDaChon.length} Khoa đã chọn?`}
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
                  Thêm Khoa
                </Button>
              </Space>
            </Col>
          </Row>
          <Table
            rowSelection={luaChonDong}
            columns={cotBang}
            dataSource={duLieuLoc}
            rowKey="maKhoa"
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
        onCancel={() => setHienModal(false)}
        keyDangSua={keyDangSua}
        add_Titel="Thêm Khoa mới"
        update_Titel="Chỉnh sửa Khoa"
      >
        <FormKhoa formdulieu={form} />
      </ReusableModal>
    </div>
  );
};

export default QuanLyKhoa;

