import React, { useState,useRef,useCallback } from 'react';
import { Modal, Card, Table, Button, Input, Typography, Space } from 'antd';
import { DeleteOutlined, UserAddOutlined, SearchOutlined } from '@ant-design/icons';
import { DotLamDoAn_GiangVien } from "../../InterFace";

interface ModalThemGiangVien {
  hienmodalGiangVien: boolean;
  setHienModal: (visible: boolean) => void;
  GiangVien: DotLamDoAn_GiangVien[];
  selectedGiangVien: DotLamDoAn_GiangVien[];
  handleAddGiangVien: (user: DotLamDoAn_GiangVien) => void;
  handleRemoveGiangVien: (maDot: string, maGiangVien: string) => void;
  themGiangVien: () => void;
  updateSelectedGiangVien: (updatedGiangVien: DotLamDoAn_GiangVien[]) => void;
}

const { Title } = Typography;

const Modal_GiangVien_Dot: React.FC<ModalThemGiangVien> = ({
  hienmodalGiangVien,
  setHienModal,
  GiangVien,
  selectedGiangVien,
  handleAddGiangVien,
  handleRemoveGiangVien,
  themGiangVien,
  updateSelectedGiangVien,
}) => {
  const [searchText, setSearchText] = useState('');
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const filteredGiangVien = GiangVien.filter(giangVien => 
    giangVien.maGiangVien.toLowerCase().includes(searchText.toLowerCase()) ||
    giangVien.tenGiangVien.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleUpdateSoLuongHuongDan = useCallback(async (maGiangVien: string, soLuongHuongDan: number) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
  
    debounceTimeoutRef.current = setTimeout(() => {
      const updatedGiangVien = selectedGiangVien.map(gv => 
        gv.maGiangVien === maGiangVien ? { ...gv, soLuongHuongDan } : gv
      );
      updateSelectedGiangVien(updatedGiangVien);
    }, 3000);
  }, [selectedGiangVien, updateSelectedGiangVien]);

  const columns = [
    {
      title: 'Mã giảng viên',
      dataIndex: 'maGiangVien',
      key: 'maGiangVien',
    },
    {
      title: 'Tên giảng viên',
      dataIndex: 'tenGiangVien',
      key: 'tenGiangVien',
      ellipsis: true,
    },
    {
      title: 'Số lượng hướng dẫn',
      dataIndex: 'soLuongHuongDan',
      key: 'soLuongHuongDan',
      ellipsis: true,
    },
    {
      title: 'Thao Tác',
      key: 'action',
      width: '20%',
      render: (text: string, record: DotLamDoAn_GiangVien) => (
        <Button
          type="primary"
          size="small"
          icon={<UserAddOutlined />}
          onClick={() => handleAddGiangVien(record)}
          disabled={selectedGiangVien.some(q => q.maGiangVien === record.maGiangVien)}
        >
          Thêm
        </Button>
      ),
    },
  ];

  const columnsSelected = [
    {
      title: 'Mã giảng viên',
      dataIndex: 'maGiangVien',
      key: 'maGiangVien',
      width: '30%',
    },
    {
      title: 'Tên giảng viên',
      dataIndex: 'tenGiangVien',
      key: 'tenGiangVien',
      width: '30%',
      ellipsis: true,
    },
    {
      title: 'Số lượng hướng dẫn',
      dataIndex: 'soLuongHuongDan',
      key: 'soLuongHuongDan',
      width: '25%',
      render: (text: string, record: DotLamDoAn_GiangVien) => (
        <Input
          type="number"
          defaultValue={record.soLuongHuongDan}
          onChange={(e) => handleUpdateSoLuongHuongDan(record.maGiangVien, parseInt(e.target.value, 10))}
          style={{ width: '100%' }}
        />
      ),
    },
    {
      title: 'Thao Tác',
      key: 'action',
      width: '15%',
      render: (text: string, record: DotLamDoAn_GiangVien) => (
        <Button
          type="primary"
          danger
          size="small"
          icon={<DeleteOutlined />}
          onClick={() => handleRemoveGiangVien(record.maDot, record.maGiangVien)}
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
          <UserAddOutlined /> Quản lý giảng viên - Đợt làm đồ án
        </Title>
      }
      open={hienmodalGiangVien}
      onOk={themGiangVien}
      onCancel={() => setHienModal(false)}
      width={1200}
      okText="Xác nhận"
      cancelText="Hủy"
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Input
          placeholder="Tìm kiếm giảng viên..."
          prefix={<SearchOutlined />}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginBottom: '16px' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '24px' }}>
          <Card
            title={<Title level={4}>Danh sách giảng viên</Title>}
            style={{ width: '50%' }}
          >
            <Table
              dataSource={filteredGiangVien}
              columns={columns}
              rowKey="maGiangVien"
              pagination={{ pageSize: 6 }}
              size="small"
            />
          </Card>
          <Card
            title={<Title level={4}>Giảng viên đã chọn</Title>}
            style={{ width: '50%' }}
          >
            <Table
              dataSource={selectedGiangVien}
              columns={columnsSelected}
              rowKey="maGiangVien"
              pagination={{ pageSize: 6 }}
              size="small"
            />
          </Card>
        </div>
      </Space>
    </Modal>
  );
};

export default Modal_GiangVien_Dot;

