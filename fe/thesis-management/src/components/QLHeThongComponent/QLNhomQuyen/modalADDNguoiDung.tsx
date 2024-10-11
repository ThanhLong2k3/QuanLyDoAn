import React, { useState } from 'react';
import { Modal, Card, Table, Button, Input, Typography, Space } from 'antd';
import { DeleteOutlined, UserAddOutlined, SearchOutlined } from '@ant-design/icons';
import { NguoiDung } from '../../InterFace';

const { Title } = Typography;

interface ModalProps {
  hienmodalnguoidung: boolean;
  setHienModal: (visible: boolean) => void;
  nguoiDung: NguoiDung[];
  selectedUsers: NguoiDung[];
  handleAddUser: (user: NguoiDung) => void;
  handleRemoveUser: (taiKhoan: string) => void;
  themNguoiDung: () => void;
}

const ModalThemNguoiDung: React.FC<ModalProps> = ({
  hienmodalnguoidung,
  setHienModal,
  nguoiDung,
  selectedUsers,
  handleAddUser,
  handleRemoveUser,
  themNguoiDung,
}) => {
  const [searchText, setSearchText] = useState('');

  const filteredNguoiDung = nguoiDung.filter(user => 
    user.hoTen.toLowerCase().includes(searchText.toLowerCase()) ||
    user.taiKhoan.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'Tài Khoản',
      dataIndex: 'taiKhoan',
      key: 'taiKhoan',
      width: '30%',
    },
    {
      title: 'Họ Tên',
      dataIndex: 'hoTen',
      key: 'hoTen',
      width: '30%',
    },
    {
      title: 'Mô tả',
      dataIndex: 'moTa',
      key: 'moTa',
      width: '30%',
      ellipsis: true,
    },
    {
      title: 'Thao Tác',
      key: 'action',
      width: '10%',
      render: (text: string, user: NguoiDung) => (
        <Button
          type="primary"
          size="small"
          icon={<UserAddOutlined />}
          onClick={() => handleAddUser(user)}
          disabled={selectedUsers.some(u => u.taiKhoan === user.taiKhoan)}
        />
         
      ),
    },
  ];

  const columnsSelected = [
    {
      title: 'Tài Khoản',
      dataIndex: 'taiKhoan',
      key: 'taiKhoan',
      width: '30%',
    },
    {
      title: 'Họ Tên',
      dataIndex: 'hoTen',
      key: 'hoTen',
      width: '30%',
    },
    {
      title: 'Mô tả',
      dataIndex: 'moTa',
      key: 'moTa',
      width: '30%',
      ellipsis: true,
    },
    {
      title: 'Thao Tác',
      key: 'action',
      width: '10%',
      render: (text: string, user: NguoiDung) => (
        <Button
          type="primary"
          danger
          size="small"
          icon={<DeleteOutlined />}
          onClick={() => handleRemoveUser(user.taiKhoan)}
        />
      ),
    },
  ];

  return (
    <Modal
      title={
        <Title level={3} style={{ margin: 0 }}>
          <UserAddOutlined /> Thêm người dùng vào nhóm quyền
        </Title>
      }
      open={hienmodalnguoidung}
      onOk={themNguoiDung}
      onCancel={() => setHienModal(false)}
      width={1200}
      bodyStyle={{ padding: '24px' }}
      okText="Xác nhận"
      cancelText="Hủy"
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Input
          placeholder="Tìm kiếm người dùng..."
          prefix={<SearchOutlined />}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginBottom: '16px' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '24px' }}>
          <Card
            title={<Title level={4}>Danh sách người dùng</Title>}
            style={{ width: '50%' }}
            bodyStyle={{ padding: 0 }}
          >
            <Table
              dataSource={filteredNguoiDung}
              columns={columns}
              rowKey="taiKhoan"
              pagination={{ pageSize: 6 }}
              size="small"
            />
          </Card>
          <Card
            title={<Title level={4}>Người dùng đã chọn</Title>}
            style={{ width: '50%' }}
            bodyStyle={{ padding: 0 }}
          >
            <Table
              dataSource={selectedUsers}
              columns={columnsSelected}
              rowKey="taiKhoan"
              pagination={{ pageSize: 5 }}
              size="small"
            />
          </Card>
        </div>
      </Space>
    </Modal>
  );
};

export default ModalThemNguoiDung;