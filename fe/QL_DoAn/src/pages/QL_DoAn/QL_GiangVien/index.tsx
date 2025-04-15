import React, { useEffect, useState, useCallback } from "react";
import {
  Card,
  Table,
  Button,
  Popconfirm,
  Row,
  Col,
  Input,
  Typography,
  Divider,
  message,
  Upload,
  Form,
  Select,
} from "antd";
import {
  DeleteOutlined,
  SearchOutlined,
  PlusOutlined,
  UploadOutlined,
  DownloadOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import ReusableModal from "../../../components/UI/Modal";
import { FormGiangVien } from "../../../components/QLDoAnComponent/QLGiangVien/form";
import { COLUMS } from "../../../components/QLDoAnComponent/QLGiangVien/table";
import { GiangVien, BoMon, ChucVu } from "../../../components/InterFace";
import * as XLSX from "xlsx";
import {
  getAll,
  editGiangVien,
  addGiangVien,
  delGiangVien,
  Search,
} from "../../../sevices/Api/QL_DoAn/QL_GiangVien-servives";
import { getAll_BoMon } from "../../../sevices/Api/QL_DanhMuc/QL_BoMon-servives";
import { getAll_ChucVu } from "../../../sevices/Api/QL_DanhMuc/QL_ChucVu-sevives";

import moment from "moment";

const { Title } = Typography;
const { Option } = Select;

export default function QuanLygiangvien() {
  const [giangVien, setGiangVien] = useState<GiangVien[]>([]);
  const [form] = Form.useForm();
  const [hienModal, setHienModal] = useState(false);
  const [keyDangSua, setKeyDangSua] = useState<string | null>(null);
  const [cacDongDaChon, setCacDongDaChon] = useState<React.Key[]>([]);
  const [timKiem, setTimKiem] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedBoMon, setSelectedBoMon] = useState<string>("");
  const [selectedChucVu, setSelectedChucVu] = useState<string>("");
  const [ListBoMon, setListBoMon] = useState<BoMon[]>([]);
  const [ListChucVu, setListChucVu] = useState<ChucVu[]>([]);

  useEffect(() => {
    document.title = "Quản lý cán bộ, giảng viên";
    getAllGiangVien();
    GetDaTa();
  }, []);

  const SEARCH = async () => {
    try {
      setLoading(true);
      const data = await Search(timKiem, selectedBoMon, selectedChucVu);
      setGiangVien(data);
      message.success("Tìm kiếm thành công!");
    } catch (error) {
      message.error("Lỗi khi tìm kiếm, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  const GetDaTa = async () => {
    const [listBM, listCV] = await Promise.all([
      getAll_BoMon(),
      getAll_ChucVu(),
    ]);
    setListBoMon(listBM);
    setListChucVu(listCV);
  };

  const getAllGiangVien = async () => {
    try {
      const data = await getAll();
      setGiangVien(data);
    } catch {
      message.error("Lỗi Sever!");
    } finally {
      setLoading(false);
    }
  };

  const xuLyXoa = async (maGiangVien: string) => {
    await delGiangVien(maGiangVien, getAllGiangVien);
  };

  const dongModal = () => {
    setHienModal(false);
    setIsEditing(false);
  };

  const hienThiModal = useCallback(
    (banGhi?: GiangVien) => {
      debugger;
      form.resetFields();
      if (banGhi) {
        setIsEditing(true);
        const ngaySinhValue = banGhi.ngaySinh ? moment(banGhi.ngaySinh) : null;
        form.setFieldsValue({ ...banGhi, ngaySinh: ngaySinhValue });
        setKeyDangSua(banGhi.maGiangVien);
      } else {
        setKeyDangSua(null);
      }
      setHienModal(true);
    },
    [form]
  );

  const xuLyDongY = async () => {
    const giatri = await form.validateFields();
    if (keyDangSua !== null) {
      await editGiangVien(giatri, getAllGiangVien);
    } else {
      await addGiangVien(giatri, getAllGiangVien);
    }
    setHienModal(false);
    form.resetFields();
    setKeyDangSua(null);
  };

  const cotBang = COLUMS(hienThiModal, xuLyXoa);

  const xuLyNhapExcel = async (file: File) => {
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet) as GiangVien[];

        const duLieuMoi = jsonData.map((item) => ({ ...item }));

        await Promise.all(
          duLieuMoi.map((giangVien) => addGiangVien(giangVien, getAllGiangVien))
        );
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error("Lỗi khi xử lý file Excel:", error);
    }
    return false;
  };

  const chonDong = (cacKeyChon: React.Key[]) => {
    setCacDongDaChon(cacKeyChon);
  };

  const luaChonDong = {
    selectedRowKeys: cacDongDaChon,
    onChange: chonDong,
  };

  const xuLyXoaNhieu = async () => {
    for (let i = 0; i < cacDongDaChon.length; i++) {
      await xuLyXoa(cacDongDaChon[i].toString());
    }
    setCacDongDaChon([]);
  };
  const handleBoMonChange = async (value: string) => {
    const data = await Search(undefined, value, undefined);
    setGiangVien(data);
    setSelectedBoMon(value);
  };

  const Search_Name = async (e: any) => {
    let name = e.target.value;
    const data = await Search(name, undefined, undefined);
    setGiangVien(data);
    setTimKiem(name);
  };
  const xuLyXuatExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(giangVien);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách giảng viên");
    XLSX.writeFile(workbook, "danh_sach_giang_vien.xlsx");
    message.success("Xuất Excel thành công!");
  };

  return (
    <div>
      <Card
        className="shadow rounded-lg overflow-hidden"
        style={{ height: "91vh" }}
      >
        <div className="p-6">
          <Title
            level={2}
            className="text-center custom-blue mb-8"
            style={{ color: "#1e88e5", fontSize: "25px", fontWeight: "bold" }}
          >
            QUẢN LÝ CÁN BỘ, GIẢNG VIÊN
          </Title>
          <hr />
          <Row gutter={[16, 16]} align="middle">
            <Col>
              <Input
                placeholder="Tìm kiếm theo tên giảng viên"
                value={timKiem}
                onChange={(e) => Search_Name(e)}
                prefix={<SearchOutlined className="text-gray-400" />}
                className="w-full rounded-md"
              />
            </Col>
            <Col>
              <Select
                value={selectedBoMon}
                onChange={handleBoMonChange}
                loading={loading}
                placeholder="Chọn bộ môn"
                suffixIcon={<FilterOutlined />}
                style={{width:"180px"}}
              >
                {ListBoMon?.length > 0 ? (
                  ListBoMon.map((item) => (
                    <Option key={item.maBoMon} value={item.maBoMon}>
                      {item.tenBoMon}
                    </Option>
                  ))
                ) : (
                  <Option disabled>Không có dữ liệu</Option>
                )}
              </Select>
            </Col>
            <Col>
              <Button
                type="primary"
                icon={<SearchOutlined />}
                onClick={SEARCH}
                className="w-full bg-blue-500 hover:bg-blue-600 rounded-md"
              >
                Tìm kiếm
              </Button>
            </Col>
            <Col>
              {cacDongDaChon.length > 0 && (
                <Popconfirm
                  title={`Bạn có chắc chắn muốn xóa ${cacDongDaChon.length} giảng viên đã chọn?`}
                  onConfirm={xuLyXoaNhieu}
                  okText="Đồng ý"
                  cancelText="Hủy"
                >
                  <Button
                    type="primary"
                    danger
                    icon={<DeleteOutlined />}
                    className="w-full bg-red-500 hover:bg-red-600 rounded-md"
                  >
                    Xóa {cacDongDaChon.length}
                  </Button>
                </Popconfirm>
              )}
            </Col>
            <Col>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => hienThiModal()}
                className="w-full bg-green-500 hover:bg-green-600 rounded-md"
              >
                Thêm
              </Button>
            </Col>
            <Col>
              <Upload
                accept=".xlsx,.xls"
                showUploadList={false}
                beforeUpload={xuLyNhapExcel}
              >
                <Button
                  icon={<DownloadOutlined />}
                  className="w-full rounded-md"
                >
                  Nhập Excel
                </Button>
              </Upload>
            </Col>
            <Col>
              <Button
                icon={<UploadOutlined />}
                onClick={xuLyXuatExcel}
                className="w-full rounded-md"
              >
                Xuất Excel
              </Button>
            </Col>
          </Row>

          <Divider className="my-6" />
          <Table
            rowSelection={luaChonDong}
            columns={cotBang}
            loading={loading}
            dataSource={giangVien}
            rowKey="maGiangVien"
            scroll={{ x: 768, y: 400 }}
            className="shadow-sm rounded-md overflow-hidden"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} của ${total} mục`,
            }}
          />
        </div>
      </Card>
      <ReusableModal
        visible={hienModal}
        onOk={xuLyDongY}
        onCancel={dongModal}
        keyDangSua={keyDangSua}
        add_Titel="Thêm cán bộ, giảng viên"
        update_Titel="Sửa cán bộ, giảng viên "
      >
        <FormGiangVien formdulieu={form} isEditing={isEditing} />
      </ReusableModal>
    </div>
  );
}
