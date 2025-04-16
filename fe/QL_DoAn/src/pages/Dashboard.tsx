import React, { useCallback, useEffect, useState } from 'react';
import { 
  Row, Col, Card, Typography, Button, List, Tag, Divider, Space, Avatar, Badge, Empty, Skeleton, Progress, Dropdown, Menu, Input,
  Tabs, notification, Tooltip
} from 'antd';
import { 
  ProjectOutlined, UserOutlined, TeamOutlined, BookOutlined, 
  CheckCircleOutlined, CloseCircleOutlined,
  BulbOutlined, ReadOutlined, RocketOutlined, ExperimentOutlined,
  NotificationOutlined, DownOutlined, FilterOutlined, MoreOutlined, AppstoreOutlined,
  TableOutlined, LoginOutlined, CheckOutlined
} from '@ant-design/icons';
import { getAll_DotDoAn, GetDotByTaiKhoan } from '../sevices/Api/QL_DoAn/QL_DotLamDoAn/QL_DotDoAn';
import { DotLamDoAn } from '../components/InterFace';
import { add_SinhVien_DotLamDoAn } from '../sevices/Api/QL_DoAn/QL_DotLamDoAn/SinhVien_Dot-servives';
import { Get_MaDot_TK } from '../sevices/Api/QL_DoAn/QL_DeTaiDoAn/QL_DeTai';
import { ThongKeDashboard } from '../sevices/Api/QL_DoAn/QL_SinhVien-servives';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Search } = Input;

const Dashboard: React.FC = () => {
  const [dotNCKH, setDot] = useState<DotLamDoAn[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchText, setSearchText] = useState<string>('');
  const [dotJoin, setDotJoin] = useState<any>([]);
  const [thongke, setThongKe] = useState<any>([]);
  
  const fetchDotDoAn = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAll_DotDoAn();
      setDot(data);
    } catch (error) {
      console.error("Lỗi tải đợt đồ án:", error);
      notification.error({
        message: 'Lỗi kết nối',
        description: 'Không thể tải dữ liệu đợt nghiên cứu khoa học. Vui lòng thử lại sau.',
      });
    } finally {
      setLoading(false);
    }
  }, []);
  
  const GetThongKe = async () => {
    try {
      const data = await ThongKeDashboard();
      setThongKe(data);
    } catch (error) {
      console.error("Lỗi tải dữ liệu đợt tham gia:", error);
    }
  };
  const getDot_MaSinhVien = async () => {
    try {
      const data = await Get_MaDot_TK();
      setDotJoin(data);
    } catch (error) {
      console.error("Lỗi tải dữ liệu đợt tham gia:", error);
    }
  };

  useEffect(() => {
    document.title = "Nghiên cứu Khoa Học UTEHY";
    fetchDotDoAn();
    getDot_MaSinhVien();
    GetThongKe();
  }, [fetchDotDoAn]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    } catch (error) {
      return dateString;
    }
  };

  const calculateTimeRemaining = (startDateStr: string) => {
    try {
      const startDate = new Date(startDateStr);
      const currentDate = new Date();
      const diffTime = startDate.getTime() - currentDate.getTime();
      
      if (diffTime <= 0) return { text: "Đang diễn ra", color: "green" };
      
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays <= 7) return { text: `Còn ${diffDays} ngày`, color: "orange" };
      if (diffDays <= 30) return { text: `Còn ${diffDays} ngày`, color: "blue" };
      return { text: `Còn ${diffDays} ngày`, color: "gray" };
    } catch {
      return { text: "Không xác định", color: "gray" };
    }
  };

  // Kiểm tra xem người dùng đã tham gia đợt này chưa
  const isAlreadyJoined = (maDot: string) => {
    return dotJoin.some((dot: any) => dot.maDot === maDot);
  };

  const handleRegister = async (maDot: string) => {
    try {
      // Kiểm tra xem đã tham gia chưa
      if (isAlreadyJoined(maDot)) {
        notification.info({
          message: 'Thông báo',
          description: `Bạn đã tham gia đợt nghiên cứu này rồi.`,
        });
        return;
      }

      // Thực hiện đăng ký
      let taiKhoan = localStorage.getItem('taiKhoan') || '';
      let data = {
        maDot: maDot,
        maSinhVien: taiKhoan,
      };
      
      await add_SinhVien_DotLamDoAn(data);
      
      notification.success({
        message: 'Đăng ký thành công',
        description: `Bạn đã đăng ký tham gia đợt nghiên cứu ${maDot}.`,
      });
      
      // Cập nhật lại danh sách đợt đã tham gia
      getDot_MaSinhVien();
    } catch (error) {
      console.error("Lỗi đăng ký tham gia:", error);
      notification.error({
        message: 'Lỗi đăng ký',
        description: 'Không thể đăng ký tham gia đợt nghiên cứu. Vui lòng thử lại sau.',
      });
    }
  };

  const filteredDots = dotNCKH.filter(dot => 
    dot.tenDot.toLowerCase().includes(searchText.toLowerCase()) ||
    dot.maDot.toLowerCase().includes(searchText.toLowerCase())
  );
  
  const activeDots = filteredDots.filter(dot => dot.trangThai);
  const inactiveDots = filteredDots.filter(dot => !dot.trangThai);
  
  const generateBadgeColor = (index: number) => {
    const colors = ['#1890ff', '#52c41a', '#722ed1', '#fa8c16', '#eb2f96', '#13c2c2'];
    return colors[index % colors.length];
  };
  
  // Data for statistics
  const statData = [
    { title: "Tổng đồ án", value: thongke.tongDoAn, icon: <ProjectOutlined />, color: '#1890ff', percent: 75 },
    { title: "Sinh viên tham gia", value: thongke.tongSinhVien, icon: <UserOutlined />, color: '#52c41a', percent: 82 },
    { title: "Giảng viên hướng dẫn", value: thongke.tongGiangVien, icon: <TeamOutlined />, color: '#722ed1', percent: 65 },
    { title: "Khoa tham gia", value: thongke.tongKhoa, icon: <BookOutlined />, color: '#fa8c16', percent: 95 }
  ];

  return (
    <div className="dashboard-container">
      
      {/* Statistics Overview */}
      <Row gutter={[16, 16]} style={{ marginTop:'20px'}}>
        {statData.map((stat, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <Card 
              hoverable 
              style={{ 
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <Text type="secondary">{stat.title}</Text>
                  <Title level={3} style={{ margin: '8px 0', color: stat.color }}>{stat.value}</Title>
                </div>
                <Avatar size={50} style={{ backgroundColor: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {React.cloneElement(stat.icon, { style: { fontSize: '28px' } })}
                </Avatar>
              </div>
              <Progress percent={stat.percent} strokeColor={stat.color} showInfo={false} style={{ marginTop: '12px' }} />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Research Periods Section */}
      <Card 
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Space>
              <ExperimentOutlined style={{ fontSize: '20px', color: '#1890ff' }} />
              <Text strong style={{ fontSize: '18px' }}>Đợt nghiên cứu khoa học</Text>
              <Badge count={activeDots.length} style={{ backgroundColor: '#52c41a' }} />
            </Space>
            <Space>
              <Search
                placeholder="Tìm kiếm đợt nghiên cứu"
                onSearch={value => setSearchText(value)}
                onChange={e => setSearchText(e.target.value)}
                style={{ width: 250 }}
                allowClear
              />
              <Dropdown overlay={
                <Menu>
                  <Menu.Item key="1">Mới nhất</Menu.Item>
                  <Menu.Item key="2">Đang mở</Menu.Item>
                  <Menu.Item key="3">Đã đóng</Menu.Item>
                </Menu>
              }>
                <Button>
                  <Space>
                    <FilterOutlined />
                    Lọc
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
              <Space>
                <Button 
                  type={viewMode === 'grid' ? 'primary' : 'default'} 
                  icon={<AppstoreOutlined />} 
                  onClick={() => setViewMode('grid')}
                />
                <Button 
                  type={viewMode === 'table' ? 'primary' : 'default'} 
                  icon={<TableOutlined />} 
                  onClick={() => setViewMode('table')}
                />
              </Space>
            </Space>
          </div>
        }
        style={{ 
          marginTop: '20px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
        }}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab={<span><CheckCircleOutlined />Đang mở ({activeDots.length})</span>} key="1">
            <Skeleton loading={loading} active paragraph={{ rows: 4 }}>
              {activeDots.length > 0 ? (
                <List
                  grid={viewMode === 'grid' ? { gutter: 16, xs: 1, sm: 1, md: 2, lg: 3, xl: 3, xxl: 4 } : undefined}
                  dataSource={activeDots}
                  renderItem={(dot, index) => {
                    const joined = isAlreadyJoined(dot.maDot);
                    
                    return (
                      <List.Item>
                        <Card
                          hoverable
                          style={{ 
                            borderRadius: '8px', 
                            overflow: 'hidden', 
                            height: viewMode === 'grid' ? '100%' : 'auto',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                            borderLeft: `4px solid ${dot.trangThai ? '#52c41a' : '#f5222d'}`
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '16px' }}>
                            <Badge.Ribbon 
                              text={joined ? 'Đã tham gia' : calculateTimeRemaining(dot.ngayBatDau).text} 
                              color={joined ? '#1890ff' : calculateTimeRemaining(dot.ngayBatDau).color}
                            >
                              <Avatar 
                                size={60} 
                                icon={<BulbOutlined />} 
                                style={{ 
                                  backgroundColor: generateBadgeColor(index),
                                  marginRight: '16px'
                                }} 
                              />
                            </Badge.Ribbon>
                            <div style={{ flex: 1,marginLeft:'50px' }}>
                              <Text strong style={{ fontSize: '16px', display: 'block' }}>{dot.tenDot}</Text>
                              <Text type="secondary">Mã đợt: {dot.maDot}</Text>
                              <div style={{ marginTop: '4px' }}>
                                {dot.trangThai ? 
                                  <Tag color="success" icon={<CheckCircleOutlined />}>Đang mở</Tag> : 
                                  <Tag color="error" icon={<CloseCircleOutlined />}>Đã đóng</Tag>
                                }
                                {joined && <Tag color="processing" icon={<CheckOutlined />}>Đã tham gia</Tag>}
                              </div>
                            </div>
                            <Dropdown overlay={
                              <Menu>
                                <Menu.Item key="1" icon={<ReadOutlined />}>Chi tiết</Menu.Item>
                                {!joined && <Menu.Item key="2" icon={<RocketOutlined />}>Đăng ký</Menu.Item>}
                                <Menu.Item key="3" icon={<NotificationOutlined />}>Theo dõi</Menu.Item>
                              </Menu>
                            }>
                              <Button type="text" icon={<MoreOutlined />} />
                            </Dropdown>
                          </div>
                          
                          <Divider style={{ margin: '12px 0' }} />
                          
                          <Space direction="vertical" style={{ width: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Text type="secondary">Năm áp dụng:</Text>
                              <Text strong>{dot.namApDung}</Text>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Text type="secondary">Ngày bắt đầu:</Text>
                              <Text strong>{formatDate(dot.ngayBatDau)}</Text>
                            </div>
                          </Space>
                          
                          <Divider style={{ margin: '12px 0' }} />
                          
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {dot.dangKyDeTai && 
                              <Tag color="blue">Đăng ký đề tài</Tag>
                            }
                            {dot.choPhepSinhVienDangKyGiangVienKhacBoMon && 
                              <Tag color="purple">GV khác bộ môn</Tag>
                            }
                            {dot.choPhepSinhVienBaoCaoKhacTuanHienTai && 
                              <Tag color="cyan">SV báo cáo khác tuần</Tag>
                            }
                          </div>
                          
                          <div style={{ marginTop: '16px', textAlign: 'right' }}>
                            {joined ? (
                              <Button 
                                type="primary" 
                                icon={<CheckOutlined />}
                                disabled
                                style={{ backgroundColor: 'rgb(24,144,255)',color:'rgb(255, 255, 255)' , borderColor: '#8c8c8c' }}
                              >
                                Đã tham gia
                              </Button>
                            ) : (
                              <Button 
                                type="primary" 
                                icon={<LoginOutlined />}
                                onClick={() => handleRegister(dot.maDot)}
                                style={{ 
                                  background: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)',
                                  border: 'none'
                                }}
                              >
                                Đăng ký tham gia
                              </Button>
                            )}
                          </div>
                        </Card>
                      </List.Item>
                    );
                  }}
                />
              ) : (
                <Empty 
                  description="Không có đợt nghiên cứu khoa học nào đang mở"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              )}
            </Skeleton>
          </TabPane>
          <TabPane tab={<span><CloseCircleOutlined />Đã đóng ({inactiveDots.length})</span>} key="2">
            <Skeleton loading={loading} active paragraph={{ rows: 4 }}>
              {inactiveDots.length > 0 ? (
                <List
                  grid={viewMode === 'grid' ? { gutter: 16, xs: 1, sm: 1, md: 2, lg: 3, xl: 3, xxl: 4 } : undefined}
                  dataSource={inactiveDots}
                  renderItem={(dot, index) => {
                    const joined = isAlreadyJoined(dot.maDot);
                    
                    return (
                      <List.Item>
                        <Card
                          hoverable
                          style={{ 
                            borderRadius: '8px', 
                            overflow: 'hidden', 
                            height: viewMode === 'grid' ? '100%' : 'auto',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                            borderLeft: `4px solid #f5222d`,
                            opacity: 0.8
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '16px' }}>
                            <Badge.Ribbon 
                              text={joined ? 'Đã tham gia' : 'Đã đóng'} 
                              color={joined ? '#1890ff' : '#f5222d'}
                            >
                              <Avatar 
                                size={60} 
                                icon={<BulbOutlined />} 
                                style={{ 
                                  backgroundColor: '#bfbfbf',
                                  marginRight: '16px'
                                }} 
                              />
                            </Badge.Ribbon>
                            <div style={{ flex: 1 }}>
                              <Text strong style={{ fontSize: '16px', display: 'block' }}>{dot.tenDot}</Text>
                              <Text type="secondary">Mã đợt: {dot.maDot}</Text>
                              <div style={{ marginTop: '4px' }}>
                                <Tag color="error" icon={<CloseCircleOutlined />}>Đã đóng</Tag>
                                {joined && <Tag color="processing" icon={<CheckOutlined />}>Đã tham gia</Tag>}
                              </div>
                            </div>
                          </div>
                          
                          <Divider style={{ margin: '12px 0' }} />
                          
                          <Space direction="vertical" style={{ width: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Text type="secondary">Năm áp dụng:</Text>
                              <Text>{dot.namApDung}</Text>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Text type="secondary">Ngày bắt đầu:</Text>
                              <Text>{formatDate(dot.ngayBatDau)}</Text>
                            </div>
                          </Space>
                          
                          <div style={{ marginTop: '16px', textAlign: 'right' }}>
                            {joined ? (
                              <Button 
                                type="default" 
                                icon={<ReadOutlined />}
                              >
                                Xem thông tin
                              </Button>
                            ) : (
                              <Button 
                                type="default" 
                                icon={<ReadOutlined />}
                              >
                                Xem thông tin
                              </Button>
                            )}
                          </div>
                        </Card>
                      </List.Item>
                    );
                  }}
                />
              ) : (
                <Empty 
                  description="Không có đợt nghiên cứu khoa học nào đã đóng"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              )}
            </Skeleton>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
}

export default Dashboard;