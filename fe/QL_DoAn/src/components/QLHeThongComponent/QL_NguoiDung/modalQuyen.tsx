import React, { useState } from 'react';
import { Modal, Card, Table, Button, Input, Typography, Space } from 'antd';
import { DeleteOutlined, UserAddOutlined, SearchOutlined } from '@ant-design/icons';

interface Quyen {
  maQuyen: string;
  tenQuyen: string;
}

interface ModalThemQuyenProps {
  hienmodalphanquyen: boolean;
  setHienModal: (visible: boolean) => void;
  quyenn: Quyen[];
  selectedQuyen: Quyen[];
  handleAddQuyen: (user: Quyen) => void;
  handleRemoveQuyen: (maQuyen: string) => void;
  themQuyen: () => void;
}

const { Title } = Typography;

const ModalQuyen: React.FC<ModalThemQuyenProps> = ({
  hienmodalphanquyen,
  setHienModal,
  quyenn,
  selectedQuyen,
  handleAddQuyen,
  handleRemoveQuyen,
  themQuyen,
}) => {
  const [searchText, setSearchText] = useState('');

  const filteredQuyen = quyenn.filter(quyen => 
    quyen.tenQuyen.toLowerCase().includes(searchText.toLowerCase()) ||
    quyen.maQuyen.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'Mã quyền',
      dataIndex: 'maQuyen',
      key: 'maQuyen',
      width: '40%',
    },
    {
      title: 'Tên quyền',
      dataIndex: 'tenQuyen',
      key: 'tenQuyen',
      width: '40%',
      ellipsis: true,
    },
    {
      title: 'Thao Tác',
      key: 'action',
      width: '20%',
      render: (text: string, quyen: Quyen) => (
        <Button
          type="primary"
          size="small"
          icon={<UserAddOutlined />}
          onClick={() => handleAddQuyen(quyen)}
          disabled={selectedQuyen.some(q => q.maQuyen === quyen.maQuyen)}
        >
          Thêm
        </Button>
      ),
    },
  ];

  const columnsSelected = [
    {
      title: 'Mã quyền',
      dataIndex: 'maQuyen',
      key: 'maQuyen',
      width: '40%',
    },
    {
      title: 'Tên quyền',
      dataIndex: 'tenQuyen',
      key: 'tenQuyen',
      width: '40%',
      ellipsis: true,
    },
    {
      title: 'Thao Tác',
      key: 'action',
      width: '20%',
      render: (text: string, quyen: Quyen) => (
        <Button
          type="primary"
          danger
          size="small"
          icon={<DeleteOutlined />}
          onClick={() => handleRemoveQuyen(quyen.maQuyen)}
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
          <UserAddOutlined /> Phân Quyền
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
            title={<Title level={4}>Danh sách quyền</Title>}
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
            title={<Title level={4}>Quyền đã chọn</Title>}
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