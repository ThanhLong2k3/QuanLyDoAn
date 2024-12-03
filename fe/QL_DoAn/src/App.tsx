import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, ConfigProvider } from 'antd';
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
        <Layout style={{ minHeight: '100vh' }}>
          <Sidebar />
          <Layout className="site-layout">
            <Header />
            <Content className='  mt-2 shadow ' style={{ margin: '0 6px', backgroundColor:'white' }}>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
               <Outlet/>
              </div>
            </Content>
            <Footer />
          </Layout>
        </Layout>
    </ConfigProvider>
  );
}

export default App;
