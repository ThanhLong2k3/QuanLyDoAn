import React from 'react';
import { Form, Input, DatePicker, Radio, FormInstance } from 'antd';
interface ReusableFormProps {
  formdulieu: FormInstance<any> | undefined;
}

export const FormNguoiDung: React.FC<ReusableFormProps> = ({ formdulieu }) => (
  <Form form={formdulieu} layout="vertical">
    <Form.Item
      name="tk"
      label="Tài khoản"
      rules={[{ required: true, message: 'Vui lòng nhập tài khoản!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="ten"
      label="Tên người dùng"
      rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="ngaySinh"
      label="Ngày sinh"
      rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
    >
      <DatePicker style={{ width: '100%' }} />
    </Form.Item>
    <Form.Item
      name="gioiTinh"
      label="Giới tính"
      rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
    >
      <Radio.Group>
        <Radio value="Nam">Nam</Radio>
        <Radio value="Nữ">Nữ</Radio>
        <Radio value="Khác">Khác</Radio>
      </Radio.Group>
    </Form.Item>
    <Form.Item
      name="email"
      label="Email"
      rules={[
        { required: true, message: 'Vui lòng nhập email!' },
        { type: 'email', message: 'Email không hợp lệ!' },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item name="moTa" label="Mô tả">
      <Input.TextArea />
    </Form.Item>
  </Form>
);
