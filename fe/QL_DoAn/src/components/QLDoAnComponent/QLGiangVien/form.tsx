import React, { useState, useEffect } from "react";
import { Form, Input, FormInstance, Select, Row, Col, DatePicker, message } from "antd";
import { HocVi, HocHam, BoMon, ChucVu } from "../../InterFace";
import { getAll_HocVi } from "../../../sevices/Api/QL_DanhMuc/QL_HocVi-servives";
import { getAll_HocHam } from "../../../sevices/Api/QL_DanhMuc/QL_HocHam-servives";
import { getAll_BoMon } from "../../../sevices/Api/QL_DanhMuc/QL_BoMon-servives";
import { getAll_ChucVu } from "../../../sevices/Api/QL_DanhMuc/QL_ChucVu-sevives";
import moment from 'moment';

const { Option } = Select;

interface ReusableFormProps {
  formdulieu: FormInstance<any>;
  initialValues?: any;
  isEditing:Boolean;
}

export const FormGiangVien: React.FC<ReusableFormProps> = ({ formdulieu, initialValues,isEditing }) => {
  const [hocHam, setHocHam] = useState<HocHam[]>([]);
  const [hocVi, setHocVi] = useState<HocVi[]>([]);
  const [boMon, setBoMon] = useState<BoMon[]>([]);
  const [chucVu, setChucVu] = useState<ChucVu[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [hocHamData, hocViData, boMonData, chucVuData] = await Promise.all([
          getAll_HocHam(),
          getAll_HocVi(),
          getAll_BoMon(),
          getAll_ChucVu(),
        ]);

        setHocHam(hocHamData || []);
        setHocVi(hocViData || []);
        setBoMon(boMonData || []);
        setChucVu(chucVuData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Không thể tải dữ liệu, vui lòng thử lại!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (initialValues && !loading) {
      formdulieu.setFieldsValue({
        ...initialValues,
        idBoMon: boMon.find(bm => bm.tenBoMon === initialValues.tenBoMon)?.maBoMon,
        idChucVu: chucVu.find(cv => cv.tenChucVu === initialValues.tenChucVu)?.maChucVu,
        idHocVi: hocVi.find(hv => hv.tenHocVi === initialValues.tenHocVi)?.maHocVi,
        idHocHam: hocHam.find(hh => hh.tenHocHam === initialValues.tenHocHam)?.maHocHam,
        ngaySinh: initialValues.ngaySinh ? moment(initialValues.ngaySinh) : null,
      });
    }
  }, [initialValues, boMon, chucVu, hocVi, hocHam, loading, formdulieu]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Form form={formdulieu} layout="vertical">
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="maGiangVien"
            label="Mã giảng viên"
            rules={[{ required: true, message: "Vui lòng nhập mã giảng viên!" }]}
          >
            <Input disabled={isEditing===true}/>
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
            name="idBoMon"
            label="Tên bộ môn"
            rules={[{ required: true, message: "Vui lòng chọn bộ môn!" }]}
          >
            <Select placeholder="Chọn bộ môn">
              {boMon.map((item) => (
                <Option key={item.maBoMon} value={item.maBoMon}>{item.tenBoMon}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="idChucVu"
            label="Chức vụ quản lý"
            rules={[{ required: true, message: "Vui lòng chọn chức vụ!" }]}
          >
            <Select placeholder="Chọn chức vụ">
              {chucVu.map((item) => (
                <Option key={item.maChucVu} value={item.maChucVu}>{item.tenChucVu}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="idHocVi"
            label="Tên học vị"
          >
            <Select placeholder="Chọn học vị">
              {hocVi.map((item) => (
                <Option key={item.maHocVi} value={item.maHocVi}>{item.tenHocVi}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="idHocHam" label="Tên học hàm">
            <Select placeholder="Chọn học hàm">
              {hocHam.map((item) => (
                <Option key={item.maHocHam} value={item.maHocHam}>{item.tenHocHam}</Option>
              ))}
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
            <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
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