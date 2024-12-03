import React, { useEffect, useState } from "react";
import { Form, Input, DatePicker, Select, FormInstance, Row, Col, message } from "antd";
import { getAll } from '../../../sevices/Api/QL_DoAn/QL_Lop-servives'
import { Lop } from '../../InterFace/index';

interface SinhVienFormProps {
  formdulieu: FormInstance<any> | undefined;
}

export const SinhVienForm: React.FC<SinhVienFormProps> = ({ formdulieu }) => {
  const [lop, setLop] = useState<Lop[]>([]);

  useEffect(() => {
    const fetchLop = async () => {
      try {
        const data: Lop[] = await getAll();
        setLop(data);
      } catch (error) {
        message.error("Có lỗi xảy ra khi lấy danh sách lớp!");
      }
    };
    fetchLop();
  }, []);

  return (
    <Form form={formdulieu} layout="vertical">
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="maSinhVien"
            label="Mã sinh viên"
            rules={[{ required: true, message: "Vui lòng nhập mã sinh viên!" }]}
          >
            <Input type="number" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="tenSinhVien"
            label="Tên sinh viên"
            rules={[{ required: true, message: "Vui lòng nhập tên sinh viên!" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="maLop"
            label="Mã lớp"
            rules={[{ required: true, message: "Vui lòng chọn mã lớp!" }]}
          >
            <Select placeholder="Chọn mã lớp">
              {lop.map((lopItem) => (
                <Select.Option key={lopItem.maLop} value={lopItem.maLop}>
                  {lopItem.maLop}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="gioiTinh"
            label="Giới tính"
            rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
          >
            <Select placeholder="Chọn giới tính">
              <Select.Option value="Nam">Nam</Select.Option>
              <Select.Option value="Nữ">Nữ</Select.Option>
              <Select.Option value="Khác">Khác</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="ngaySinh"
            label="Ngày sinh"
            rules={[{ required: true, message: "Vui lòng chọn ngày sinh!" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Vui lòng nhập email hợp lệ!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        name="sDT"
        label="Số điện thoại"
        rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};
