import React, { useEffect, useState } from "react";
import { Card, Table, Button, Popconfirm, Row, Col, Input, Select, Space, Typography, Divider, Form, message } from "antd";
import { DeleteOutlined, SearchOutlined, UserAddOutlined, FilterOutlined } from "@ant-design/icons";
import { NhomQuyen, NguoiDung } from "../../../components/InterFace";
import ReusableModal from "../../../components/UI/Modal";
import { FormNhomQuyen } from "../../../components/QLHeThongComponent/QLNhomQuyen/form";
import { columNhomQuyen } from "../../../components/QLHeThongComponent/QLNhomQuyen/table";
import { getall, add, edit, Delete, add_Quyen, Delete_Quyen } from "../../../sevices/Api/nguoiDung-servives";
import { URL } from "../../../sevices/Url";
import ModalThemNguoiDung from "../../../components/QLHeThongComponent/QLNhomQuyen/modalADDNguoiDung";

const { Option } = Select;
const { Title } = Typography;

const QuanLyNhomQuyen: React.FC = () => {
  const [nguoiDung, setNguoiDung] = useState<NguoiDung[]>([]);
  const [nhomQuyen, setNhomQuyen] = useState<NhomQuyen[]>([]);
  const [timKiem, setTimKiem] = useState("");
  const [hienModal, setHienModal] = useState(false);
  const [manhomquyen, setMaNhomQuyen] = useState("");
  const [hienModalNguoiDung, setHienModalNguoiDung] = useState(false);
  const [form] = Form.useForm();
  const [cacDongDaChon, setCacDongDaChon] = useState<React.Key[]>([]);
  const [trangThai, setTrangThai] = useState<string | null>(null);
  const [keyDangSua, setKeyDangSua] = useState<string | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<NguoiDung[]>([]);

  useEffect(() => {
    document.title = 'Quản lý nhóm quyền';
    getAllNhomQuyen();
  }, []);

  const getAllNhomQuyen = async () => {
    try {
      const res = await getall(URL.QLHETHONG.QLNHOMQUYEN.GETALL);
      console.log(res);
      setNhomQuyen(res);
    } catch (error) {
      console.error(error);
    }
  };

  const themNguoiDung = async () => {
    setHienModalNguoiDung(false);
    const existingUsers = await getall(URL.QLHETHONG.NGUOIDUNG_NHOMQUYEN.GETBYMANHOMQUYEN(manhomquyen));
    
    for (const user of selectedUsers) {
      const giatri = {
        manhomquyen: manhomquyen,
        taiKhoan: user.taiKhoan
      };
      
      const isExisting = existingUsers.some((existingUser: NguoiDung) => existingUser.taiKhoan === giatri.taiKhoan);
      
      if (!isExisting) {
        await add_Quyen(URL.QLHETHONG.NGUOIDUNG_NHOMQUYEN.ADD, giatri);
      }
    }
    
    message.success("Thêm người dùng thành công!");
    getAllNhomQuyen();
  };

  const capNhapNguoiDung = async (maNhomQuyen: string) => {
    setMaNhomQuyen(maNhomQuyen);
    const nguoiDungOnNhom = await getall(URL.QLHETHONG.NGUOIDUNG_NHOMQUYEN.GETBYMANHOMQUYEN(maNhomQuyen));
    setSelectedUsers(nguoiDungOnNhom);
    setHienModalNguoiDung(true);
  };

  const handleRemoveUser = async (userId: string) => {
    setSelectedUsers(prev => prev.filter(user => user.taiKhoan !== userId));
    const giatri = {
      taiKhoan: userId,
      manhomquyen: manhomquyen
    };
    await Delete_Quyen(URL.QLHETHONG.NGUOIDUNG_NHOMQUYEN.DELETE, giatri);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      if (hienModalNguoiDung) {
        try {
          const data = await getall(URL.QLHETHONG.QLNGUOIDUNG.GETALL);
          setNguoiDung(data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      }
    };
    fetchUsers();
  }, [hienModalNguoiDung]);

  const hienThiModal = (banGhi?: NhomQuyen) => {
    form.resetFields();
    if (banGhi) {
      form.setFieldsValue(banGhi);
      setKeyDangSua(banGhi.maNhomQuyen);
    } else {
      setKeyDangSua(null);
    }
    setHienModal(true);
  };

  const xuLyXoa = async (maNhomQuyen: string) => {
    await Delete(URL.QLHETHONG.QLNHOMQUYEN.DELETE(maNhomQuyen), getAllNhomQuyen);
    message.success(`Xóa thành công!`);
  };

  const xuLyDongY = async () => {
    try {
      const giatri = await form.validateFields();
      if (keyDangSua !== null) {
        await edit(URL.QLHETHONG.QLNHOMQUYEN.UPDATE, giatri, getAllNhomQuyen);
        message.success(`Sửa thành công!`);
      } else {
        await add(URL.QLHETHONG.QLNHOMQUYEN.ADD, giatri, getAllNhomQuyen);
        message.success(`Thêm thành công!`);
      }
      setHienModal(false);
      form.resetFields();
      setKeyDangSua(null);
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  };

  const cotBang = columNhomQuyen(hienThiModal, xuLyXoa, capNhapNguoiDung);

  const handleAddUser = (user: NguoiDung) => {
    setSelectedUsers(prev => [...prev, user]);
  };

  return (
    <>
      <Card className="overflow-hidden">
        <div className="p-6">
          <Title level={2} className="text-center custom-blue mb-8" style={{color: '#1e88e5', fontSize: '25px', fontWeight: 'bold'}}>
            QUẢN LÝ NHÓM QUYỀN
          </Title>
          <Divider />
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
                    onConfirm={() => {/* Implement xuLyXoaNhieu function */}}
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
            rowSelection={{
              selectedRowKeys: cacDongDaChon,
              onChange: (selectedRowKeys: React.Key[]) => setCacDongDaChon(selectedRowKeys),
            }}
            columns={cotBang}
            dataSource={nhomQuyen}
            rowKey="maNhomQuyen"
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
      <ModalThemNguoiDung  
        hienmodalnguoidung={hienModalNguoiDung}
        setHienModal={setHienModalNguoiDung}
        nguoiDung={nguoiDung}
        selectedUsers={selectedUsers}
        handleAddUser={handleAddUser}
        handleRemoveUser={handleRemoveUser}
        themNguoiDung={themNguoiDung}
      />
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

export default QuanLyNhomQuyen;