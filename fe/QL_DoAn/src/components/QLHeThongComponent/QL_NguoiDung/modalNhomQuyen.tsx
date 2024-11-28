import React, { useState } from 'react';
import { Modal, Card, Table, Button, Input, Typography, Space } from 'antd';
import { DeleteOutlined, UserAddOutlined, SearchOutlined } from '@ant-design/icons';
import {NhomQuyen} from "../../InterFace";

interface ModalThemQuyenProps {
  hienmodalphanquyen: boolean;
  setHienModal: (visible: boolean) => void;
  NhomQuyen: NhomQuyen[];
  selectedQuyen: NhomQuyen[];
  handleAddQuyen: (user: NhomQuyen) => void;
  handleRemoveQuyen: (maQuyen: string) => void;
  themQuyen: () => void;
}

const { Title } = Typography;

const ModalQuyen: React.FC<ModalThemQuyenProps> = ({
  hienmodalphanquyen,
  setHienModal,
  NhomQuyen,
  selectedQuyen,
  handleAddQuyen,
  handleRemoveQuyen,
  themQuyen,
}) => {
  const [searchText, setSearchText] = useState('');

  const filteredQuyen = NhomQuyen.filter(nhomquyen => 
    nhomquyen.tenNhomQuyen.toLowerCase().includes(searchText.toLowerCase()) ||
    nhomquyen.maNhomQuyen.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'Mã nhóm quyền',
      dataIndex: 'maNhomQuyen',
      key: 'maNhomQuyen',
      width: '40%',
    },
    {
      title: 'Tên nhóm quyền',
      dataIndex: 'tenNhomQuyen',
      key: 'tenNhomQuyen',
      width: '40%',
      ellipsis: true,
    },
    {
      title: 'Thao Tác',
      key: 'action',
      width: '20%',
      render: (text: string, nhomquyen: NhomQuyen) => (
        <Button
          type="primary"
          size="small"
          icon={<UserAddOutlined />}
          onClick={() => handleAddQuyen(nhomquyen)}
          disabled={selectedQuyen.some(q => q.maNhomQuyen === nhomquyen.maNhomQuyen)}
        >
          Thêm
        </Button>
      ),
    },
  ];

  const columnsSelected = [
    {
      title: 'Mã nhóm quyền',
      dataIndex: 'maNhomQuyen',
      key: 'maNhomQuyen',
      width: '40%',
    },
    {
      title: 'Tên nhóm quyền',
      dataIndex: 'tenNhomQuyen',
      key: 'tenNhomQuyen',
      width: '40%',
      ellipsis: true,
    },
    {
      title: 'Thao Tác',
      key: 'action',
      width: '20%',
      render: (text: string, nhomquyen: NhomQuyen) => (
        <Button
          type="primary"
          danger
          size="small"
          icon={<DeleteOutlined />}
          onClick={() => handleRemoveQuyen(nhomquyen.maNhomQuyen)}
        >
          Xóa
        </Button>
      ),
    },
  ];

  return (
    <Modal
      title={
        <Title level={3} style={{ margin: 0 }}>
          <UserAddOutlined /> Nhóm Quyền
        </Title>
      }
      open={hienmodalphanquyen}
      onOk={themQuyen}
      onCancel={() => setHienModal(false)}
      width={1200}
      okText="Xác nhận"
      cancelText="Hủy"
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Input
          placeholder="Tìm kiếm quyền..."
          prefix={<SearchOutlined />}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginBottom: '16px' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '24px' }}>
          <Card
            title={<Title level={4}>Danh sách nhóm quyền</Title>}
            style={{ width: '50%' }}
          >
            <Table
              dataSource={filteredQuyen}
              columns={columns}
              rowKey="maQuyen"
              pagination={{ pageSize: 6 }}
              size="small"
            />
          </Card>
          <Card
            title={<Title level={4}>Nhóm quyền đã chọn</Title>}
            style={{ width: '50%' }}
          >
            <Table
              dataSource={selectedQuyen}
              columns={columnsSelected}
              rowKey="maQuyen"
              pagination={{ pageSize: 6 }}
              size="small"
            />
          </Card>
        </div>
      </Space>
    </Modal>
  );
};

export default ModalQuyen;