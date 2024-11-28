import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Sidebar_router from "../../ultils/Sidebar_route";
const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [userPermissions, setUserPermissions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try {
      const permissions = JSON.parse(localStorage.getItem("ListQuyen") || "[]");
      setUserPermissions(permissions);
    } catch (error) {
      console.error("Failed to load permissions", error);
    } finally {
      setLoading(false);
    }
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
    if (userPermissions.length === 0) return [];
  
    return Object.entries(Sidebar_router)
      .map(([key, item]) => {
        if (
          item.PERMISSION.some((permission) =>
            userPermissions.includes(permission)
          )
        ) {
          return {
            key: item.KEY,
            icon: item.ICON,
            label: <Link style={{textDecoration:"none"}} to={item.LINK}>{item.TEXT}</Link>,
          };
        }
        return null;
      })
      .filter((item): item is NonNullable<typeof item> => item !== null); // Lọc null
  };
  

  const menuItems = renderMenuItems();

  return (
    <>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        style={{ background: "#fff" }}
        breakpoint="md"
        collapsedWidth={0}
      >
        <div
          className="logo"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "64px",
            background: "rgba(255, 255, 255, 0.3)",
          }}
        >
          <img
            src="/utehy-logo.png"
            alt="UTEHY Logo"
            style={{
              height: collapsed ? "40%" : "100%",
              marginRight: collapsed ? "0" : "8px",
            }}
          />
          {!collapsed && (
            <div
              style={{ color: "#1e88e5", fontSize: "18px", fontWeight: "bold" }}
            >
              UTEHY
            </div>
          )}
        </div>
        <Menu
          theme="light"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={menuItems}
        />
      </Sider>

      <Button
        className="menu-button"
        type="primary"
        icon={<MenuOutlined />}
        onClick={showDrawer}
        style={{
          position: "fixed",
          top: "5px",
          left: "5px",
          zIndex: 1000,
          display: collapsed ? "block" : "none",
        }}
      />

      <Drawer
        title="Menu"
        placement="left"
        closable={true}
        onClose={closeDrawer}
        open={drawerVisible}
      >
        <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline" items={menuItems}/>
      </Drawer>
    </>
  );
};

export default Sidebar;
