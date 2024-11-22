import React from 'react';
import { Layout, MenuProps , Dropdown, Avatar } from 'antd';
import { UserOutlined, MenuOutlined } from '@ant-design/icons';

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const menuItems: MenuProps['items'] = [
    {
      key: '0',
      label: <a href="/profile">Hồ sơ</a>, // JSX.Element hợp lệ
    },
    {
      key: '1',
      label: <a href="/settings">Cài đặt</a>,
    },
    {
      type: 'divider', // Divider không cần key hoặc label
    },
    {
      key: '3',
      label: 'Đăng xuất',
    },
  ];

  return (
    <Header className="site-layout-background" style={{ padding: 0, background: '#fff', position: 'relative', zIndex: 1 }}>
      {/* Tên hệ thống */}
      <div style={{ float: 'left', color: '#1e88e5', fontSize: '18px', fontWeight: 'bold', marginLeft: '50px' }}>
        Hệ thống Quản lý Đồ án 
      </div>
      
      {/* Nút Hamburger chỉ hiện trên mobile */}
      <div className="menu-button" style={{ position: 'absolute', left: '15px', top: '15px', zIndex: 10,display:"none" }}>
        <MenuOutlined style={{ fontSize: '24px' }} />
      </div>

      {/* Dropdown của avatar admin */}
      <div style={{ float: 'right', marginRight: '20px' }}>
      <Dropdown menu={{ items: menuItems }} trigger={['click']}>
        <a onClick={(e) => e.preventDefault()} style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar icon={<UserOutlined />} /> <span style={{ marginLeft: '8px' }}>Admin</span>
        </a>
      </Dropdown>
      </div>
    </Header>
  );
}

export default AppHeader;
