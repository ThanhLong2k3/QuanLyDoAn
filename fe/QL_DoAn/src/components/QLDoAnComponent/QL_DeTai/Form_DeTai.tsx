import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Radio ,FormInstance,Row,Col} from 'antd';
import {getGiangVien_maDot} from "../../../sevices/Api/QL_DoAn/QL_DotLamDoAn/GiangVien_Dot-servives"
const { Option } = Select;

interface GiangVien {
  maGiangVien: string;
  tenGiangVien: string;
  soLuongHuongDan: number;
  soLuongDangHuongDan: number;
}

interface ReusableFormProps {
  formdulieu: FormInstance<any> | undefined;
  giangVienInDot:GiangVien[]
}
export const Form_DeXuatDeTai_SV: React.FC<ReusableFormProps> = ({formdulieu,giangVienInDot}) => {
  
  return(
    <Form form={formdulieu} layout="vertical">
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
        name="maDeTai"
        label="Mã đề tài"
      >
        <Input disabled />
      </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="maDot" label="Tên đợt">
            <Select placeholder="Chọn đợt">
                <Option>aaaaaaaaaaaa</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        name="tenDeTai"
        label="Tên đề tài"
        rules={[{ required: true, message: 'Vui lòng nhập tên đề tài!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="moTa"
        label="Mô tả đề tài"
        rules={[{ required: true, message: 'Vui lòng nhập mô tả đề tài!' }]}
      >
        <Input.TextArea
                  rows={4}
                  maxLength={500}
                  showCount
                  placeholder="Nhập mô tả chi tiết về đề tài"
                  autoSize={{ minRows: 4, maxRows: 8 }}
                />
      </Form.Item>
    </Form>
)};

