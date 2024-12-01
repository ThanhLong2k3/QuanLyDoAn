import React, { useEffect, useState } from 'react';
import { Form, Input, FormInstance, Select, message } from 'antd';
import { Khoa } from '../../InterFace';
import { getAll_Khoa } from '../../../sevices/Api/QL_DanhMuc/QL_Khoa-sevives';

interface ReusableFormProps {
  formdulieu: FormInstance<any> | undefined;
}

const { Option } = Select;

export const FormBoMon: React.FC<ReusableFormProps> = ({ formdulieu }) => {
  const [danhSachKhoa, setDanhSachKhoa] = useState<Khoa[]>([]); // Đổi tên tránh trùng

  useEffect(() => {
    const getKhoa = async () => {
      try {
        const response = await getAll_Khoa();
        if (response) {
          setDanhSachKhoa(response);
        } else {
          setDanhSachKhoa([]);
          message.warning('Không có dữ liệu Khoa.');
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu Khoa:', error);
        message.error('Không thể lấy dữ liệu Khoa.');
      }
    };
    getKhoa();
  }, []); // Dependency array để chạy một lần

  return (
    <Form form={formdulieu} layout="vertical">
      <Form.Item
        name="id"
        label="Mã bộ môn"
        rules={[{ required: true, message: 'Vui lòng nhập mã bộ môn!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="tenBoMon"
        label="Tên bộ môn"
        rules={[{ required: true, message: 'Vui lòng nhập tên bộ môn!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="tenKhoa"
        label="Tên Khoa"
        rules={[{ required: true, message: 'Vui lòng chọn khoa!' }]}
      >
        <Select placeholder="Chọn khoa">
          {danhSachKhoa.length > 0 ? (
            danhSachKhoa.map((item) => (
              <Option key={item.id} value={item.tenKhoa}>
                {item.tenKhoa}
              </Option>
            ))
          ) : (
            <Option value="" disabled>
              Không có dữ liệu
            </Option>
          )}
        </Select>
      </Form.Item>
    </Form>
  );
};
