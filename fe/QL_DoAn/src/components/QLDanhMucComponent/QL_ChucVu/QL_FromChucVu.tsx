
import React from 'react';
import { Form, Input, FormInstance } from 'antd';

interface ReusableFormProps {
  formdulieu: FormInstance<any> | undefined;
  isEditing:Boolean;
}

export const FormChucVu: React.FC<ReusableFormProps> = ({ formdulieu,isEditing }) => (
  <Form form={formdulieu} layout="vertical">
    <Form.Item
      name="maChucVu"
      label="Mã chức vụ"
      rules={[{ required: true, message: 'Vui lòng nhập chức vụ!' }]}
    >
      <Input disabled={isEditing===true}/>
    </Form.Item>
    <Form.Item
      name="tenChucVu"
      label="Tên chức vụ"
      rules={[{ required: true, message: 'Vui lòng nhập tên chức vụ!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item name="moTa" label="Mô tả">
      <Input.TextArea />
    </Form.Item>
  </Form>
);

 
