
import React from 'react';
import { Form, Input, InputNumber, FormInstance } from 'antd';

interface ReusableFormProps {
  formdulieu: FormInstance<any> | undefined;
}

export const FormHocHam: React.FC<ReusableFormProps> = ({ formdulieu }) => (
  <Form form={formdulieu} layout="vertical">
    <Form.Item
      name="maHocHam"
      label="Mã học hàm"
      rules={[{ required: true, message: 'Vui lòng nhập mã học hàm!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="tenHocHam"
      label="Tên học hàm"
      rules={[{ required: true, message: 'Vui lòng nhập tên học hàm!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="kyHieu"
      label="Ký hiệu"
      rules={[{ required: true, message: 'Vui lòng nhập ký hiệu!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item name="moTa" label="Mô tả">
      <Input.TextArea />
    </Form.Item>
    <Form.Item
      name="soLuongHuongDan"
      label="Số lượng hướng dẫn"
      rules={[{ required: true, message: 'Vui lòng nhập số lượng hướng dẫn!' }]}
    >
      <InputNumber min={0} style={{ width: '100%' }} />
    </Form.Item>
  </Form>
);

 
