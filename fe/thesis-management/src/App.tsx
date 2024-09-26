import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout, ConfigProvider } from 'antd';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Students from './pages/students';
import Supervisors from './pages/Supervisors';
import Departments from './pages/Departments';

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1e88e5',
          colorLink: '#1e88e5',
        },
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar />
        <Layout className="site-layout">
          <Header />
          <Content style={{ margin: '0 16px' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/students" element={<Students />} />
                <Route path="/supervisors" element={<Supervisors />} />
                <Route path="/department" element={<Departments/>} />

              </Routes>
            </div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default App;