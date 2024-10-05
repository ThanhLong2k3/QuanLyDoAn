
import React from 'react';
import { Form, Input, InputNumber, FormInstance,Select } from 'antd';
const { Option } = Select;
interface ReusableFormProps {
  formdulieu: FormInstance<any> | undefined;
}

export const FormLop: React.FC<ReusableFormProps> = ({ formdulieu }) => (
  <Form form={formdulieu} layout="vertical">
    <Form.Item
      name="maLop"
      label="Mã lớp"
      rules={[{ required: true, message: 'Vui lòng nhập mã lớp!' }]}
    >
      <InputNumber  min={0} style={{ width: '100%' }} />
    </Form.Item>
    <Form.Item
      name="tenLop"
      label="Tên lớp"
      rules={[{ required: true, message: 'Vui lòng nhập tên lớp!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="tenChuyenNganh"
      label="Tên chuyên ngành"
      rules={[{ required: true, message: 'Vui chọn chuyên ngành!' }]}
    >
        <Select placeholder="Chọn chuyên ngành">
             <Option value="Công nghệ web">Công nghệ web</Option>
             <Option value="Công nghệ di động">Công nghệ di động</Option>
             <Option value="Kiểm thử và đảm bảo chất lượng phần mềm">Kiểm thử và đảm bảo chất lượng phần mềm</Option>
             <Option value="Chuyên ngành phát triển IOT">Chuyên ngành phát triển IOT</Option>
             <Option value="Đồ họa đa phương tiện">Đồ họa đa phương tiện</Option>
             <Option value="Mạng máy tính và truyền thông">Mạng máy tính và truyền thông</Option>
             <Option value="Khoa học dữ liệu">Khoa học dữ liệu</Option>
             <Option value="Xử lý ngôn ngữ tự nhiên">Xử lý ngôn ngữ tự nhiên</Option>
             <Option value="Thị giác máy tính">Thị giác máy tính</Option>
       </Select>
    </Form.Item>
    <Form.Item
      name="khoaHoc"
      label="Khóa Học"
      rules={[{ required: true, message: 'Vui lòng chọn khóa học!' }]}
    >
        <Select placeholder="Chọn khóa học">
             <Option value="2018-2022">2018-2022</Option>
             <Option value="2019-2023">2019-2023</Option>
             <Option value="2020-2021">2020-2021</Option>
             <Option value="2022-2023">2022-2023</Option>
             <Option value="2023-2024">2023-2024</Option>
             <Option value="2024-2025">2024-2025</Option>
             <Option value="2025-2026">2025-2026</Option>
             <Option value="2026-2027">2026-2027</Option>
             <Option value="2027-2028">2027-2028</Option>
             <Option value="2028-2029">2028-2029</Option>
       </Select>
    </Form.Item>
    
  </Form>
);

 
