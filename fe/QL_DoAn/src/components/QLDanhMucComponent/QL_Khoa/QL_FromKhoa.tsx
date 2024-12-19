
import React from 'react';
import { Form, Input, FormInstance } from 'antd';

interface ReusableFormProps {
  formdulieu: FormInstance<any> | undefined;
  isEditing:Boolean;
}

export const FormKhoa: React.FC<ReusableFormProps> = ({ formdulieu,isEditing }) => (
  <Form form={formdulieu} layout="vertical">
    <Form.Item
      name="maKhoa"
      label="Mã khoa"
      rules={[{ required: true, message: 'Vui lòng nhập mã khoa!' }]}
    >
      <Input disabled={isEditing === true} />
    </Form.Item>
    <Form.Item
      name="tenKhoa"
      label="Tên khoa"
      rules={[{ required: true, message: 'Vui lòng nhập tên khoa!' }]}
    >
      <Input />
    </Form.Item>
    
  </Form>
);

 
