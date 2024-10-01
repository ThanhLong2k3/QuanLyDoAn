import React, { useEffect, useState } from "react";
import { Card, Table, Button, Popconfirm, Row, Col, Input, Select, Space, Typography, Divider } from "antd";
import { NguoiDung } from "../../../components/InterFace";
import ReusableModal from "../../../components/UI/Modal";
import { FormNguoiDung } from "../../../components/QLDanhMuc/QL_Lop/QL_LopForm";
import { COLUMS } from "../../../components/UI/Table";
import { ButtomADD } from "../../../components/UI/Button";
import { ColumLop } from "../../../components/QLDanhMuc/QL_Lop/TableLop";
import { DeleteOutlined, SearchOutlined, UserAddOutlined, FilterOutlined } from "@ant-design/icons";
import { useQuanLyDuLieu } from '../../../ultils/hook';

const { Option } = Select;
const { Title } = Typography;

const nguoiDungBanDau: NguoiDung[] = [
  {
    key: 1,
    tk: '10621306',
    ten: 'Phạm Thanh Long',
    ngaySinh: new Date(2003, 3, 30),
    gioiTinh: 'Nam',
    email: 'jaykergg@gmail.com',
    moTa: 'Sinh Viên',
    trangThai: "Đã Xét Duyệt"
  },
  {
    key: 2,
    tk: '10621307',
    ten: 'Nguyễn Thanh Huy',
    ngaySinh: new Date(2002, 11, 15),
    gioiTinh: 'Nam',
    email: 'phong.nguyen@gmail.com',
    moTa: 'Sinh Viên',
    trangThai: "Đã Xét Duyệt"
  },
];

const QuanLyNguoiDung: React.FC = () => {
  const {
    duLieu: nguoiDung,
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
  } = useQuanLyDuLieu<NguoiDung>({
    duLieuBanDau: nguoiDungBanDau,
    khoaLuuTru: 'utehy_nguoidung',
  });

  const [timKiem, setTimKiem] = useState("");
  const [trangThai, setTrangThai] = useState<string | null>(null);
  const [duLieuLoc, setDuLieuLoc] = useState(nguoiDung);

  useEffect(() => {
    document.title = 'Quản lý người dùng';
  }, []);

  useEffect(() => {
    const ketQuaLoc = nguoiDung.filter(
      (nguoi) =>
        (nguoi.ten.toLowerCase().includes(timKiem.toLowerCase()) ||
         nguoi.tk.toLowerCase().includes(timKiem.toLowerCase())) &&
        (trangThai === null || nguoi.trangThai === trangThai)
    );
    setDuLieuLoc(ketQuaLoc);
  }, [nguoiDung, timKiem, trangThai]);

  const cotBang = COLUMS(ColumLop, hienThiModal, xuLyXoa);

  const luaChonDong = {
    selectedRowKeys: cacDongDaChon,
    onChange: chonDong,
  };

  return (
    <>
      <Card className="  overflow-hidden">
        <div className="p-6">
        <Title level={2} className="text-center custom-blue mb-8">
            Quản lý người dùng
        </Title>
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
                  Thêm người dùng
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
        add_Titel="Thêm Người Dùng"
        update_Titel="Chỉnh Sửa Người Dùng"
      >
        <FormNguoiDung formdulieu={form} />
      </ReusableModal>
      </>
  );
};

export default QuanLyNguoiDung;