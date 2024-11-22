import React from 'react';
import { Row, Col, Card, Statistic, Typography } from 'antd';
import { ProjectOutlined, UserOutlined, TeamOutlined, BookOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Dashboard: React.FC = () => {
  return (
    <div>
      <Title level={2}>Trang chủ - Hệ thống Quản lý Đồ án UTEHY</Title>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng số đồ án"
              value={112}
              prefix={<ProjectOutlined />}
              valueStyle={{ color: '#1e88e5' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng số sinh viên"
              value={934}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1e88e5' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng số giảng viên"
              value={42}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1e88e5' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng số khoa"
              value={5}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#1e88e5' }}
            />
          </Card>
        </Col>
      </Row>
      <Row style={{ marginTop: '20px' }}>
        <Col span={24}>
          <Card title="Thông báo mới nhất">
            <p>Hạn nộp đề cương đồ án tốt nghiệp: 30/06/2023</p>
            <p>Hội thảo "Công nghệ mới trong phát triển phần mềm": 15/07/2023</p>
            <p>Đăng ký bảo vệ đồ án tốt nghiệp đợt 1: 01/08/2023 - 15/08/2023</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
