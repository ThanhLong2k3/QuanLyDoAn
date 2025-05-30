import React, { useEffect, useState, useCallback } from "react";
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
import {Table_XacNhanDeTai} from "../../../components/QLDoAnComponent/XacNhanDeTai/TBM_XacNhanDeTai_Table";
import { getAll_DotDoAn } from "../../../sevices/Api/QL_DoAn/QL_DotLamDoAn/QL_DotDoAn";
import {TBM_Get_DeTaiSinhVien_MaDot, TBM_XACNHANDETAI, TBM_TUCHOIDETAI} from '../../../sevices/Api/QL_DoAn/QL_DeTaiDoAn/QL_DeTai'
import { DotLamDoAn } from "../../../components/InterFace";

const { Option } = Select;
const { Title } = Typography;
const { TextArea } = Input;

interface DOT {
  maDeTai: string;
  maSinhVien: string;
  lyDoTuChoi: string;
  tenSinhVien:string;
  tenNhom:string;
  maNhom:string;
  tenDeTai: string;
}

const TBMXacNhanDeTai: React.FC = () => {
  const [selectedDot, setSelectedDot] = useState<string>("");
  const [dotLamDoAn, setDot] = useState<DotLamDoAn[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [ListDeTai, setListDeTai] = useState<DOT[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDeTai, setSelectedDeTai] = useState<DOT | null>(null);
  const [form] = Form.useForm();

  const fetchDotDoAn = useCallback(async () => {
    try {
      const data = await getAll_DotDoAn();
      setDot(data);
      if (data.length > 0) {
        setSelectedDot(data[0].maDot);
        await handleDotChange(data[0].maDot);
      }
    } catch (error) {
      console.error("Lỗi tải đợt đồ án:", error);
      message.error("Không thể tải danh sách đợt đồ án. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    document.title = 'Giảng viên xác nhận đề tài';
    fetchDotDoAn();
  }, [fetchDotDoAn]);

  const handleDotChange = useCallback(async (value: string) => {
    setSelectedDot(value);
    setLoading(true);
    try {
      const data = await TBM_Get_DeTaiSinhVien_MaDot(value);
      setListDeTai(data);
    } catch (error) {
      console.error("Lỗi tải danh sách đề tài:", error);
      message.error("Không thể tải danh sách đề tài. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const DongY = async (banGhi: DOT) => {
    try {
      const data = {
        maDeTai: banGhi.maDeTai,
        maNhom: banGhi.maNhom,
        lyDoTuChoi: ""
      };
      await TBM_XACNHANDETAI(data,fetchDotDoAn);
      message.success('Đã xác nhận đề tài thành công');
      await handleDotChange(selectedDot);
    } catch (error) {
      console.error("Lỗi khi xác nhận đề tài:", error);
      message.error('Có lỗi xảy ra khi xác nhận đề tài');
    }
  };

  const KhongDongY = (banGhi: DOT) => {
    setSelectedDeTai(banGhi);
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (selectedDeTai) {
        const data = {
          maDeTai: selectedDeTai.maDeTai,
          maNhom: selectedDeTai.maNhom,
          lyDoTuChoi: values.lyDoTuChoi
        };
        await TBM_TUCHOIDETAI(data,fetchDotDoAn);
        setIsModalVisible(false);
        form.resetFields();
        message.success('Đã từ chối đề tài thành công');
        await handleDotChange(selectedDot);
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

  const filteredListDeTai = ListDeTai.filter(deTai => 
    deTai.tenDeTai.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deTai.maSinhVien.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <Card 
        className="shadow-lg rounded-xl" 
        bordered={false}
        style={{ height: "91vh" }}
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
           TRƯỞNG BỘ MÔN XÁC NHẬN ĐỀ TÀI
          </Title>

          <Divider />

          <Row gutter={[16, 16]} align="middle" className="mb-6">
            <Col xs={24} sm={24} md={12} lg={10}>
              <Input 
                prefix={<SearchOutlined />}
                placeholder="Tìm kiếm theo tên đề tài hoặc mã sinh viên"
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
          <Table
            columns={Table_DeTai}
            dataSource={filteredListDeTai}
            rowKey="maDeTai"
            scroll={{ x: 768, y:400 }}
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
              <p><strong>Tên trưởng nhóm:</strong> {selectedDeTai.tenSinhVien}</p>
              <p><strong>Tên đề tài:</strong> {selectedDeTai.tenDeTai}</p>
              <p><strong>Tên nhóm:</strong> {selectedDeTai.tenNhom}</p>
            </div>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default TBMXacNhanDeTai;

