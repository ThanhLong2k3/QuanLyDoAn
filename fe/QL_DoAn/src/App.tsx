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
          fontSize: 12,
          colorText: '#333333',
        },
      }}
    >
      <AntApp>
        <Layout style={{ height: '100vh' }}>
          <Sidebar/>
          <Layout className="site-layout">
            <Header />
            <Content style={{height:"80vh", margin:"10px"}}>
              
               <Outlet/>
            
            </Content>
          </Layout>
        </Layout>
      </AntApp>
    </ConfigProvider>
  );
}

export default App;