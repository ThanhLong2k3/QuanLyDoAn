import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  FormInstance,
  Select,
  Row,
  Col,
  DatePicker,
} from "antd";
import { TrinhDo } from "../../InterFace";
import { getAll_HocHam, getAll_HocVi } from "../../../sevices/Api/QL_DanhMuc/QL_TrinhDo-servives";

const { Option } = Select;

interface ReusableFormProps {
  formdulieu: FormInstance<any> | undefined;
}

export const FormGiangVien: React.FC<ReusableFormProps> = ({ formdulieu }) => {
  const [hocHam, setHocHam] = useState<TrinhDo[]>([]);
  const [hocVi, setHocVi] = useState<TrinhDo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [hocHamData, hocViData] = await Promise.all([
          getAll_HocHam(),
          getAll_HocVi()
        ]);
        debugger;
        setHocHam(hocHamData);
        setHocVi(hocViData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Form form={formdulieu} layout="vertical">
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="maGiangVien"
            label="Mã giảng viên"
            rules={[{ required: true, message: "Vui lòng nhập mã giảng viên!" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="tenGiangVien"
            label="Tên giảng viên"
            rules={[{ required: true, message: "Vui lòng nhập tên giảng viên!" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="tenBoMon"
            label="Tên bộ môn"
            rules={[{ required: true, message: "Vui lòng nhập tên bộ môn!" }]}
          >
            <Select placeholder="Chọn bộ môn">
              <Option value="Công nghệ phần mềm">Công nghệ phần mềm</Option>
              <Option value="Hệ thống thông tin">Hệ thống thông tin</Option>
              <Option value="Khoa học máy tính">Khoa học máy tính</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="chucVu"
            label="Chức vụ quản lý"
            rules={[{ required: true, message: "Vui lòng chọn chức vụ!" }]}
          >
            <Select placeholder="Chọn chức vụ">
              <Option value="Giảng viên">Giảng viên</Option>
              <Option value="Trưởng bộ môn">Trưởng bộ môn</Option>
              <Option value="Phó trưởng bộ môn">Phó trưởng bộ môn</Option>
              <Option value="Trưởng khoa">Trưởng khoa</Option>
              <Option value="Phó trưởng khoa">Phó trưởng khoa</Option>
              <Option value="Giám đốc trung tâm">Giám đốc trung tâm</Option>
              <Option value="Phó giám đốc trung tâm">
                Phó giám đốc trung tâm
              </Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="tenHocVi"
            label="Tên học vị"
          >
            <Select placeholder="Chọn học vị">
              {hocVi && hocVi.length > 0 ? (
                hocVi.map((item) => (
                  <Option key={item.id} value={item.id}>
                  {item.tenHocHam_HocVi}
                </Option>
                ))
              ) : (
                <Option value="">Không có dữ liệu</Option>
              )}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="tenHocHam" label="Tên học hàm">
            <Select placeholder="Chọn học hàm">
              {hocHam && hocHam.length > 0 ? (
                hocHam.map((item) => (
                  <Option key={item.id} value={item.id}>
                  {item.tenHocHam_HocVi}
                </Option>
                ))
              ) : (
                <Option value="">Không có dữ liệu</Option>
              )}
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
          <Form.Item name="gioiTinh" label="Giới tính">
            <Select placeholder="Giới tính">
              <Option value="Nam">Nam</Option>
              <Option value="Nữ">Nữ</Option>
              <Option value="Khác">Khác</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="sDT"
            label="Số điện thoại"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
              { pattern: /^[0-9]{10}$/, message: "Số điện thoại không hợp lệ!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

