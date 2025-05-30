import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Button,
  Popconfirm,
  Row,
  Col,
  Input,
  Space,
  Typography,
  Divider,
  message,
  Upload,
  Form,Select
} from "antd";
import {
  DeleteOutlined,
  SearchOutlined,
  PlusOutlined,
  UploadOutlined,
  DownloadOutlined,FilterOutlined
} from "@ant-design/icons";
import ReusableModal from "../../../components/UI/Modal";
import { SinhVienForm } from "../../../components/QLDoAnComponent/QLSinhVien/form";
import { COLUMS } from "../../../components/QLDoAnComponent/QLSinhVien/table";
import { Lop, SinhVien } from "../../../components/InterFace";
import * as XLSX from "xlsx";
import {
  getall_SinhVien,
  addSinhVien,
  delSinhVien,
  editSinhVien,Search
} from "../../../sevices/Api/QL_DoAn/QL_SinhVien-servives";
import {getAll} from '../../../sevices/Api/QL_DoAn/QL_Lop-servives'
import moment from "moment";

const { Title } = Typography;
const { Option } = Select;
export default function QuanLySinhVien() {
  const [sinhVien, setsinhVien] = useState<SinhVien[]>([]);
  const [form] = Form.useForm();
  const [hienModal, setHienModal] = useState(false);
  const [keyDangSua, setKeyDangSua] = useState<string | null>(null);
  const [cacDongDaChon, setCacDongDaChon] = useState<React.Key[]>([]);
  const [timKiem, setTimKiem] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [Lop,Setlop]=useState<Lop[]>([]);
  const [selectedLop,setSelectedLop]=useState<string>("");

  useEffect(() => {
    document.title = "Quản lý sinh viên";
    getall_SinhVienSinhVien();
  }, []);

  const getall_SinhVienSinhVien = async () => {
    try {
      const data = await getall_SinhVien();
      setsinhVien(data);
      const lop=await getAll();
      Setlop(lop);
    } catch {
      message.error("Lỗi Sever!");
    } finally {
      setLoading(false);
    }
  };

  const dongModal = () => {
    setHienModal(false);
    setIsEditing(false);
  };
  const hienThiModal = (banGhi?: SinhVien) => {
    form.resetFields();
    if (banGhi) {
      setIsEditing(true);
      const ngaySinhValue = banGhi.ngaySinh ? moment(banGhi.ngaySinh) : null;
      form.setFieldsValue({ ...banGhi, ngaySinh: ngaySinhValue });
      setKeyDangSua(banGhi.maSinhVien);
    } else {
      setKeyDangSua(null);
    }
    setHienModal(true);
  };

  const xuLyDongY = async () => {
    try {
      const giatri = await form.validateFields();
      if (keyDangSua !== null) {
        await editSinhVien(giatri, getall_SinhVienSinhVien);
      } else {
        await addSinhVien(giatri, getall_SinhVienSinhVien);
      }
      setHienModal(false);
      form.resetFields();
      setKeyDangSua(null);
    } catch (error) {
      message.error("Có lỗi xảy ra! Vui lòng thử lại.");
    }
  };

  const xuLyXoa = async (maSinhVien: string) => {
    await delSinhVien(maSinhVien, getall_SinhVienSinhVien);
  };
  const cotBang = COLUMS(hienThiModal, xuLyXoa);

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
    message.success(`Xóa thành công!`);
  };

  const xuLyNhapExcel = async (file: File) => {
    const reader = new FileReader();
    reader.onload =async (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet) as SinhVien[];

      const duLieuMoi = jsonData.map((item) => ({ ...item }));

      await Promise.all(
        duLieuMoi.map((sv) => addSinhVien(sv, getall_SinhVien))
      );
    };
    reader.readAsArrayBuffer(file);
    return false;
  };
  const xuLyXuatExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(sinhVien);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách sinh viên");
    XLSX.writeFile(workbook, "danh_sach_sinhvien.xlsx");
    message.success("Xuất Excel thành công!");
  };

 const Search_Name = async (e:any) => {
  let name = e.target.value;
  const data = await Search(undefined, name, undefined);
  setsinhVien(data);
  setTimKiem(name);
}
  const handleLopChange =async (value: string) => {
      const data = await Search(undefined, undefined, value);
        setsinhVien(data);
        setSelectedLop(value);
    };
  return (
    <div  >
      <Card className="shadow rounded-lg overflow-hidden"  style={{ height: "91vh" }}>
        <div className="p-6">
          <Title
            level={2}
            className="text-center custom-blue mb-8"
            style={{ color: "#1e88e5", fontSize: "25px", fontWeight: "bold" }}
          >
            QUẢN LÝ SINH VIÊN
          </Title>
          <hr />
          <Row gutter={16} className="mb-6">
             {/* Khu vực tìm kiếm */}
             <Col xs={10} sm={10} md={6} lg={4} xl={4}>
              <Input
                placeholder="Tìm kiếm theo tên sinh viên"
                value={timKiem}
                onChange={(e) => Search_Name(e)}
                prefix={<SearchOutlined className="text-gray-400" />}
                className="w-full"
              />
            </Col>
            <Col xs={24} sm={12} md={6} lg={6} xl={6}>
              <Select
                value={selectedLop}
                onChange={handleLopChange}
                style={{ width: "100%" }}
                loading={loading}
                placeholder="Chọn bộ môn"
                suffixIcon={<FilterOutlined />}
              >
                {Lop?.length > 0 ? (
                  Lop.map((item) => (
                    <Option key={item.maLop} value={item.maLop}>
                      {item.tenLop}
                    </Option>
                  ))
                ) : (
                  <Option disabled>Không có dữ liệu</Option>
                )}
              </Select>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={8}
              lg={6}
              xl={6}
              className="flex justify-end"
            >
              <Space>
                {cacDongDaChon.length > 0 && (
                  <Popconfirm
                    title={`Bạn có chắc chắn muốn xóa ${cacDongDaChon.length} sinh viên đã chọn?`}
                    onConfirm={xuLyXoaNhieu}
                    okText="Đồng ý"
                    cancelText="Hủy"
                  >
                    <Button type="primary" danger icon={<DeleteOutlined />}>
                      Xóa {cacDongDaChon.length} mục
                    </Button>
                  </Popconfirm>
                )}
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => hienThiModal()}
                  className="bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600"
                >
                  Thêm Sinh Viên
                </Button>
                <Upload
                  accept=".xlsx,.xls"
                  showUploadList={false}
                  beforeUpload={xuLyNhapExcel}
                >
                  <Button icon={<DownloadOutlined />}>Nhập Excel</Button>
                </Upload>
                <Button icon={<UploadOutlined />} onClick={xuLyXuatExcel}>
                  Xuất Excel
                </Button>
              </Space>
            </Col>
          </Row>
          <Divider className="my-6" />
          <Table
            rowSelection={luaChonDong}
            columns={cotBang}
            dataSource={sinhVien}
            loading={loading}
            rowKey="maSinhVien"
            scroll={{ x: 768 , y:400 }}
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
        add_Titel="Thêm Sinh Viên Mới"
        update_Titel="Chỉnh sửa Sinh Viên"
      >
        <SinhVienForm formdulieu={form} isEditing={isEditing} />
      </ReusableModal>
    </div>
  );
}
