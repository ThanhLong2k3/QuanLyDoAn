import {
  Form,
  Input,
  Button,
  DatePicker,
  Space,
  Typography,
  Row,
  Col,
  Divider,
} from "antd";
import { EditOutlined, FileTextOutlined } from "@ant-design/icons";
import "../../../pages/QL_DoAn/IndustryReportPage/IndustryReportPage.scss";
import moment from "moment";

import { WeekReport } from "../../../components/InterFace";

const { Text } = Typography;
const { TextArea } = Input;

const ReportForm = ({
  form,
  dataSource,
  currentWeekIndex,
  onFinish,
}: {
  form: any;
  dataSource: WeekReport[];
  currentWeekIndex: number;
  onFinish: any;
}) => (
  <Form
    form={form}
    name="industry_report"
    layout="vertical"
    onFinish={onFinish}
    initialValues={{
      weekId: dataSource[currentWeekIndex]?.id,
      name: dataSource[currentWeekIndex]?.title,
      work: dataSource[currentWeekIndex]?.work,
      taskContent: dataSource[currentWeekIndex]?.taskContent,
      result: dataSource[currentWeekIndex]?.result,
      report_content: dataSource[currentWeekIndex]?.content,
      reportUrl: dataSource[currentWeekIndex]?.url,
      fromDate: dataSource[currentWeekIndex]?.fromDate
        ? moment(dataSource[currentWeekIndex].fromDate, "DD/MM/YYYY")
        : null,
      toDate: dataSource[currentWeekIndex]?.toDate
        ? moment(dataSource[currentWeekIndex].toDate, "DD/MM/YYYY")
        : null,
    }}
  >
    <Divider />
    <div className="section-title">Báo cáo kết quả nghiên cứu khoa học</div>

    <Row gutter={24}>
      <Col span={4}>
        <Text strong>Tuần:</Text>
      </Col>
      <Col span={6}>
        <Form.Item name="weekId" noStyle>
          <Input
            readOnly
            value={
              form.getFieldValue("weekId") !== undefined
                ? form.getFieldValue("weekId") + 1
                : ""
            }
          />
        </Form.Item>
      </Col>
      <Col span={4}>
        <Text strong>Từ ngày:</Text>
      </Col>
      <Col span={4}>
        <Form.Item name="fromDate" noStyle>
          <DatePicker format="DD/MM/YYYY" disabled style={{ width: "100%" }} />
        </Form.Item>
      </Col>
      <Col span={2}>
        <Text strong>Đến ngày:</Text>
      </Col>
      <Col span={4}>
        <Form.Item name="toDate" noStyle>
          <DatePicker format="DD/MM/YYYY" disabled style={{ width: "100%" }} />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={24} className="mt-3">
      <Col span={4}>
        <Text strong>Công việc:</Text>
      </Col>
      <Col span={20}>
        <Form.Item name="work" noStyle>
          <Input placeholder="Xây dựng Website" />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={24} className="mt-3">
      <Col span={4}>
        <Text strong>Nội dung cần thực hiện:</Text>
      </Col>
      <Col span={20}>
        <Form.Item name="taskContent" noStyle>
          <Input placeholder="Xây dựng các chức năng chính..." />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={24} className="mt-3">
      <Col span={4}>
        <Text strong>Kết quả:</Text>
      </Col>
      <Col span={20}>
        <Form.Item name="result" noStyle>
          <Input placeholder="Trang Web phục vụ tốt..." />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={24} className="mt-3">
      <Col span={4}>
        <Text strong>Nội dung báo cáo:</Text>
      </Col>
      <Col span={20}>
        <div className="editor-toolbar">
          <Space>
            <Button.Group>
              <Button icon={<EditOutlined />} />
              <Button icon={<FileTextOutlined />} />
            </Button.Group>
          </Space>
        </div>
        <Form.Item name="report_content">
          <TextArea rows={10} />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={24} className="mt-3">
      <Col span={4}>
        <Text strong>Link báo cáo:</Text>
      </Col>
      <Col span={20}>
        <Form.Item name="reportUrl" noStyle>
          <Input placeholder="https://example.com/report-link" />
        </Form.Item>
      </Col>
    </Row>

    <div className="form-actions">
      <Button type="primary" htmlType="submit">
        Lưu lại
      </Button>
    </div>
  </Form>
);
export default ReportForm;
