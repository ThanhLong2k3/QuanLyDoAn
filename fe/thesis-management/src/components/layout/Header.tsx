import React from 'react';
import { Layout, Menu, Dropdown, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

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
    <Header className="site-layout-background" style={{ padding: 0, background: '#fff' }}>
      <div className="logo" style={{ float: 'left', width: 120, height: 31, margin: '16px 24px 16px 0', background: 'rgba(255, 255, 255, 0.3)' }}>
        <img src="/utehy-logo.png" alt="UTEHY Logo" style={{ height: '100%', marginRight: '10px' }} />
      </div>
      <div style={{ float: 'left', color: '#1e88e5', fontSize: '18px', fontWeight: 'bold' }}>
        Hệ thống Quản lý Đồ án - UTEHY
      </div>
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

export {};