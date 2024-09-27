import React from 'react';
import { Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { Layout, ConfigProvider } from 'antd';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Students from './pages/students';
import Supervisors from './pages/Supervisors';
import Departments from './pages/Classs';
import Login from './pages/Login/Login';

const { Content } = Layout;

const App: React.FC = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login'; 

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1e88e5',
          colorLink: '#1e88e5',
        },
      }}
    >
      {!isLoginPage && (
        <Layout style={{ minHeight: '100vh' }}>
          <Sidebar />
          <Layout className="site-layout">
            <Header />
            <Content style={{ margin: '0 16px' }}>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
               <Outlet/>
              </div>
            </Content>
            <Footer />
          </Layout>
        </Layout>
      )}
      
      {isLoginPage && (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </ConfigProvider>
  );
}

export default App;
