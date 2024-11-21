import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const Students: React.FC = () => {
  return (
    <div>
      <Title level={2}>Quản lý Sinh viên</Title>
      {/* Thêm nội dung quản lý sinh viên ở đây */}
    </div>
  );
}

export default Students;

export {};