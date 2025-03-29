import React, { useEffect, useState } from "react";
import { 
  Select, 
  Card, 
  Divider, 
  Row, 
  Col, 
  Typography, 
  Input, 
  Space 
} from "antd";
import { 
  SearchOutlined, 
  FilterOutlined 
} from '@ant-design/icons';
import PhanCongHuongDanTable from "../../../components/QLDoAnComponent/QL_PhanCongHuongDan/Table_PhanCong";
import { getAll_DotDoAn } from "../../../sevices/Api/QL_DoAn/QL_DotLamDoAn/QL_DotDoAn";
import { DotLamDoAn } from "../../../components/InterFace";

const { Option } = Select;
const { Title } = Typography;

const PhanCongHuongDan: React.FC = () => {
  const [selectedDot, setSelectedDot] = useState<string>("DOT1");
  const [dotLamDoAn, setDot] = useState<DotLamDoAn[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

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

  return (
    <div>
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
            PHÂN CÔNG HƯỚNG DẪN
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
                placeholder="Chọn đợt Nghiên cứu Khoa Học"
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
          <Divider />

               <PhanCongHuongDanTable maDot={selectedDot} />
        </div>
      </Card>
    </div>
  );
};

export default PhanCongHuongDan;