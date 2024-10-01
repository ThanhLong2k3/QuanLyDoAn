import React, { useEffect, useState } from "react";
import { Card, Table, Button, Popconfirm, Row, Col, Input, Select, Space, Typography, Divider } from "antd";
import { NhomQuyen } from "../../../components/InterFace";
import ReusableModal from "../../../components/UI/Modal";
import { FormNhomQuyen } from "../../../components/QLHeThong/QLNhomQuyen/form";
import { COLUMS } from "../../../components/UI/Table";
import { columNhomQuyen } from "../../../components/QLHeThong/QLNhomQuyen/table";
import { DeleteOutlined, SearchOutlined, UserAddOutlined, FilterOutlined } from "@ant-design/icons";
import { useQuanLyDuLieu } from '../../../ultils/hook';

const { Option } = Select;
const { Title } = Typography;

const nhomQuyenBanDau: NhomQuyen[] = [
    {
      key: 1,
      maNhomQuyen: 'Q01',
      tenNhomQuyen: 'Quản trị hệ thống',
      loai: 'Quản trị',
      moTa: 'Quyền quản trị toàn bộ hệ thống',
      soLuong: 5
    },
    {
      key: 2,
      maNhomQuyen: 'Q02',
      tenNhomQuyen: 'Người dùng thông thường',
      loai: 'Người dùng',
      moTa: 'Quyền sử dụng các tính năng cơ bản của hệ thống',
      soLuong: 50
    }
  ];
  
const QuanLyNhomQuuyen: React.FC = () => {
  const {
    duLieu: nhomQuyen,
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
  } = useQuanLyDuLieu<NhomQuyen>({
    duLieuBanDau: nhomQuyenBanDau,
    khoaLuuTru: 'utehy_nhomquyen',
  });

  const [timKiem, setTimKiem] = useState("");
  const [trangThai, setTrangThai] = useState<string | null>(null);
  const [duLieuLoc, setDuLieuLoc] = useState(nhomQuyen);

  useEffect(() => {
    document.title = 'Quản lý nhóm quyền';
  }, []);

  useEffect(() => {
    const ketQuaLoc = nhomQuyen.filter(
      (quyen) =>
        (quyen.tenNhomQuyen.toLowerCase().includes(timKiem.toLowerCase()) ||
      quyen.maNhomQuyen.toLowerCase().includes(timKiem.toLowerCase())) &&
        (trangThai === null || quyen.trangThai === trangThai)
    );
    setDuLieuLoc(ketQuaLoc);
  }, [nhomQuyen, timKiem, trangThai]);

  const cotBang = COLUMS(columNhomQuyen, hienThiModal, xuLyXoa);

  const luaChonDong = {
    selectedRowKeys: cacDongDaChon,
    onChange: chonDong,
  };

  return (
    <>
      <Card className="  overflow-hidden">
        <div className="p-6">
        <Title level={2} className="text-center custom-blue mb-8" style={{color: '#1e88e5', fontSize: '25px', fontWeight: 'bold' }}>
            QUẢN LÝ NHÓM QUYỀN
        </Title>
        <hr />
          <Row gutter={16} className="mb-6">
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Input
                placeholder="Tìm kiếm theo tên hoặc tài khoản"
                value={timKiem}
                onChange={(e) => setTimKiem(e.target.value)}
                prefix={<SearchOutlined className="text-gray-400" />}
                className="w-full"
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Select
                className="w-full"
                placeholder="Lọc theo trạng thái"
                allowClear
                onChange={(value) => setTrangThai(value)}
                suffixIcon={<FilterOutlined className="text-gray-400" />}

              >
                <Option value="Đã Xét Duyệt">Đã Xét Duyệt</Option>
                <Option value="Chưa Xét Duyệt">Chưa Xét Duyệt</Option>
              </Select>
            </Col>
            <Col xs={24} sm={24} md={24} lg={8} xl={8} className="flex justify-end">
              <Space>
                {cacDongDaChon.length > 0 && (
                  <Popconfirm
                    title={`Bạn có chắc chắn muốn xóa ${cacDongDaChon.length} người dùng đã chọn?`}
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
                  icon={<UserAddOutlined />} 
                  onClick={() => hienThiModal()}
                  className="bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600"
                >
                  Thêm nhóm quyền
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
        add_Titel="Thêm Nhóm Quyền"
        update_Titel="Chỉnh Sửa Nhóm Quyền"
        
      >
        <FormNhomQuyen formdulieu={form} />
      </ReusableModal>
      </>
  );
};

export default QuanLyNhomQuuyen;