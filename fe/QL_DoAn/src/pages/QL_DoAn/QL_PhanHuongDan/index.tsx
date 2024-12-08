import React, { useEffect, useState } from "react";
import { Select, Card, Divider, Row, Col, Typography,Input } from "antd";
import PhanCongHuongDanTable from "../../../components/QLDoAnComponent/QL_PhanCongHuongDan/Table_PhanCong";
import { getAll_DotDoAn } from "../../../sevices/Api/QL_DoAn/QL_DotLamDoAn/QL_DotDoAn";
import { DotLamDoAn } from "../../../components/InterFace";
const { Option } = Select;
const { Title } = Typography;
const PhanCongHuongDan: React.FC = () => {
  const [selectedDot, setSelectedDot] = useState<string>("DOT1");
  const [DotLamDoAn, setDot] = useState<DotLamDoAn[]>([]);
  const [loading,setLoading]=useState(true);
  const handleDotChange = (value: string) => {
    setSelectedDot(value);
  };

  const Get_All_Dot = async () => {
    let data = await getAll_DotDoAn();
    setDot(data);
    setLoading(false)
  };
  useEffect(() => {
    Get_All_Dot();
  }, []);
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Card className="shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <Title
            level={2}
            className="text-center mb-8"
            style={{ color: "#1e88e5", fontSize: "25px", fontWeight: "bold" }}
          >
            PHÂN CÔNG HƯỚNG DẪN
          </Title>
          <Divider />
          <Row gutter={16} className="mb-6">
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Input
                placeholder="Tìm kiếm theo tên hoặc tài khoản"
               
                className="w-full"
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                <Select
                      value={selectedDot}
                      onChange={handleDotChange}
                      style={{ width: '100%' }}
                      loading={loading}
                      placeholder="Chọn đợt làm đồ án"
                    >
                      {DotLamDoAn && DotLamDoAn.length > 0 ? (
                        DotLamDoAn.map((item) => (
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
          <PhanCongHuongDanTable maDot={selectedDot} />
        </div>
      </Card>
    </div>
  );
};

export default PhanCongHuongDan;
