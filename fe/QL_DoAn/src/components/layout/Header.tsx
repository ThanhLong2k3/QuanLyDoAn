import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, MenuProps, Dropdown, Avatar, Button } from "antd";
import { 
  UserOutlined, 
  AppstoreOutlined, 
  SettingOutlined, 
  CalendarOutlined,
  MenuOutlined 
} from "@ant-design/icons";
import { Sidebar_router, Sidebar_router_DanhMuc, Sidebar_HeThong } from "../../ultils/Sidebar_route";
import ROUTERS from "../../router/Path";
import { useNavigate } from "react-router-dom";
import { getAll_NguoiDung_TaiKhoan } from "../../sevices/Api/QL_HeThong/QL_NguoiDung";

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const [name, setName] = useState("");
  const [userPermissions, setUserPermissions] = useState<string[]>([]);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    try {
      const permissions = JSON.parse(localStorage.getItem("ListQuyen") || "[]");
      setUserPermissions(permissions);

      const fetchUserDetails = async () => {
        const taiKhoan = localStorage.getItem('taiKhoan') || '';
        let data = await getAll_NguoiDung_TaiKhoan(taiKhoan);
        setName(data[0].hoTen);
      };
      fetchUserDetails();
    } catch (error) {
      console.error("Failed to load permissions", error);
    }
  }, []);

  const DangXuat = () => {
    localStorage.removeItem('taiKhoan');
    navigate(ROUTERS.AUTH.DEFAULT.PATH);
  };

  const dropdownMenuItems: MenuProps['items'] = [
    { key: '0', label: <span>Hồ sơ</span> },
    { key: '1', label: <span>Cài đặt</span> },
    { type: 'divider' },
    { key: '3', label: <span onClick={DangXuat}>Đăng xuất</span> },
  ];

  const renderMenuItems = () => {
    if (userPermissions.length === 0) return [];

    const danhMucItems = Object.entries(Sidebar_router_DanhMuc).map(([key, item]) => ({
      key: item.KEY,
      icon: item.ICON,
      label: <Link style={{ textDecoration: "none" }} to={item.LINK}>{item.TEXT}</Link>,
    }));
    
    const HeThongItems = Object.entries(Sidebar_HeThong).map(([key, item]) => ({
      key: item.KEY,
      icon: item.ICON,
      label: <Link style={{ textDecoration: "none" }} to={item.LINK}>{item.TEXT}</Link>,
    }));

    const permissionItems = Object.entries(Sidebar_router)
      .map(([key, item]) => {
        if (item.PERMISSION.some((permission) => userPermissions.includes(permission))) {
          return {
            key: item.KEY,
            icon: item.ICON,
            label: <Link style={{ textDecoration: "none" }} to={item.LINK}>{item.TEXT}</Link>,
          };
        }
        return null;
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);

    return [
      {
        key: 'danh-muc',
        icon: <AppstoreOutlined />,
        label: 'Danh Mục',
        children: danhMucItems,
      },
      {
        key: 'do-an',
        icon: <CalendarOutlined />,
        label: 'Đồ Án',
        children: permissionItems,
      },
      {
        key: 'he-thong',
        icon: <SettingOutlined />,
        label: 'Hệ Thống',
        children: HeThongItems,
      },
    ];
  };

  const menuItems = renderMenuItems();

  return (
    <>
      <Header 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          padding: '0 20px', 
          background: '#fff',
          boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
          position: 'relative'
        }}
      >
        {/* Mobile Menu Toggle
        {isMobile && (
          <Button 
            type="text" 
            icon={<MenuOutlined />} 
            onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
            style={{ 
              position: 'absolute', 
              left: 10, 
              top: '50%', 
              transform: 'translateY(-50%)' 
            }}
          />
        )} */}

        {/* Logo and System Name */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* <img
            src="/utehy-logo.png"
            alt="UTEHY Logo"
            style={{ height: '40px', marginRight: '10px' }}
          /> */}
          <span style={{ color: '#1e88e5', fontSize: '18px', fontWeight: 'bold' }}>
            Hệ thống Quản lý Đồ án
          </span>
        </div>

        {/* Desktop Menu
        {!isMobile && (
          <Menu
            mode="horizontal"
            items={menuItems}
            style={{ 
              flex: 1, 
              marginLeft: '20px', 
              marginRight: '20px',
              border: 'none'
            }}
          />
        )} */}

        {/* User Dropdown */}
        <Dropdown menu={{ items: dropdownMenuItems }} trigger={['click']}>
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <Avatar icon={<UserOutlined />} /> 
            <span style={{ marginLeft: '8px', color: '#333' }}>{name}</span>
          </div>
        </Dropdown>
      </Header>

      {/* Mobile Drawer Menu */}
      {isMobile && mobileMenuVisible && (
        <div 
          style={{ 
            position: 'fixed', 
            top: '64px', 
            left: 0, 
            width: '100%', 
            background: 'white', 
            zIndex: 1000,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
          }}
        >
          <Menu
            mode="inline"
            items={menuItems}
            style={{ width: '100%' }}
          />
        </div>
      )}
    </>
  );
};

export default AppHeader;