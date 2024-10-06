import React from "react";
import { Form, Input, InputNumber, FormInstance, Select, Row, Col } from "antd";

const { Option } = Select;

interface ReusableFormProps {
  formdulieu: FormInstance<any> | undefined;
}

export const FormGiangVien: React.FC<ReusableFormProps> = ({ formdulieu }) => (
  <Form form={formdulieu} layout="vertical">
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="maGiangVien"
          label="Mã giảng viên"
          rules={[{ required: true, message: "Vui lòng nhập mã giảng viên!" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="tenGiangVien"
          label="Tên giảng viên"
          rules={[{ required: true, message: "Vui lòng nhập tên giảng viên!" }]}
        >
          <Input />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="tenBoMon"
          label="Tên bộ môn"
          rules={[{ required: true, message: "Vui lòng nhập tên bộ môn!" }]}
        >
          <Select placeholder="Chọn bộ môn">
            <Option value="Công nghệ phần mềm">Công nghệ phần mềm</Option>
            <Option value="Hệ thống thông tin">Hệ thống thông tin</Option>
            <Option value="Khoa học máy tính">Khoa học máy tính</Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="chucVu"
          label="Chức vụ quản lý"
          rules={[{ required: true, message: "Vui lòng chọn chức vụ!" }]}
        >
          <Select placeholder="Chọn chức vụ">
            <Option value="Giảng viên">Giảng viên</Option>
            <Option value="Trưởng bộ môn">Trưởng bộ môn</Option>
            <Option value="Phó trưởng bộ môn">Phó trưởng bộ môn</Option>
            <Option value="Trưởng khoa">Trưởng khoa</Option>
            <Option value="Phó trưởng khoa">Phó trưởng khoa</Option>
            <Option value="Giám đốc trung tâm">Giám đốc trung tâm</Option>
            <Option value="Phó giám đốc trung tâm">
              Phó giám đốc trung tâm
            </Option>
          </Select>
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="tenHocVi"
          label="Tên học vị"
          rules={[{ required: true, message: "Vui lòng chọn học vị!" }]}
        >
          <Select placeholder="Chọn học vị">
            <Option value="Cử nhân">Cử nhân</Option>
            <Option value="Thạc sĩ">Thạc sĩ</Option>
            <Option value="Tiến sĩ">Tiến sĩ</Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="tenHocHam" label="Tên học hàm">
          <Select placeholder="Chọn học hàm">
            <Option value="Không có">Không có</Option>
            <Option value="Phó Giáo sư">Phó Giáo sư</Option>
            <Option value="Giáo sư">Giáo sư</Option>
          </Select>
        </Form.Item>
      </Col>
    </Row>

    <Form.Item
      name="SDT"
      label="Số điện thoại"
      rules={[
        { required: true, message: "Vui lòng nhập số điện thoại!" },
        { pattern: /^[0-9]{10}$/, message: "Số điện thoại không hợp lệ!" },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="email"
      label="Email"
      rules={[
        { required: true, message: "Vui lòng nhập email!" },
        { type: "email", message: "Email không hợp lệ!" },
      ]}
    >
      <Input />
    </Form.Item>
  </Form>
);
