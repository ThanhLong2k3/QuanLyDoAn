import React,{useEffect,useState} from 'react';
import { Layout, MenuProps , Dropdown, Avatar } from 'antd';
import { UserOutlined, MenuOutlined } from '@ant-design/icons';
import {getAll_NguoiDung_TaiKhoan} from "../../sevices/Api/QL_HeThong/QL_NguoiDung";
import ROUTERS from "../../router/Path";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

export default function AppHeader() {
  const [name,setName]=useState("");
  const navigate = useNavigate();
  const getttUser=async()=>{
    const taiKhoan= localStorage.getItem('taiKhoan')|| '';
    let data= await getAll_NguoiDung_TaiKhoan(taiKhoan);
    setName(data[0].hoTen);
  }
  
  useEffect(() => {
    getttUser()
  }, [])


  const DangXuat=()=>{
    debugger;
        localStorage.setItem('taiKhoan',"");
        navigate(ROUTERS.AUTH.DEFAULT.PATH);

  }
  const menuItems: MenuProps['items'] = [
    {
      key: '0',
      label: <a>Hồ sơ</a>, 
    },
    {
      key: '1',
      label: <a>Cài đặt</a>,
    },
    {
      type: 'divider', 
    },
    {
      key: '3',
      label:<a onClick={DangXuat}>Đăng xuất</a>,
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
      <Dropdown  menu={{ items: menuItems }} trigger={['click']}>
        <a onClick={(e) => e.preventDefault()} style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar icon={<UserOutlined />} /> <span style={{ marginLeft: '8px',textDecoration:"none" }}>{name}</span>
        </a>
      </Dropdown>
      </div>
    </Header>
  );
}

