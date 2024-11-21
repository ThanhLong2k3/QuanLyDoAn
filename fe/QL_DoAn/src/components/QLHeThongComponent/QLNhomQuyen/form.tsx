import React from 'react';
import { Form, Input, Select, FormInstance } from 'antd';

interface ReusableFormProps {
  formdulieu: FormInstance<any> | undefined;
}

export const FormNhomQuyen: React.FC<ReusableFormProps> = ({ formdulieu }) => (
  <Form form={formdulieu} layout="vertical">
    <Form.Item
      name="maNhomQuyen"
      label="Mã Nhóm Quyền"
      rules={[{ required: true, message: 'Vui lòng nhập mã nhóm quyền!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="tenNhomQuyen"
      label="Tên Nhóm Quyền"
      rules={[{ required: true, message: 'Vui lòng nhập tên nhóm quyền!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="loai"
      label="Loại"
      rules={[{ required: true, message: 'Vui lòng chọn loại!' }]}
    >
      <Select>
        <Select.Option value="Quản trị">Quản trị</Select.Option>
        <Select.Option value="Người dùng">Người dùng</Select.Option>
        <Select.Option value="Khác">Khác</Select.Option>
      </Select>
    </Form.Item>
    <Form.Item
      name="moTa"
      label="Mô tả"
    >
      <Input.TextArea />
    </Form.Item>
  </Form>
);