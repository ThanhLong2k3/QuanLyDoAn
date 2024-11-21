import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const Supervisors: React.FC = () => {
  return (
    <div>
      <Title level={2}>Quản lý Giảng viên</Title>
      {/* Thêm nội dung quản lý giảng viên ở đây */}
    </div>
  );
}

export default Supervisors;

export {};