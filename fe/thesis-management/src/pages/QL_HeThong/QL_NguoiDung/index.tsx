import React, { useEffect, useState } from "react";
import { Card, Table, Button, Popconfirm, Row, Col, Input, Select, Space, Typography, Divider, Form, message } from "antd";
import { NguoiDung } from "../../../components/InterFace";
import ReusableModal from "../../../components/UI/Modal";
import { FormNguoiDung } from "../../../components/QLHeThongComponent/QL_NguoiDung/QL_NguoiDungForm";
import { CoLumNguoiDung } from "../../../components/QLHeThongComponent/QL_NguoiDung/TableNguoiDung";
import { DeleteOutlined, SearchOutlined, UserAddOutlined, FilterOutlined } from "@ant-design/icons";
import { getall,add,edit } from "../../../sevices/Api/nguoiDung-servives";
import {URL} from "../../../sevices/Url"

import moment from 'moment';
const { Option } = Select;
const { Title } = Typography;


const QuanLyNguoiDung: React.FC = () => {
  const [nguoiDung, setNguoiDung] = useState<NguoiDung[]>([]);
  const [hienModal, setHienModal] = useState<boolean>(false);
  const [formdulieu] = Form.useForm();
  const [keyDangSua, setKeyDangSua] = useState<string | null>(null);
  const [cacDongDaChon, setCacDongDaChon] = useState<React.Key[]>([]);
  const [timKiem, setTimKiem] = useState("");
  const [trangThai, setTrangThai] = useState<string | null>(null);
  const [duLieuLoc, setDuLieuLoc] = useState<NguoiDung[]>([]);

  useEffect(() => {
    document.title = "Quản lý người dùng";
    getllNguoiDung();
  }, []);

  const getllNguoiDung = async () => {
      let data = await getall(URL.QLHETHONG.QLNGUOIDUNG.GETALL);
      setNguoiDung(data);
  };

  const hienThiModal = (banGhi?: NguoiDung) => {
    formdulieu.resetFields();
    if (banGhi) {
        const ngaySinhValue = banGhi.ngaySinh ? moment(banGhi.ngaySinh) : null;
        formdulieu.setFieldsValue({ ...banGhi, ngaySinh: ngaySinhValue });
        setKeyDangSua(banGhi.taiKhoan);
    } else {
        setKeyDangSua(null);
    }
    setHienModal(true);
  };

  useEffect(() => {
    const ketQuaLoc = nguoiDung.filter(
      (nguoi) =>
        (nguoi.hoTen.toLowerCase().includes(timKiem.toLowerCase()) ||
          nguoi.trangThai.toLowerCase().includes(timKiem.toLowerCase())) &&
        (trangThai === null || nguoi.trangThai === trangThai)
    );
    setDuLieuLoc(ketQuaLoc);
  }, [nguoiDung, timKiem, trangThai]);

  const xuLyDongY =async () => {
     const giatri= await formdulieu.validateFields();

      if (keyDangSua !== null) {
          await edit(URL.QLHETHONG.QLNGUOIDUNG.UPDATE,giatri,getllNguoiDung);
       message.success(`Tài khoản ${giatri.taiKhoan} đã được sửa thành công!`);

      } else {
        await add(URL.QLHETHONG.QLNGUOIDUNG.ADD,giatri,getllNguoiDung);
      }
      setHienModal(false);
      formdulieu.resetFields();
      setKeyDangSua(null);
    
  };

  const xuLykichhoat =async () => {
    let a=cacDongDaChon.length;
    for (const taiKhoan of cacDongDaChon) {
      const banGhi = nguoiDung.find(user => user.taiKhoan === taiKhoan);
      if (banGhi) {
        const newStatus =  "Đã xét duyệt";
        await edit(URL.QLHETHONG.QLNGUOIDUNG.UPDATE,{ ...banGhi, trangThai: newStatus }, getllNguoiDung);
      }
    }
    message.success(`${a} tài khoản đã được  "xét duyệt" !`);

  };

  
  const kichHoat = async(banGhi: NguoiDung) => {
    if(banGhi.trangThai==="Chưa xét duyệt")
    {
      let giatri={...banGhi,trangThai:"Đã xét duyệt"};
      await edit(URL.QLHETHONG.QLNGUOIDUNG.UPDATE,giatri,getllNguoiDung);
       message.success(`Tài khoản ${banGhi.taiKhoan} đã được kích hoạt thành công!`);
    }
    else{
      let giatri={...banGhi,trangThai:"Chưa xét duyệt"};
      await edit(URL.QLHETHONG.QLNGUOIDUNG.UPDATE,giatri,getllNguoiDung);
      message.success(`Tài khoản ${banGhi.taiKhoan} đã được hủy kích hoạt!`);
    }
    
  };
  const khoiPhucMatKhau = async(banGhi: NguoiDung) => {
    const mk="123456";
    let giatri={...banGhi,matKhau:mk};
    await edit(URL.QLHETHONG.QLNGUOIDUNG.UPDATE,giatri,getllNguoiDung);
    message.success(`Mật khẩu của tài khoản ${banGhi.taiKhoan} đã được khôi phục thành công!`);
  };
  const cotBang = CoLumNguoiDung(hienThiModal, kichHoat,khoiPhucMatKhau);
  const chonDong = (cacKeyChon: React.Key[]) => {
    setCacDongDaChon(cacKeyChon);
  };

  const luaChonDong = {
    selectedRowKeys: cacDongDaChon,
    onChange: chonDong,
  };

  return (
    <>
      <Card className="overflow-hidden">
        <div className="p-6">
          <Title
            level={2}
            className="text-center custom-blue mb-8"
            style={{ color: "#1e88e5", fontSize: "25px", fontWeight: "bold" }}
          >
            QUẢN LÝ NGƯỜI DÙNG
          </Title>
          <hr />
          <Row gutter={16} className="mb-6">
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Input
                placeholder="Tìm kiếm theo tên hoặc tài khoản"
                value={timKiem}
                onChange={(e) => setTimKiem(e.target.value)}
                prefix={<SearchOutlined className="text-gray-400" />}
                className="w-full"
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Select
                className="w-full"
                placeholder="Lọc theo trạng thái"
                allowClear
                onChange={(value) => setTrangThai(value)}
                suffixIcon={<FilterOutlined className="text-gray-400" />}
              >
                <Option value="Đã Xét Duyệt">Đã Xét Duyệt</Option>
                <Option value="Chưa Xét Duyệt">Chưa Xét Duyệt</Option>
              </Select>
            </Col>
            <Col xs={24} sm={24} md={24} lg={8} xl={8} className="flex justify-end">
              <Space>
                {cacDongDaChon.length > 0 && (
                  <Popconfirm
                    title={`Bạn có chắc chắn muốn kích hoạt ${cacDongDaChon.length} người dùng đã chọn?`}
                    onConfirm={xuLykichhoat}
                    okText="Đồng ý"
                    cancelText="Hủy"
                  >
                    <Button type="primary" danger icon={<DeleteOutlined />}>
                      Kích Hoạt {cacDongDaChon.length} mục
                    </Button>
                  </Popconfirm>
                )}
                <Button
                  type="primary"
                  icon={<UserAddOutlined />}
                  onClick={() => hienThiModal()}
                  className="bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600"
                >
                  Thêm người dùng
                </Button>
              </Space>
            </Col>
          </Row>
          <Divider className="my-6" />
          <Table
            rowSelection={luaChonDong}
            columns={cotBang}
            dataSource={duLieuLoc}
            rowKey="taiKhoan"
            scroll={{ x: 768 }}
            className="shadow-sm rounded-md overflow-hidden"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} mục`,
            }}
          />
        </div>
      </Card>
      <ReusableModal
        visible={hienModal}
        onOk={xuLyDongY}
        onCancel={() => setHienModal(false)}
        keyDangSua={keyDangSua}
        add_Titel="Thêm mới người dùng"
        update_Titel="Chỉnh sửa người dùng"
      >
        <FormNguoiDung form={formdulieu} />
      </ReusableModal>
    </>
  );
};

export default QuanLyNguoiDung;
