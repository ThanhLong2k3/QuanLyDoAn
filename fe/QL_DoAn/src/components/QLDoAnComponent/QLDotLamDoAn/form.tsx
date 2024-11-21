import React from "react";
import { Form, Input, DatePicker, FormInstance, Switch, Row, Col } from "antd";

interface ReusableFormProps {
  formdulieu: FormInstance<any> | undefined;
}

export const FormDotLamDoAn: React.FC<ReusableFormProps> = ({ formdulieu }) => (
  <Form form={formdulieu} layout="vertical">
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="maDot"
          label="Mã đợt"
          rules={[{ required: true, message: "Vui lòng nhập mã đợt!" }]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="tenDot"
          label="Tên đợt"
          rules={[{ required: true, message: "Vui lòng nhập tên đợt!" }]}
        >
          <Input />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="ngayBatDau"
          label="Ngày bắt đầu"
          rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu!" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="namApDung"
          label="Năm áp dụng"
          rules={[{ required: true, message: "Vui lòng nhập năm áp dụng!" }]}
        >
          <Input />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="dangKyDeTai"
          label="Đăng ký đề tài"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="choPhepSinhVienDangKyGiangVienKhacBoMon"
          label="Cho phép sinh viên đăng ký giảng viên khác bộ môn"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="choPhepSinhVienBaoCaoKhacTuanHienTai"
          label="Cho phép sinh viên báo cáo khác tuần hiện tại"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="choPhepGiangVienBaoCaoKhacTuanHienTai"
          label="Cho phép giảng viên báo cáo khác tuần hiện tại"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="ChoPhepGiangVienSuaDeTai"
          label="Cho phép giảng viên sửa đề tài"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="trangThai"
          label="Trạng thái"
          valuePropName="checked"
          rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
        >
          <Switch />
        </Form.Item>
      </Col>
    </Row>
  </Form>
);
