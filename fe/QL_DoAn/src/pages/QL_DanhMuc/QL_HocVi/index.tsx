import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Popconfirm, Row, Col, Input, Space, Typography, Divider, Form, message } from 'antd';
import { DeleteOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import ReusableModal from '../../../components/UI/Modal';
import { COLUMS } from '../../../components/UI/Table';
import { FormHocVi } from '../../../components/QLDanhMucComponent/QL_HocVi/QL_HocViForm';
import { cotHocVi } from '../../../components/QLDanhMucComponent/QL_HocVi/TableHocVi';
import { HocVi } from "../../../components/InterFace";
import { getAll_HocVi, addHocVi, delHocVi, editHocVi } from "../../../sevices/Api/QL_DanhMuc/QL_HocVi-servives";

const { Title } = Typography;

const QuanLyHocVi: React.FC = () => {
  const [listHocVi, setHocVi] = useState<HocVi[]>([]);
  const [hienModal, setHienModal] = useState(false);
  const [form] = Form.useForm();
  const [keyDangSua, setKeyDangSua] = useState<string | null>(null);
  const [timKiem, setTimKiem] = useState("");
  const [duLieuLoc, setDuLieuLoc] = useState<HocVi[]>([]);
  const [cacDongDaChon, setCacDongDaChon] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(true);

  const GetALL_HocVi = async () => {
    try {
      setLoading(true);
      const response = await getAll_HocVi();
      if (response ) {
        setHocVi(response);
      } else {
        setHocVi([]);
        message.error("Không có dữ liệu học vị.");
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu học vị:", error);
      message.error("Không thể lấy dữ liệu học vị. Vui lòng thử lại sau.");
      setHocVi([]);
    } finally {
      setLoading(false);
    }
  };

  const hienThiModal = (banGhi?: HocVi) => {
    form.resetFields();
    if (banGhi) {
      form.setFieldsValue(banGhi);
      setKeyDangSua(banGhi.maHocHam_HocVi);
    } else {
      setKeyDangSua(null);
    }
    setHienModal(true);
  };

  useEffect(() => {
    document.title = 'Quản lý học vị';
    GetALL_HocVi();
  }, []);

  useEffect(() => {
    const ketQuaLoc = listHocVi.filter(
      (hv) =>
        hv.tenHocVi.toLowerCase().includes(timKiem.toLowerCase()) ||
        hv.kyHieu.toLowerCase().includes(timKiem.toLowerCase())
    );
    setDuLieuLoc(ketQuaLoc);
  }, [listHocVi, timKiem]);

  const xuLyDongY = async () => {
    try {
      debugger;
      const giaTri = await form.validateFields();
      if (keyDangSua !== null) {
        const HocVi:HocVi={
          ...giaTri,
          maHocVi:keyDangSua,
       
      }
        await editHocVi(HocVi, GetALL_HocVi);
      } else {
        const HocVi:HocVi={
            ...giaTri,
            hocHam_HocVi:1
        }
        await addHocVi(HocVi, GetALL_HocVi);
      }
      setHienModal(false);
      form.resetFields();
      setKeyDangSua(null);
    } catch (error) {
      console.error("Lỗi khi lưu dữ liệu:", error);
      message.error("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  const xuLyXoa = async (banGhi: HocVi) => {
    try {
      await delHocVi(banGhi.maHocHam_HocVi, GetALL_HocVi);
    } catch (error) {
      console.error("Lỗi khi xóa dữ liệu:", error);
      message.error("Không thể xóa học vị. Vui lòng thử lại.");
    }
  };

  const cotBang = COLUMS(cotHocVi, hienThiModal, xuLyXoa);

  const luaChonDong = {
    selectedRowKeys: cacDongDaChon,
    onChange: (cacKeyChon: React.Key[]) => setCacDongDaChon(cacKeyChon),
  };

  const xuLyXoaNhieu = async () => {
    try {
      await Promise.all(cacDongDaChon.map((key) => delHocVi(key.toString(), GetALL_HocVi)));
      setCacDongDaChon([]);
      message.success(`${cacDongDaChon.length} học vị đã được xóa thành công!`);
      await GetALL_HocVi();
    } catch (error) {
      console.error("Lỗi khi xóa nhiều học vị:", error);
      message.error("Có lỗi xảy ra khi xóa học vị. Vui lòng thử lại.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Card className="shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <Title level={2} className="text-center mb-8" style={{color: '#1e88e5', fontSize: '25px', fontWeight: 'bold'}}>
            QUẢN LÝ HỌC VỊ
          </Title>
          <Divider />
          <Row gutter={16} className="mb-6">
            <Col xs={24} sm={24} md={16} lg={18} xl={18}>
              <Input
                placeholder="Tìm kiếm theo tên học vị hoặc ký hiệu"
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
                    title={`Bạn có chắc chắn muốn xóa ${cacDongDaChon.length} học vị đã chọn?`}
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
                  Thêm Học Vị
                </Button>
              </Space>
            </Col>
          </Row>
          <Table
            rowSelection={luaChonDong}
            columns={cotBang}
            dataSource={duLieuLoc}
            rowKey="maHocHam_HocVi"
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
        add_Titel="Thêm Học vị mới"
        update_Titel="Chỉnh sửa Học vị"
      >
        <FormHocVi formdulieu={form} />
      </ReusableModal>
    </div>
  );
};

export default QuanLyHocVi;

