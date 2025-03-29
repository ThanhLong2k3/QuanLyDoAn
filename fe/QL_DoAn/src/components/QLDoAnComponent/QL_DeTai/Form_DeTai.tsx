import React from "react";
import { Form, Input, Select, Radio, FormInstance } from "antd";
import { DotLamDoAn } from "../../InterFace"; 
const { Option } = Select;



interface ReusableFormProps {
  formdulieu: FormInstance<any> | undefined;
  Dot_MaGV: DotLamDoAn[];
}
export const Form_QL_DeTai: React.FC<ReusableFormProps> = ({
  formdulieu,
  Dot_MaGV,
}) => {
  return (
    <Form form={formdulieu} layout="vertical">
      <Form.Item name="maDeTai" label="Mã đề tài">
        <Input disabled />
      </Form.Item>

      <Form.Item
        name="tenDeTai"
        label="Tên đề tài"
        rules={[{ required: true, message: "Vui lòng nhập tên đề tài!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="hinhThucBaoCaoBaoVe"
        label="Hình thức báo cáo, bảo vệ"
        rules={[{ required: true }]}
      >
        <Radio.Group>
          <Radio value="Tiếng Việt, bảo vệ tiếng Việt">
            Tiếng Việt, bảo vệ tiếng Việt
          </Radio>
          <Radio value="Tiếng Việt, bảo vệ tiếng anh">
            Tiếng Việt, bảo vệ tiếng anh
          </Radio>
          <Radio value="Tiếng anh, bảo vệ tiếng anh">
            Tiếng anh, bảo vệ tiếng anh
          </Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="maDot"
        label="Tên đợt"
        rules={[{ required: true, message: "Vui lòng chọn tên đợt!" }]}
      >
        <Select>
          {Dot_MaGV.map((D) => (
            <Option
              key={D.maDot}
              value={D.maDot}
            >
              {`${D.tenDot}`}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="moTa"
        label="Mô tả đề tài"
        rules={[{ required: true, message: "Vui lòng nhập mô tả đề tài!" }]}
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
  );
};
