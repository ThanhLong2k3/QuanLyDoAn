import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Card, Table, Button, Popconfirm, Row, Col, Input, Select, Space, Typography, Divider, Form, message } from "antd";
import { NguoiDung, NhomQuyen } from "../../../components/InterFace";
import ReusableModal from "../../../components/UI/Modal";
import { FormNguoiDung } from "../../../components/QLHeThongComponent/QL_NguoiDung/QL_NguoiDungForm";
import { CoLumNguoiDung } from "../../../components/QLHeThongComponent/QL_NguoiDung/TableNguoiDung";
import { DeleteOutlined, SearchOutlined, UserAddOutlined, FilterOutlined } from "@ant-design/icons";
import ModalQuyen from "../../../components/QLHeThongComponent/QL_NguoiDung/modalNhomQuyen";
import { getNhomQuyen_TaiKhoan, getAll_Quyen,delNguoiDung_NhomQuyen } from "../../../sevices/Api/QL_HeThong/QL_NhomQuyen";
import { getAll_NguoiDung, addNguoiDung, editNguoiDung, addNguoiDung_NhomQuyen } from "../../../sevices/Api/QL_HeThong/QL_NguoiDung";

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
  const [modalQuyen, setHienModalQuyen] = useState(false);
  const [quyen, setQuyen] = useState<NhomQuyen[]>([]);
  const [selectedQuyen, setSelectedQuyen] = useState<NhomQuyen[]>([]);
  const [taikhoanon, setTaiKhoan_ON] = useState("");

  useEffect(() => {
    document.title = "Quản lý người dùng";
    getllNguoiDung();
  }, []);

  const getllNguoiDung = useCallback(async () => {
    try {
      const data = await getAll_NguoiDung();
      setNguoiDung(data);
    } catch (error) {
      message.error("Không thể tải danh sách người dùng");
    }
  }, []);

  const hienThiModal = useCallback((banGhi?: NguoiDung) => {
    formdulieu.resetFields();
    if (banGhi) {
      const ngaySinhValue = banGhi.ngaySinh ? moment(banGhi.ngaySinh) : null;
      formdulieu.setFieldsValue({ ...banGhi, ngaySinh: ngaySinhValue });
      setKeyDangSua(banGhi.taiKhoan);
    } else {
      setKeyDangSua(null);
    }
    setHienModal(true);
  }, [formdulieu]);

  const duLieuLoc = useMemo(() => {
    return nguoiDung.filter(
      (nguoi) =>
        (nguoi.hoTen.toLowerCase().includes(timKiem.toLowerCase()) ||
          nguoi.trangThai.toLowerCase().includes(timKiem.toLowerCase())) &&
        (trangThai === null || nguoi.trangThai === trangThai)
    );
  }, [nguoiDung, timKiem, trangThai]);

  const xuLyDongY = useCallback(async () => {
    try {
      const giatri = await formdulieu.validateFields();
      if (keyDangSua !== null) {
        await editNguoiDung(giatri, getllNguoiDung);
        message.success(`Tài khoản ${giatri.taiKhoan} đã được sửa thành công!`);
      } else {
        await addNguoiDung(giatri, getllNguoiDung);
      }
      setHienModal(false);
      formdulieu.resetFields();
      setKeyDangSua(null);
    } catch (error) {
      message.error("Có lỗi xảy ra khi xử lý dữ liệu");
    }
  }, [formdulieu, keyDangSua, getllNguoiDung]);

  const xuLykichhoat = useCallback(async () => {
    try {
      let a = cacDongDaChon.length;
      for (const taiKhoan of cacDongDaChon) {
        const banGhi = nguoiDung.find(user => user.taiKhoan === taiKhoan);
        if (banGhi) {
          const newStatus = "Đã xét duyệt";
          await editNguoiDung({ ...banGhi, trangThai: newStatus }, getllNguoiDung);
        }
      }
      message.success(`${a} tài khoản đã được "xét duyệt"!`);
    } catch (error) {
      message.error("Có lỗi xảy ra khi kích hoạt tài khoản");
    }
  }, [cacDongDaChon, nguoiDung, getllNguoiDung]);

  const kichHoat = useCallback(async (banGhi: NguoiDung) => {
    try {
      const newStatus = banGhi.trangThai === "Chưa xét duyệt" ? "Đã xét duyệt" : "Chưa xét duyệt";
      await editNguoiDung({ ...banGhi, trangThai: newStatus }, getllNguoiDung);
      message.success(`Tài khoản ${banGhi.taiKhoan} đã được ${newStatus === "Đã xét duyệt" ? "kích hoạt" : "hủy kích hoạt"} thành công!`);
    } catch (error) {
      message.error("Có lỗi xảy ra khi thay đổi trạng thái tài khoản");
    }
  }, [getllNguoiDung]);

  const khoiPhucMatKhau = useCallback(async (banGhi: NguoiDung) => {
    try {
      const mk = "123456";
      await editNguoiDung({ ...banGhi, matKhau: mk }, getllNguoiDung);
      message.success(`Mật khẩu của tài khoản ${banGhi.taiKhoan} đã được khôi phục thành công!`);
    } catch (error) {
      message.error("Có lỗi xảy ra khi khôi phục mật khẩu");
    }
  }, [getllNguoiDung]);

  const ShowQuyen = useCallback(async (taiKhoanON: string) => {
    try {
      setTaiKhoan_ON(taiKhoanON);
      const NhomQuyen_TaiKhoan = await getNhomQuyen_TaiKhoan(taiKhoanON);
      setSelectedQuyen(NhomQuyen_TaiKhoan);
      const allQuyen = await getAll_Quyen();
      setQuyen(allQuyen);
      setHienModalQuyen(true);
    } catch (error) {
      message.error("Có lỗi xảy ra khi tải thông tin quyền");
    }
  }, []);

  const cotBang = useMemo(() => CoLumNguoiDung(hienThiModal, kichHoat, khoiPhucMatKhau, ShowQuyen), [hienThiModal, kichHoat, khoiPhucMatKhau, ShowQuyen]);

  const chonDong = useCallback((cacKeyChon: React.Key[]) => {
    setCacDongDaChon(cacKeyChon);
  }, []);

  const luaChonDong = useMemo(() => ({
    selectedRowKeys: cacDongDaChon,
    onChange: chonDong,
  }), [cacDongDaChon, chonDong]);

  const handleAddQuyen = useCallback((quyen: NhomQuyen) => {
    setSelectedQuyen((prev) => [...prev, quyen]);
  }, []);

  const handleRemoveQuyen = useCallback(async(maNhomQuyen: string) => {
    setSelectedQuyen((prev) =>
      prev.filter((quyen) => quyen.maNhomQuyen !== maNhomQuyen)
    );
    const giatri={
       taiKhoan: taikhoanon,
        maNhomQuyen: maNhomQuyen
    }
    await delNguoiDung_NhomQuyen(giatri);
  }, []);

  const themQuyen = useCallback(async () => {
    try {
      setHienModalQuyen(false);
      const existingQuyen = await getNhomQuyen_TaiKhoan(taikhoanon);
      for (let i = 0; i < selectedQuyen.length; i++) {
        const giatri = {
          taiKhoan: taikhoanon,
          maNhomQuyen: selectedQuyen[i].maNhomQuyen
        };
        const isExisting = existingQuyen.some(
          (existingQuyen: NhomQuyen) => existingQuyen.maNhomQuyen === giatri.maNhomQuyen
        );

        if (!isExisting) {
          await addNguoiDung_NhomQuyen(giatri);
        }
      }
      message.success("Phân quyền thành công!");
      setTaiKhoan_ON("");
    } catch (error) {
      message.error("Có lỗi xảy ra khi phân quyền");
    }
  }, [taikhoanon, selectedQuyen]);

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
            rowKey={(record) => record.taiKhoan}
            scroll={{ x: 768 }}
            className="shadow-sm rounded-md overflow-hidden"
            pagination={{
              pageSize: 10,
              showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} mục`,
            }}
          />
        </div>
      </Card>
      <ModalQuyen
        hienmodalphanquyen={modalQuyen}
        setHienModal={setHienModalQuyen}
        NhomQuyen={quyen}
        selectedQuyen={selectedQuyen}
        handleAddQuyen={handleAddQuyen}
        handleRemoveQuyen={handleRemoveQuyen}
        themQuyen={themQuyen}
      />
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

