import React from "react";
import { Form, Input, DatePicker, FormInstance, Switch, Row, Col, Select } from "antd";

interface ReusableFormProps {
  formdulieu: FormInstance<any> | undefined;
  isEditing:Boolean;
}

const { Option } = Select;
const years = Array.from({ length: 10 }, (_, i) => 2021 + i).map(
  (year) => `${year}-${year + 1}`
);

export const FormDotLamDoAn: React.FC<ReusableFormProps> = ({ formdulieu,isEditing }) => (
  <Form
    form={formdulieu}
    layout="vertical"
    initialValues={{
      dangKyDeTai: false,
      choPhepSinhVienDangKyGiangVienKhacBoMon: false,
      choPhepSinhVienBaoCaoKhacTuanHienTai: false,
      choPhepGiangVienBaoCaoKhacTuanHienTai: false,
      choPhepGiangVienSuaDeTai: false,
      trangThai: false,
    }}
  >
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="maDot"
          label="Mã đợt"
          rules={[{ required: true, message: "Vui lòng nhập mã đợt!" }]}
        >
          <Input disabled={isEditing===true}/>
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
          rules={[{ required: true, message: "Vui lòng chọn năm áp dụng!" }]}
        >
          <Select placeholder="Chọn khóa học">
            {years.map((year) => (
              <Option key={year} value={year}>
                {year}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={16}>
      <Col span={12}>
        <Form.Item name="dangKyDeTai" label="Đăng ký đề tài" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="choPhepSinhVienDangKyGiangVienKhacBoMon"
          label="Sinh viên đăng ký giảng viên khác bộ môn"
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
          label="Sinh viên báo cáo khác tuần hiện tại"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="choPhepGiangVienBaoCaoKhacTuanHienTai"
          label="Giảng viên báo cáo khác tuần hiện tại"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="choPhepGiangVienSuaDeTai"
          label="Giảng viên sửa đề tài"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="trangThai" label="Trạng thái" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Col>
    </Row>
  </Form>
);
