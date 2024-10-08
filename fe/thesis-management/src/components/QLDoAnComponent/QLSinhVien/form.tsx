import React from "react";
import { Form, Input, DatePicker, Select, FormInstance, Row, Col } from "antd";

interface SinhVienFormProps {
  formdulieu: FormInstance<any> | undefined;
}

export const SinhVienForm: React.FC<SinhVienFormProps> = ({ formdulieu }) => (
  <Form form={formdulieu} layout="vertical">
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="maSinhVien"
          label="Mã sinh viên"
          rules={[{ required: true, message: "Vui lòng nhập mã sinh viên!" }]}
        >
          <Input type="number" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="tenSinhVien"
          label="Tên sinh viên"
          rules={[{ required: true, message: "Vui lòng nhập tên sinh viên!" }]}
        >
          <Input />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
      <Form.Item
      name="maLop"
      label="Mã lớp"
      rules={[{ required: true, message: "Vui lòng nhập mã lớp!" }]}
    >
      <Input />
    </Form.Item>
      </Col>
      <Col span={12}>
      <Form.Item name="tenTrangThai" label="Tên trạng thái">
      <Input />
    </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
      <Form.Item
      name="ngaySinh"
      label="Ngày sinh"
      rules={[{ required: true, message: "Vui lòng chọn ngày sinh!" }]}
    >
      <DatePicker style={{ width: "100%" }} />
    </Form.Item>
      </Col>
      <Col span={12}>
        
    <Form.Item
      name="email"
      label="Email"
      rules={[
        { required: true, message: "Vui lòng nhập email!" },
        { type: "email", message: "Vui lòng nhập email hợp lệ!" },
      ]}
    >
      <Input />
    </Form.Item>
      </Col>
    </Row>
   
    
    <Form.Item
      name="gioiTinh"
      label="Giới tính"
      rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
    >
      <Select>
        <Select.Option value="Nam">Nam</Select.Option>
        <Select.Option value="Nữ">Nữ</Select.Option>
        <Select.Option value="Khác">Khác</Select.Option>
      </Select>
    </Form.Item>
    <Form.Item
      name="SDT"
      label="Số điện thoại"
      rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
    >
      <Input />
    </Form.Item>
  </Form>
);
