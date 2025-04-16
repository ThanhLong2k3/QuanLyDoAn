import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, MenuProps, Dropdown, Avatar, Button, Badge, List, Popover, message, Space, Typography } from "antd";
import { 
  UserOutlined, 
  AppstoreOutlined, 
  SettingOutlined, 
  CalendarOutlined,
  BellOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined
} from "@ant-design/icons";
import { Sidebar_router, Sidebar_router_DanhMuc, Sidebar_HeThong } from "../../ultils/Sidebar_route";
import ROUTERS from "../../router/Path";
import { useNavigate } from "react-router-dom";
import { getAll_NguoiDung_TaiKhoan } from "../../sevices/Api/QL_HeThong/QL_NguoiDung";
import { get_LoiMoi_Id, XuLyLoiMoi } from "../../sevices/Api/QL_DoAn/QL_NhomSinhVien";

const { Header } = Layout;
const { Text, Title } = Typography;




interface LoiMoi {
  maLoiMoi: number;
  maNhom: string;
  tenNhom: string;
  maNguoiMoi: string;
  tenNguoiMoi: string;
  ngayMoi: string;
}

const AppHeader: React.FC = () => {
  const [name, setName] = useState("");
  const [userPermissions, setUserPermissions] = useState<string[]>([]);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  const [listLoiMoi, setListLoiMoi] = useState<LoiMoi[]>([]);
  
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

  const ShowThongTin = () => {
    navigate(ROUTERS.DOAN.THONGTINSINHVIEN.PATH);
  };

  const dropdownMenuItems: MenuProps['items'] = [
    { key: '0', label: <span onClick={ShowThongTin}>Hồ sơ</span> },
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

  useEffect(() => {
    getLoiMoi();
  }, []);
  
  const getLoiMoi = async () => {
    const data = await get_LoiMoi_Id();
    debugger;
    if(data.length===0 ||  data[0].maLoiMoi===0)
    {
      setListLoiMoi([]);
    }

    setListLoiMoi(data || []);
  };

  // Xử lý xác nhận lời mời
  const handleXacNhan = async (values:any) => {
    try {
        await XuLyLoiMoi(1,values,getLoiMoi);
        setListLoiMoi(prevList => prevList.filter(item => item.maLoiMoi !== values.maLoiMoi));
    } catch (error) {
      message.error("Có lỗi xảy ra khi xác nhận lời mời!");
    }
  };

  // Xử lý từ chối lời mời
  const handleTuChoi = async (values: any) => {
    try {
      await XuLyLoiMoi(0,values,getLoiMoi);
      setListLoiMoi(prevList => prevList.filter(item => item.maLoiMoi !== values.maLoiMoi));
    } catch (error) {
      message.error("Có lỗi xảy ra khi từ chối lời mời!");
    }
  };

  // Format thời gian
  const formatTime = (timeString: string): string => {
    const date = new Date(timeString);
    const now = new Date();
    
    const diffInMillis = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMillis / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} phút trước`;
    } else if (diffInHours < 24) {
      return `${diffInHours} giờ trước`;
    } else {
      return `${diffInDays} ngày trước`;
    }
  };

  // Nội dung popover thông báo
  const notificationContent = (
    <div style={{ width: 320, maxHeight: 400, overflow: 'auto' }}>
      {listLoiMoi.length > 0 ? (
        <List
          itemLayout="vertical"
          dataSource={listLoiMoi}
          renderItem={(item) => (
            <List.Item
              key={item.maLoiMoi}
              style={{ borderBottom: '1px solid #f0f0f0', padding: '12px 0' }}
            >
              <div>
                <Text strong>Lời mời tham gia nhóm: {item.tenNhom}</Text>
                <div style={{ fontSize: '13px', color: '#888', margin: '4px 0' }}>
                  Người mời: {item.tenNguoiMoi}
                </div>
                <div style={{ fontSize: '12px', color: '#999', marginBottom: '8px' }}>
                  {formatTime(item.ngayMoi)}
                </div>
                <Space>
                  <Button 
                    type="primary" 
                    size="small" 
                    icon={<CheckCircleOutlined />}
                    onClick={() => handleXacNhan(item)}
                  >
                    Xác nhận
                  </Button>
                  <Button 
                    danger 
                    size="small" 
                    icon={<CloseCircleOutlined />}
                    onClick={() => handleTuChoi(item)}
                  >
                    Từ chối
                  </Button>
                </Space>
              </div>
            </List.Item>
          )}
        />
      ) : (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <Text type="secondary">Bạn không có thông báo mới</Text>
        </div>
      )}
    </div>
  );

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
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ color: '#1e88e5', fontSize: '18px', fontWeight: 'bold' }}>
            Nghiên cứu Khoa Học
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Phần thông báo */}
          <Popover 
            placement="bottomRight" 
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Title level={5} style={{ margin: 0 }}>Thông báo</Title>
              </div>
            } 
            content={notificationContent} 
            trigger="click"
          >
            <Badge count={listLoiMoi.length} offset={[-5, 5]}>
              <Button type="text" icon={<BellOutlined style={{ fontSize: '18px' }} />} style={{ marginRight: 16 }} />
            </Badge>
          </Popover>

          {/* Thông tin người dùng */}
          <Dropdown menu={{ items: dropdownMenuItems }} trigger={['click']}>
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <Avatar icon={<UserOutlined />} /> 
              <span style={{ marginLeft: '8px', color: '#333' }}>{name}</span>
            </div>
          </Dropdown>
        </div>
      </Header>

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