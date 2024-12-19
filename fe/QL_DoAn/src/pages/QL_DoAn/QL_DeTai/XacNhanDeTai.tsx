import React, { useEffect, useState } from "react";
import { 
  Select, 
  Card, 
  Divider, 
  Row, 
  Col, 
  Typography, 
  Input, 
  Table,
  Space 
} from "antd";
import { 
  SearchOutlined, 
  FilterOutlined 
} from '@ant-design/icons';
import {Table_XacNhanDeTai} from "../../../components/QLDoAnComponent/XacNhanDeTai/XacNhanDeTaiTable";
import { getAll_DotDoAn } from "../../../sevices/Api/QL_DoAn/QL_DotLamDoAn/QL_DotDoAn";
import { DotLamDoAn } from "../../../components/InterFace";

const { Option } = Select;
const { Title } = Typography;

const XacNhanDeTai: React.FC = () => {
  const [selectedDot, setSelectedDot] = useState<string>("DOT1");
  const [dotLamDoAn, setDot] = useState<DotLamDoAn[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const[ListDeTai,setListDeTai]=useState([]);
  const fetchDotDoAn = async () => {
    try {
      const data = await getAll_DotDoAn();
      setDot(data);
      setLoading(false);
    } catch (error) {
      console.error("Lỗi tải đợt đồ án:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDotDoAn();
  }, []);

  const handleDotChange = (value: string) => {
    setSelectedDot(value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const  DongY=(banGhi?:any)=>{
    console.log(banGhi);
  }
  const KhongDongY=(banGhi:any)=>{
    console.log(banGhi);
  }


  const Table_DeTai=Table_XacNhanDeTai(DongY, KhongDongY)

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-6">
      <Card 
        className="shadow-lg rounded-xl" 
        bordered={false}
      >
        <div className="p-4 md:p-6">
          <Title 
            level={2} 
            className="text-center mb-6 text-primary"
            style={{ 
              color: "#1e88e5", 
              fontSize: "1.75rem", 
              fontWeight: 700 
            }}
          >
            XÁC NHẬN ĐỀ TÀI
          </Title>

          <Divider />

          <Row gutter={[16, 16]} align="middle" className="mb-6">
            <Col xs={24} sm={24} md={12} lg={10}>
              <Input 
                prefix={<SearchOutlined />}
                placeholder="Tìm kiếm theo tên hoặc tài khoản"
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full"
                allowClear
              />
            </Col>

            <Col xs={24} sm={24} md={12} lg={10}>
              <Select
                value={selectedDot}
                onChange={handleDotChange}
                style={{ width: '100%' }}
                loading={loading}
                placeholder="Chọn đợt làm đồ án"
                suffixIcon={<FilterOutlined />}
              >
                {dotLamDoAn?.length > 0 ? (
                  dotLamDoAn.map((item) => (
                    <Option key={item.maDot} value={item.maDot}>
                      {item.tenDot}
                    </Option>
                  ))
                ) : (
                  <Option disabled>Không có dữ liệu</Option>
                )}
              </Select>
            </Col>
          </Row>

          <Table
            columns={Table_DeTai}
            loading={loading}
            dataSource={ListDeTai}
            rowKey="maDeTai"
            scroll={{ x: 768 }}
            className="shadow-sm rounded-md overflow-hidden"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} mục`,
            }}
          />
        </div>
      </Card>
    </div>
  );
};

export default XacNhanDeTai;