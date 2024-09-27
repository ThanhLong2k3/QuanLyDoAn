import React from 'react';
import { Layout, Menu, Dropdown, Avatar } from 'antd';
import { UserOutlined, MenuOutlined } from '@ant-design/icons';

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="/profile">Hồ sơ</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="/settings">Cài đặt</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">Đăng xuất</Menu.Item>
    </Menu>
  );

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
        <Dropdown overlay={menu} trigger={['click']}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            <Avatar icon={<UserOutlined />} /> Admin <UserOutlined />
          </a>
        </Dropdown>
      </div>
    </Header>
  );
}

export default AppHeader;
