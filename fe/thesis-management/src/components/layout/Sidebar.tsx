import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import Sidebar_router from '../../ultils/Sidebar_route';
const { Sider } = Layout;



const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setUserRole(user);
  }, []);

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };
  
  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const renderMenuItems = () => {
    if (!userRole) return null;

    let roleItems;
    switch (userRole) {
      case '1':
        roleItems = Sidebar_router.GIAOVU;
        break;
      case '2':
        roleItems = Sidebar_router.TBM;
        break;
      case '3':
        roleItems = Sidebar_router.GIANGVIEN;
        break;
      case '4':
        roleItems = Sidebar_router.SINHVIEN;
        break;
      default:
        return null;
    }

    return Object.entries(roleItems).map(([key, item]) => (
      <Menu.Item key={item.KEY} icon={item.ICON}>
        <Link to={item.LINK} style={{ textDecoration: 'none' }}>{item.TEXT}</Link>
      </Menu.Item>
    ));
  };

  const menuItems = renderMenuItems();

  return (
    <>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={onCollapse} 
        style={{ background: '#fff' }} 
        breakpoint="md"  
        className='col-12'
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
        <Menu theme="light" defaultSelectedKeys={['1']} className='col-12' mode="inline">
          {menuItems}
        </Menu>
      </Sider>

      <Button 
        className="menu-button" 
        type="primary" 
        icon={<MenuOutlined />} 
        onClick={showDrawer} 
        style={{ position: 'fixed', top: '5px', left: '5px', zIndex: 1000, display: collapsed ? 'block' : 'none' }} 
      />
      
      <Drawer
        title="Menu"
        placement="left"
        closable={true}
        onClose={closeDrawer}
        open={drawerVisible}
      >
        <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
          {menuItems}
        </Menu>
      </Drawer>
    </>
  );
}

export default Sidebar;