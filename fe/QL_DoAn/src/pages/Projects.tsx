import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const Projects: React.FC = () => {
  return (
    <div>
      <Title level={2}>Quản lý Đồ án</Title>
      {/* Thêm nội dung quản lý đồ án ở đây */}
    </div>
  );
}

export default Projects;

export {};