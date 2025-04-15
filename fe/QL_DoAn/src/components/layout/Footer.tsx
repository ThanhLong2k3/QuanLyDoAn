import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const AppFooter: React.FC = () => {
  return (
    <Footer style={{ textAlign: 'center', background: '#f0f2f5' }}>
      Nghiên cứu Khoa Học - Đại học Sư phạm Kỹ thuật Hưng Yên ©2023
    </Footer>
  );
}

export default AppFooter;

export {};