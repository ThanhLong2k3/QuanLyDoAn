import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, ConfigProvider, App as AntApp } from 'antd';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';

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
        <Layout style={{ minHeight: '100vh' }}>
          <Sidebar/>
          <Layout className="site-layout">
            <Header />
            <Content className="bg-gray-50 min-h-screen p-4 md:p-6">
              
               <Outlet/>
            
            </Content>
            <Footer />
          </Layout>
        </Layout>
      </AntApp>
    </ConfigProvider>
  );
}

export default App;