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
  Spin,
  Modal,
  Form,
  message
} from "antd";
import { 
  SearchOutlined, 
  FilterOutlined 
} from '@ant-design/icons';
import {Table_XacNhanDeTai} from "../../../components/QLDoAnComponent/XacNhanDeTai/XacNhanDeTaiTable";
import { getAll_DotDoAn } from "../../../sevices/Api/QL_DoAn/QL_DotLamDoAn/QL_DotDoAn";
import {Get_DeTaiSinhVien_MaDot, GIANGVIEN_XACNHANDETAI, GIANGVIEN_TUCHOIDETAI} from '../../../sevices/Api/QL_DoAn/QL_DeTaiDoAn/QL_DeTai'
import { DotLamDoAn } from "../../../components/InterFace";

const { Option } = Select;
const { Title } = Typography;
const { TextArea } = Input;

interface DOT {
  maDeTai: string;
  maSinhVien: string;
  lyDoTuChoi: string;
  tenDeTai: string;
}

const GiangVienXacNhanDeTai: React.FC = () => {
  const [selectedDot, setSelectedDot] = useState<string>("DOT1");
  const [dotLamDoAn, setDot] = useState<DotLamDoAn[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [ListDeTai, setListDeTai] = useState<DOT[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDeTai, setSelectedDeTai] = useState<DOT | null>(null);
  const [form] = Form.useForm();

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
    document.title = 'Giảng viên xác nhận đề tài';
    fetchDotDoAn();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  const handleDotChange = async (value: string) => {
    setSelectedDot(value);
    let data = await Get_DeTaiSinhVien_MaDot(value);
    setListDeTai(data);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const DongY = async (banGhi: DOT) => {
    const data = {
      maDeTai: banGhi.maDeTai,
      maSinhVien: banGhi.maSinhVien,
      lyDoTuChoi: ""
    }
    await GIANGVIEN_XACNHANDETAI(data, fetchDotDoAn);
  }

  const KhongDongY = (banGhi: DOT) => {
    setSelectedDeTai(banGhi);
    setIsModalVisible(true);
  }

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (selectedDeTai) {
        const data = {
          maDeTai: selectedDeTai.maDeTai,
          maSinhVien: selectedDeTai.maSinhVien,
          lyDoTuChoi: values.lyDoTuChoi
        };
        await GIANGVIEN_TUCHOIDETAI(data, fetchDotDoAn);
        setIsModalVisible(false);
        form.resetFields();
        message.success('Đã từ chối đề tài thành công');
      }
    } catch (error) {
      console.error("Lỗi khi từ chối đề tài:", error);
      message.error('Có lỗi xảy ra khi từ chối đề tài');
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const Table_DeTai = Table_XacNhanDeTai(DongY, KhongDongY);

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
           GIẢNG VIÊN XÁC NHẬN ĐỀ TÀI
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
<Divider />
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

      <Modal
        title="Từ chối đề tài"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="lyDoTuChoi"
            label="Lý do từ chối"
            rules={[{ required: true, message: 'Vui lòng nhập lý do từ chối' }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          {selectedDeTai && (
            <div>
              <p><strong>Mã đề tài:</strong> {selectedDeTai.maDeTai}</p>
              <p><strong>Tên đề tài:</strong> {selectedDeTai.tenDeTai}</p>
              <p><strong>Mã sinh viên:</strong> {selectedDeTai.maSinhVien}</p>
            </div>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default GiangVienXacNhanDeTai;

