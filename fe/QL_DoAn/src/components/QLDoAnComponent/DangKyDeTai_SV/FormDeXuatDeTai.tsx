import React from "react";
import { Form, Input, Select, Radio, FormInstance } from "antd";
const { Option } = Select;

interface GiangVien {
  maGiangVien: string;
  tenGiangVien: string;
  soLuongHuongDan: number;
  soLuongDangHuongDan: number;
}

interface ReusableFormProps {
  formdulieu: FormInstance<any> | undefined;
  giangVienInDot: GiangVien[];
  listGroup: any[];
}
export const Form_DeXuatDeTai_SV: React.FC<ReusableFormProps> = ({
  formdulieu,
  giangVienInDot,
  listGroup,
}) => {
  return (
    <Form form={formdulieu} layout="vertical">
      <Form.Item name="maNhom" label="Chọn nhóm nghiên cứu khoa học">
        <Select
          options={
            listGroup
              ? listGroup.map((group) => ({
                  label: group.tenNhom,
                  value: group.maNhom,
                }))
              : []
          }
          notFoundContent="Bạn không là trưởng nhóm của nhóm nào!"
          placeholder="Chọn nhóm"
        />
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
        name="maGiangVien"
        label="Tên giảng viên"
        rules={[{ required: true, message: "Vui lòng chọn tên giảng viên!" }]}
      >
        <Select>
          {giangVienInDot.map((gv) => (
            <Option
              key={gv.maGiangVien}
              value={gv.maGiangVien}
              disabled={gv.soLuongDangHuongDan === gv.soLuongHuongDan}
            >
              {`${gv.maGiangVien} - ${gv.tenGiangVien} - ${gv.soLuongDangHuongDan}/${gv.soLuongHuongDan}`}
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
