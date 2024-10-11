import React, { useEffect, useState } from "react";
import { Card, Table, Button, Popconfirm, Row, Col, Input, Select, Space, Typography, Divider,Form ,message,Modal,List} from "antd";
import { NhomQuyen,NguoiDung } from "../../../components/InterFace";
import ReusableModal from "../../../components/UI/Modal";
import { FormNhomQuyen } from "../../../components/QLHeThongComponent/QLNhomQuyen/form";
import { columNhomQuyen } from "../../../components/QLHeThongComponent/QLNhomQuyen/table";
import { DeleteOutlined, SearchOutlined, UserAddOutlined, FilterOutlined } from "@ant-design/icons";
import { getall,add,edit,Delete } from "../../../sevices/Api/nguoiDung-servives";
import {URL} from "../../../sevices/Url"

const { Option } = Select;
const { Title } = Typography;


  
const QuanLyNhomQuuyen: React.FC = () => {
  const [nguoiDung,setNguoiDung]=useState<NguoiDung[]>([]);
  const [nhomQuyen, setNhomQuyen] = useState<NhomQuyen[]>([]);
  const [timKiem, setTimKiem] = useState("");
  const [hienModal, setHienModal] = useState(false);
  const [hienmodalnguoidung, setHienModalNguoiDung] = useState(false);

  const [form] = Form.useForm();
  const [cacDongDaChon, setCacDongDaChon] = useState<React.Key[]>([]);
  const [trangThai, setTrangThai] = useState<string | null>(null);
  const [keyDangSua, setKeyDangSua] = useState<string | null>(null);
  const [duLieuLoc, setDuLieuLoc] = useState(nhomQuyen);
  const [selectedUsers, setSelectedUsers] = useState<NguoiDung[]>([]);

  useEffect(() => {
    document.title = 'Quản lý nhóm quyền';
    getAllNhomQuyen();
  }, []);

  const getAllNhomQuyen = async()=>{
    try {
      const res = await getall(URL.QLHETHONG.QLNHOMQUYEN.GETALL);
      setNhomQuyen(res);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    // const ketQuaLoc = nhomQuyen.filter(
    //   (quyen) =>
    //     (quyen.tenNhomQuyen.toLowerCase().includes(timKiem.toLowerCase()) ||
    //   quyen.maNhomQuyen.toLowerCase().includes(timKiem.toLowerCase())) &&
    //     (trangThai === null || quyen.trangThai === trangThai)
    // );
    // setDuLieuLoc(ketQuaLoc);
  }, [nhomQuyen, timKiem, trangThai]);

  const themNguoiDung=()=>{
    console.log("Người dùng đã chọn:", selectedUsers);
    setHienModalNguoiDung(false);
  }
  const capNhapNguoiDung = () => {
    debugger;
  };

  useEffect(() => {
    const fetchUsers = async () => {
      if (hienmodalnguoidung) {
        try {
          const data = await getall(URL.QLHETHONG.QLNGUOIDUNG.GETALL);
          setNguoiDung(data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      }
    };
    fetchUsers();
  }, [hienmodalnguoidung]); 

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
    debugger;
        await Delete(URL.QLHETHONG.QLNHOMQUYEN.DELETE(maNhomQuyen),getAllNhomQuyen);
        message.success(`xóa thành công!`);
  }
  const xuLyXoaNhieu =()=>{

  }
  const xuLyDongY =async () => {
    const giatri= await form.validateFields();
     if (keyDangSua !== null) {
         await edit(URL.QLHETHONG.QLNHOMQUYEN.UPDATE,giatri,getAllNhomQuyen);
         message.success(` sửa thành công!`);

     } else {
       await add(URL.QLHETHONG.QLNHOMQUYEN.ADD,giatri,getAllNhomQuyen);
     }
     setHienModal(false);
     form.resetFields();
     setKeyDangSua(null);
   
 };
  const cotBang = columNhomQuyen( hienThiModal, xuLyXoa,capNhapNguoiDung);
  const chonDong = (cacKeyChon: React.Key[]) => {
    setCacDongDaChon(cacKeyChon);
  };

  const luaChonDong = {
    selectedRowKeys: cacDongDaChon,
    onChange: chonDong,
  };
  const handleAddUser = (user: typeof nguoiDung[0]) => {
    setSelectedUsers(prev => [...prev, user]);
  };

  const handleRemoveUser = (userId: string) => {
    setSelectedUsers(prev => prev.filter(user => user.taiKhoan !== userId));
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
      <Modal
        title="Thêm người dùng vào nhóm quyền"
        open={hienmodalnguoidung}
        onOk={themNguoiDung}
        onCancel={() => setHienModal(false)}
        width={800}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Card title="Danh sách người dùng" style={{ width: '48%' }}>
            <List
              dataSource={nguoiDung}
              renderItem={user => (
                <List.Item
                  key={user.taiKhoan}
                  actions={[
                    <Button
                      type="link"
                      onClick={() => handleAddUser(user)}
                      disabled={selectedUsers.some(u => u.taiKhoan === user.taiKhoan)}
                    >
                      Thêm
                    </Button>
                  ]}
                >
                  {user.hoTen}
                </List.Item>
              )}
            />
          </Card>
          <Card title="Người dùng đã chọn" style={{ width: '48%' }}>
            <List
              dataSource={selectedUsers}
              renderItem={user => (
                <List.Item
                  key={user.taiKhoan}
                  actions={[
                    <Button
                      type="link"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleRemoveUser(user.taiKhoan)}
                    />
                  ]}
                >
                  {user.hoTen}
                </List.Item>
              )}
            />
          </Card>
        </div>
      </Modal>
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