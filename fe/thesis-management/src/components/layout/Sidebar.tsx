import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { DashboardOutlined, ProjectOutlined, UserOutlined, TeamOutlined, BookOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  return (
    <Sider collapsible style={{ background: '#fff' }}>
      <div className="logo" style={{ height: 32, margin: 16, background: 'rgba(30, 136, 229, 0.2)', borderRadius: 6 }} />
      <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/">Trang chủ</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<ProjectOutlined />}>
          <Link to="/projects">Quản lý Đồ án</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<UserOutlined />}>
          <Link to="/students">Quản lý Sinh viên</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<TeamOutlined />}>
          <Link to="/supervisors">Quản lý Giảng viên</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<BookOutlined />}>
          <Link to="/department">Quản lý Khoa</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default Sidebar;

export {};