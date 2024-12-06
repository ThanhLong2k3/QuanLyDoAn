import React, { useState,useRef,useCallback } from 'react';
import { Modal, Card, Table, Button, Input, Typography, Space } from 'antd';
import { DeleteOutlined, UserAddOutlined, SearchOutlined } from '@ant-design/icons';
import { DotLamDoAn_SinhVien } from "../../InterFace";

interface ModalThemSinhVien {
  hienmodalSinhVien: boolean;
  setHienModal: (visible: boolean) => void;
  SinhVien: DotLamDoAn_SinhVien[];
  selectedSinhVien: DotLamDoAn_SinhVien[];
  handleAddSinhVien: (user: DotLamDoAn_SinhVien) => void;
  handleRemoveSinhVien: (maDot: string, maSinhVien: string) => void;
  themSinhVien: () => void;
  
}

const { Title } = Typography;

const Modal_SinhVien_Dot: React.FC<ModalThemSinhVien> = ({
  hienmodalSinhVien,
  setHienModal,
  SinhVien,
  selectedSinhVien,
  handleAddSinhVien,
  handleRemoveSinhVien,
  themSinhVien,
  
}) => {
  const [searchText, setSearchText] = useState('');
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const filteredSinhVien = SinhVien.filter(SinhVien => 
    SinhVien.maSinhVien.toLowerCase().includes(searchText.toLowerCase()) ||
    SinhVien.tenSinhVien.toLowerCase().includes(searchText.toLowerCase())
  );

  
  const columns = [
    {
      title: 'Mã Lớp',
      dataIndex: 'maLop',
      key: 'maLop',
    },
    {
      title: 'Tên sinh viên',
      dataIndex: 'tenSinhVien',
      key: 'tenSinhVien',
      ellipsis: true,
    },
   
    {
      title: 'Thao Tác',
      key: 'action',
      width: '20%',
      render: (text: string, record: DotLamDoAn_SinhVien) => (
        <Button
          type="primary"
          size="small"
          icon={<UserAddOutlined />}
          onClick={() => handleAddSinhVien(record)}
          disabled={selectedSinhVien.some(q => q.maSinhVien === record.maSinhVien)}
        >
          Thêm
        </Button>
      ),
    },
  ];

  const columnsSelected = [
    {
        title: 'Mã Lớp',
        dataIndex: 'maLop',
        key: 'maLop',
      },
      {
        title: 'Tên sinh viên',
        dataIndex: 'tenSinhVien',
        key: 'tenSinhVien',
        ellipsis: true,
      },
    {
      title: 'Thao Tác',
      key: 'action',
      width: '15%',
      render: (text: string, record: DotLamDoAn_SinhVien) => (
        <Button
          type="primary"
          danger
          size="small"
          icon={<DeleteOutlined />}
          onClick={() => handleRemoveSinhVien(record.maDot, record.maSinhVien)}
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
          <UserAddOutlined /> Quản lý Sinh viên - Đợt làm đồ án
        </Title>
      }
      open={hienmodalSinhVien}
      onOk={themSinhVien}
      onCancel={() => setHienModal(false)}
      width={1200}
      okText="Xác nhận"
      cancelText="Hủy"
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Input
          placeholder="Tìm kiếm Sinh viên..."
          prefix={<SearchOutlined />}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginBottom: '16px' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '24px' }}>
          <Card
            title={<Title level={4}>Danh sách Sinh viên</Title>}
            style={{ width: '50%' }}
          >
            <Table
              dataSource={filteredSinhVien}
              columns={columns}
              rowKey="maSinhVien"
              pagination={{ pageSize: 10 }}
              size="small"
            />
          </Card>
          <Card
            title={<Title level={4}>Sinh viên đã chọn</Title>}
            style={{ width: '50%' }}
          >
            <Table
              dataSource={selectedSinhVien}
              columns={columnsSelected}
              rowKey="maSinhVien"
              pagination={{ pageSize: 10 }}
              size="small"
            />
          </Card>
        </div>
      </Space>
    </Modal>
  );
};

export default Modal_SinhVien_Dot;

