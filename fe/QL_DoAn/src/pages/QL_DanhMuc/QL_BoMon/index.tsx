import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Popconfirm, Row, Col, Input, Space, Typography, Divider, Form, message } from 'antd';
import { DeleteOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import ReusableModal from '../../../components/UI/Modal';
import { COLUMS } from '../../../components/UI/Table';
import { FormBoMon } from '../../../components/QLDanhMucComponent/QL_BoMon/QL_BoMonForm';
import { cotBoMon } from '../../../components/QLDanhMucComponent/QL_BoMon/TableBoMon';
import { BoMon } from "../../../components/InterFace";
import { getAll_BoMon, addBoMon, delBoMon, editBoMon } from "../../../sevices/Api/QL_DanhMuc/QL_BoMon-servives";

const { Title } = Typography;

const QuanLyBoMon: React.FC = () => {
  const [listBoMon, setBoMon] = useState<BoMon[]>([]);
  const [hienModal, setHienModal] = useState(false);
  const [form] = Form.useForm();
  const [keyDangSua, setKeyDangSua] = useState<string | null>(null);
  const [timKiem, setTimKiem] = useState("");
  const [duLieuLoc, setDuLieuLoc] = useState<BoMon[]>([]);
  const [cacDongDaChon, setCacDongDaChon] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(true);

  const GetAll_BoMon = async () => {
    try {
      setLoading(true);
      const response = await getAll_BoMon();
      if (response ) {
        setBoMon(response);
      } else {
        setBoMon([]);
        message.error("Không có dữ liệu bộ môn.");
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu bộ môn:", error);
      message.error("Không thể lấy dữ liệu bộ môn. Vui lòng thử lại sau.");
      setBoMon([]);
    } finally {
      setLoading(false);
    }
  };

  const hienThiModal = (banGhi?: BoMon) => {
    form.resetFields();
    if (banGhi) {
      form.setFieldsValue(banGhi);
      setKeyDangSua(banGhi.maBoMon);
    } else {
      setKeyDangSua(null);
    }
    setHienModal(true);
  };

  useEffect(() => {
    document.title = 'Quản lý bộ môn';
    GetAll_BoMon();
  }, []);

  useEffect(() => {
    const ketQuaLoc = listBoMon.filter(
      (hv) =>
        hv.tenBoMon.toLowerCase().includes(timKiem.toLowerCase()) ||
        hv.tenKhoa.toLowerCase().includes(timKiem.toLowerCase())
    );
    setDuLieuLoc(ketQuaLoc);
  }, [listBoMon, timKiem]);

  const xuLyDongY = async () => {
    try {
      const giaTri = await form.validateFields();
      if (keyDangSua !== null) {
        console.log(keyDangSua);
        await editBoMon(giaTri, GetAll_BoMon);
      
      } else {
        await addBoMon(giaTri, GetAll_BoMon);
      }
      setHienModal(false);
      form.resetFields();
      setKeyDangSua(null);
    } catch (error) {
      console.error("Lỗi khi lưu dữ liệu:", error);
      message.error("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  const xuLyXoa = async (banGhi: BoMon) => {
    try {
      await delBoMon(banGhi.maBoMon, GetAll_BoMon);
    } catch (error) {
      console.error("Lỗi khi xóa dữ liệu:", error);
      message.error("Không thể xóa bộ môn. Vui lòng thử lại.");
    }
  };

  const cotBang = COLUMS(cotBoMon, hienThiModal, xuLyXoa);

  const luaChonDong = {
    selectedRowKeys: cacDongDaChon,
    onChange: (cacKeyChon: React.Key[]) => setCacDongDaChon(cacKeyChon),
  };

  const xuLyXoaNhieu = async () => {
    try {
      await Promise.all(cacDongDaChon.map((key) => delBoMon(key.toString(), GetAll_BoMon)));
      setCacDongDaChon([]);
      message.success(`${cacDongDaChon.length} bộ môn đã được xóa thành công!`);
      await GetAll_BoMon();
    } catch (error) {
      console.error("Lỗi khi xóa nhiều bộ môn:", error);
      message.error("Có lỗi xảy ra khi xóa bộ môn. Vui lòng thử lại.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Card className="shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <Title level={2} className="text-center mb-8" style={{color: '#1e88e5', fontSize: '25px', fontWeight: 'bold'}}>
            QUẢN LÝ BỘ MÔN
          </Title>
          <Divider />
          <Row gutter={16} className="mb-6">
            <Col xs={24} sm={24} md={16} lg={18} xl={18}>
              <Input
                placeholder="Tìm kiếm theo tên bộ môn hoặc ký hiệu"
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
                    title={`Bạn có chắc chắn muốn xóa ${cacDongDaChon.length} bộ môn đã chọn?`}
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
                  Thêm bộ môn
                </Button>
              </Space>
            </Col>
          </Row>
          <Table
            rowSelection={luaChonDong}
            columns={cotBang}
            
            dataSource={duLieuLoc}
            rowKey="maBoMon"
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
        add_Titel="Thêm bộ môn mới"
        update_Titel="Chỉnh sửa bộ môn"
      >
        <FormBoMon formdulieu={form} />
      </ReusableModal>
    </div>
  );
};

export default QuanLyBoMon;

