import React from 'react';
import { Form, Input, Select, Radio ,FormInstance} from 'antd';

const { Option } = Select;

interface ReusableFormProps {
  formdulieu: FormInstance<any> | undefined;
  maDot:string;
}
export const Form_DeXuatDeTai_SV: React.FC<ReusableFormProps> = ({formdulieu,maDot}) => (
    <Form form={formdulieu} layout="vertical">
      <Form.Item
        name="ma_de_tai"
        label="Mã đề tài"
        rules={[{ required: true, message: 'Vui lòng nhập mã đề tài!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="ten_de_tai"
        label="Tên đề tài"
        rules={[{ required: true, message: 'Vui lòng nhập tên đề tài!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="tieng_viet_bao_ve"
        label="Tiếng Việt, bảo vệ tiếng Việt"
        rules={[{ required: true }]}
      >
        <Radio.Group>
          <Radio value="tieng_viet_bao_ve_tieng_viet">Tiếng Việt, bảo vệ tiếng Việt</Radio>
          <Radio value="tieng_viet_bao_ve_tieng_anh">Tiếng Việt, bảo vệ tiếng anh</Radio>
          <Radio value="tieng_anh_bao_ve_tieng_anh">Tiếng anh, bảo vệ tiếng anh</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="ten_giang_vien"
        label="Tên giảng viên"
        rules={[{ required: true, message: 'Vui lòng chọn tên giảng viên!' }]}
      >
        <Select>
          <Option value="giang_vien_1">Giảng viên 1</Option>
          <Option value="giang_vien_2">Giảng viên 2</Option>
          <Option value="giang_vien_3">Giảng viên 3</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="mo_ta_de_tai"
        label="Mô tả đề tài"
        rules={[{ required: true, message: 'Vui lòng nhập mô tả đề tài!' }]}
      >
        <Input.TextArea />
      </Form.Item>
    </Form>
  );

