import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Button, Drawer } from 'antd';
import { DashboardOutlined, ProjectOutlined, UserOutlined, TeamOutlined, BookOutlined, MenuOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <>
      {/* Sidebar for larger screens */}
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={onCollapse} 
        style={{ background: '#fff' }} 
        breakpoint="md"  
        collapsedWidth={0}  
      >
        <div className="logo" style={{ display:'flex', alignItems: 'center', justifyContent: 'center', height: '64px', background: 'rgba(255, 255, 255, 0.3)' }}>
          <img src="/utehy-logo.png" alt="UTEHY Logo" style={{ height: collapsed ? '40%' : '100%', marginRight: collapsed ? '0' : '8px' }} />
          {!collapsed && (
            <div style={{ color: '#1e88e5', fontSize: '18px', fontWeight: 'bold' }}>
              UTEHY
            </div>
          )}
        </div>
        <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="/" style={{ textDecoration: 'none' }}>Trang chủ</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<ProjectOutlined />}>
            <Link to="/projects" style={{ textDecoration: 'none' }}>Quản lý Đồ án</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            <Link to="/students" style={{ textDecoration: 'none' }}>Quản lý Sinh viên</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<TeamOutlined />}>
            <Link to="/supervisors" style={{ textDecoration: 'none' }}>Quản lý Giảng viên</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<BookOutlined />}>
            <Link to="/department" style={{ textDecoration: 'none' }}>Quản lý Khoa</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Hamburger button for mobile */}
      <Button 
        className="menu-button" 
        type="primary" 
        icon={<MenuOutlined />} 
        onClick={showDrawer} 
        style={{ position: 'fixed', top: '15px', left: '15px', zIndex: 1000, display: collapsed ? 'block' : 'none' }} 
      />
      
      {/* Drawer for mobile navigation */}
      <Drawer
        title="Menu"
        placement="left"
        closable={true}
        onClose={closeDrawer}
        visible={drawerVisible}
      >
        <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="/" style={{ textDecoration: 'none' }}>Trang chủ</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<ProjectOutlined />}>
            <Link to="/projects" style={{ textDecoration: 'none' }}>Quản lý Đồ án</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            <Link to="/students" style={{ textDecoration: 'none' }}>Quản lý Sinh viên</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<TeamOutlined />}>
            <Link to="/supervisors" style={{ textDecoration: 'none' }}>Quản lý Giảng viên</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<BookOutlined />}>
            <Link to="/department" style={{ textDecoration: 'none' }}>Quản lý Khoa</Link>
          </Menu.Item>
        </Menu>
      </Drawer>
    </>
  );
}

export default Sidebar;
