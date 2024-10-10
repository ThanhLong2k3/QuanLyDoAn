import React from 'react';
import { Form, Input, DatePicker, Radio, FormInstance } from 'antd';
interface ReusableFormProps {
  form : FormInstance<any> | undefined;
}

export const FormNguoiDung: React.FC<ReusableFormProps> = ({ form  }) => (
  <Form form={form } layout="vertical">
    <Form.Item
      name="taiKhoan"
      label="Tài khoản"
      rules={[{ required: true, message: 'Vui lòng nhập tài khoản!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="hoTen"
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
      <DatePicker style={{ width: '100%' }}
         format="YYYY-MM-DD"
      />
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
