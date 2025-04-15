import { useEffect } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Space,
  Typography,
  Row,
  Col,
  Card,
  Tooltip,
  InputNumber,
} from "antd";
import {
  CalendarOutlined,
  CheckCircleOutlined,
  EditOutlined,
  FileSearchOutlined,
  FileTextOutlined,
  FormOutlined,
  LinkOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import moment from "moment";

const { TextArea } = Input;

const FormTeacherReport = ({
  form,
  dataSource,
  currentWeekIndex,
  onFinish,
}: {
  form: any;
  dataSource: any[];
  currentWeekIndex: number;
  onFinish: any;
}) => {
  const weekData = dataSource[currentWeekIndex];

  useEffect(() => {
    if (weekData) {
      console.log(currentWeekIndex);
      form.setFieldsValue({
        weekId: weekData.soTuan,
        name: weekData.title,
        work: weekData.congViec,
        taskContent: weekData.noiDungThucHien,
        result: weekData.ketQuaDatDuoc,
        report_content: weekData.noiDungBaoCao,
        reportUrl: weekData.duongDanBaoCao,
        fromDate: weekData.tuNgay ? moment(weekData.tuNgay) : null,
        toDate: weekData.denNgay ? moment(weekData.denNgay) : null,
        diem: weekData.diem,
        nhanXetCuaGiangVien: weekData.nhanXetCuaGiangVien,
      });
    }
  }, [currentWeekIndex, weekData, form]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      className="teacher-report-form"
    >
      <Card
        title={
          <Space>
            <CalendarOutlined />
            <span>Thông tin tuần báo cáo</span>
          </Space>
        }
        bordered={false}
        className="info-card"
      >
        <Row gutter={24}>
          <Col xs={24} sm={8} md={6} lg={4}>
            <Form.Item label="Tuần" name="weekId">
              <Input readOnly prefix={<FileSearchOutlined />} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={16} md={18} lg={20}>
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item label="Từ ngày" name="fromDate">
                  <DatePicker
                    format="DD/MM/YYYY"
                    disabled
                    style={{ width: "100%" }}
                    placeholder="Chọn ngày bắt đầu"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Đến ngày" name="toDate">
                  <DatePicker
                    format="DD/MM/YYYY"
                    disabled
                    style={{ width: "100%" }}
                    placeholder="Chọn ngày kết thúc"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>

      <Card
        title={
          <Space>
            <FormOutlined />
            <span>Chi tiết công việc</span>
          </Space>
        }
        className="mt-4 details-card"
        bordered={false}
      >
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Công việc"
              name="work"
              rules={[{ required: true, message: "Vui lòng nhập công việc" }]}
            >
              <Input placeholder="Ví dụ: Xây dựng Website" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Nội dung cần thực hiện"
              name="taskContent"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập nội dung cần thực hiện",
                },
              ]}
            >
              <Input placeholder="Ví dụ: Xây dựng các chức năng chính..." />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Kết quả đạt được"
              name="result"
              rules={[
                { required: true, message: "Vui lòng nhập kết quả đạt được" },
              ]}
            >
              <Input placeholder="Ví dụ: Trang Web phục vụ tốt..." />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label={
                <Space>
                  <span>Đường dẫn báo cáo</span>
                  <Tooltip title="Nhập URL dẫn đến tài liệu báo cáo chi tiết">
                    <LinkOutlined />
                  </Tooltip>
                </Space>
              }
              name="reportUrl"
            >
              <Input
                placeholder="https://example.com/report-link"
                prefix={<LinkOutlined />}
              />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      <Card
        title={
          <Space>
            <FileTextOutlined />
            <span>Nội dung báo cáo chi tiết</span>
          </Space>
        }
        className="mt-4 report-content-card"
        bordered={false}
      >
        <div className="editor-toolbar">
          <Space>
            <Button.Group>
              <Tooltip title="Chỉnh sửa">
                <Button icon={<EditOutlined />} />
              </Tooltip>
              <Tooltip title="Xem trước">
                <Button icon={<FileTextOutlined />} />
              </Tooltip>
            </Button.Group>
          </Space>
        </div>
        <Form.Item
          name="report_content"
          rules={[
            { required: true, message: "Vui lòng nhập nội dung báo cáo" },
          ]}
        >
          <TextArea
            rows={10}
            placeholder="Nhập nội dung báo cáo chi tiết ở đây..."
            className="report-textarea"
          />
        </Form.Item>
      </Card>

      <Card
        title={
          <Space>
            <CheckCircleOutlined />
            <span>Đánh giá của giảng viên</span>
          </Space>
        }
        className="mt-4 evaluation-card"
        bordered={false}
      >
        <Form.Item label="Nhận xét của giảng viên" name="nhanXetCuaGiangVien">
          <TextArea
            rows={6}
            placeholder="Nhập nhận xét về báo cáo và công việc của sinh viên..."
            className="feedback-textarea"
          />
        </Form.Item>

        <Form.Item
          label="Điểm đánh giá"
          name="diem"
          rules={[
            {
              type: "number",
              min: 0,
              max: 10,
              message: "Điểm phải nằm trong khoảng từ 0 đến 10",
            },
          ]}
        >
          <InputNumber
            min={0}
            max={10}
            step={0.1}
            placeholder="VD: 8.5"
            style={{ width: "100%" }}
          />
        </Form.Item>
      </Card>

      <div
        className="form-actions"
        style={{ textAlign: "right", marginTop: 24, marginBottom: 24 }}
      >
        <Button
          type="primary"
          htmlType="submit"
          icon={<SaveOutlined />}
          size="large"
        >
          Lưu đánh giá
        </Button>
      </div>
    </Form>
  );
};

export default FormTeacherReport;
