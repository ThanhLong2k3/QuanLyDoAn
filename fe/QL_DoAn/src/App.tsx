import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, ConfigProvider, App as AntApp } from 'antd';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#1e88e5',
        colorLink: '#1e88e5',
        fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
        fontSize: 13,
        colorText: '#333333',
        borderRadius: 4,
      },
      components: {
        Layout: {
          bodyBg: '#f5f7fa',
          headerBg: '#ffffff',
          siderBg: '#ffffff',
        },
        Menu: {
          itemSelectedBg: '#e6f7ff',
          itemSelectedColor: '#1e88e5',
          itemHoverBg: '#f0f5ff',
        },
        Button: {
          primaryColor: '#ffffff',
        },
        Table: {
          headerBg: '#fafafa',
          headerColor: '#333333',
          rowHoverBg: '#f5f7fa',
        }
      }
    }}
    >
      <AntApp>
        <Layout style={{ height: '100vh' }}>
          <Sidebar  />
          <Layout className="site-layout">
            <Header />
            <Content style={{ margin:"10px"}}>
               <Outlet/>
            </Content>
          </Layout>
        </Layout>
      </AntApp>
    </ConfigProvider>
  );
}

export default App;