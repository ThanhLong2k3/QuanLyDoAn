import {
  Card,
  Table,
  Button,
  Row,
  Col,
  Input,
  Space,
  Typography,
  Divider,
  Form,
  message,
  Select,
} from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import ReusableModal from "../../../components/UI/Modal";
import { Form_DeXuatDeTai_SV } from "../../../components/QLDoAnComponent/DangKyDeTai_SV/FormDeXuatDeTai";
import { useState, useEffect } from "react";
import { COLUMS } from "../../../components/QLDoAnComponent/DangKyDeTai_SV/Table_DangKyDeTai";
import { DeXuatDeTai, Get_MaDot_TK, get_detai_madot_sv } from '../../../sevices/Api/QL_DoAn/QL_DeTaiDoAn/QL_DeTai';
import { getGiangVien_maDot } from "../../../sevices/Api/QL_DoAn/QL_DotLamDoAn/GiangVien_Dot-servives";
import { get_GROUP_ID } from "../../../sevices/Api/QL_DoAn/QL_NhomSinhVien";

const { Title } = Typography;
const { Option } = Select;

interface GiangVien {
  maGiangVien: string;
  tenGiangVien: string;
  soLuongHuongDan: number;
  soLuongDangHuongDan: number;
}

interface DeTai_SinhVien {
  maDeTai: string;
  tenDeTai: string;
  maGiangVien: string;
  tenGiangVien: string;
  email: string;
  sDT: string;
  moTa: string;
  huongdan: string;
  maDot?: string; // Thêm trường maDot để hiển thị trong Table
}

export default function DangKyDeTai() {
  var taiKhoan = localStorage.getItem("taiKhoan") || "";

  const [form] = Form.useForm();
  const [hienModal, setHienModal] = useState(false);
  const [keyDangSua, setKeyDangSua] = useState(null);
  const [timKiem, setTimKiem] = useState("");
  const [loading, setLoading] = useState(true);
  const [duLieuLoc, setDuLieuLoc] = useState<DeTai_SinhVien[]>([]); // Sử dụng DeTai_SinhVien thay vì mockDeTaiData
  const [maDot, setMaDot] = useState<string>("");
  const [danhSachDot, setDanhSachDot] = useState<any[]>([]);
  const [giangVienInDot, setGiangVienInDot] = useState<GiangVien[]>([]);
  const [deTaiDoAn, setDeTaiDoAn] = useState<DeTai_SinhVien[]>([]);
  const [listGroup, setListGroup] = useState<any[]>([]);

  useEffect(() => {
    document.title = 'Đăng ký đề tài';
    fetchDanhSachDot();
    getGroupByIDStudent();
  }, []);

  const fetchDanhSachDot = async () => {
    try {
      setLoading(true);
      const DotLamDoAn = await Get_MaDot_TK();
      setDanhSachDot(DotLamDoAn);
      if (DotLamDoAn.length > 0) {
        setMaDot(DotLamDoAn[0].maDot); // Chọn mã đợt đầu tiên làm mặc định
        getall_data(DotLamDoAn[0].maDot); // Tải dữ liệu cho mã đợt mặc định
      }
    } catch (error) {
      console.error("Error fetching danh sach dot:", error);
      message.error("Không thể tải danh sách đợt. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const getall_data = async (selectedMaDot: string) => {
    try {
      setLoading(true);
      const DeTai = await get_detai_madot_sv(selectedMaDot);
      const DeTaiWithMaDot = DeTai.map((deTai: DeTai_SinhVien) => ({
        ...deTai,
        maDot: selectedMaDot,
      }));
      setDeTaiDoAn(DeTaiWithMaDot);
      setDuLieuLoc(DeTaiWithMaDot); // Khởi tạo duLieuLoc với dữ liệu ban đầu
      const ListGiangVien = await getGiangVien_maDot(selectedMaDot);
      setGiangVienInDot(ListGiangVien);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Không thể tải dữ liệu. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const getall_data_all = async () => {
    try {
      setLoading(true);
      const DotLamDoAn = await Get_MaDot_TK();
      let allDeTai: DeTai_SinhVien[] = [];
      let allGiangVien: GiangVien[] = [];

      for (const dot of DotLamDoAn) {
        const DeTai = await get_detai_madot_sv(dot.maDot);
        const DeTaiWithMaDot = DeTai.map((deTai: DeTai_SinhVien) => ({
          ...deTai,
          maDot: dot.maDot,
        }));
        const ListGiangVien = await getGiangVien_maDot(dot.maDot);
        allDeTai = [...allDeTai, ...DeTaiWithMaDot];
        allGiangVien = [...allGiangVien, ...ListGiangVien];
      }

      setDeTaiDoAn(allDeTai);
      setDuLieuLoc(allDeTai); // Khởi tạo duLieuLoc với dữ liệu ban đầu
      setGiangVienInDot(allGiangVien);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Không thể tải dữ liệu. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const getGroupByIDStudent = async () => {
    setLoading(true);
    try {
      const data = await get_GROUP_ID(1);
      setListGroup(data || []);
    } catch (error) {
      console.error("Error fetching groups:", error);
      message.error("Không thể tải danh sách nhóm");
    } finally {
      setLoading(false);
    }
  };

  const hienThiModal = async () => {
    if (maDot === "all") {
      getall_data_all();
    } else {
      getall_data(maDot);
    }
    setHienModal(true);
  };

  const xuLyDongY = async () => {
    const giatri = await form.validateFields();
    const data_DeTai = {
      maDeTai: 'A',
      tenDeTai: giatri.tenDeTai,
      maDot: maDot,
      hinhThucBaoCaoBaoVe: giatri.hinhThucBaoCaoBaoVe,
      maGiangVien: giatri.maGiangVien,
      maNhom: giatri.maNhom,
      trangThai: 0,
      nguoiDeXuat: taiKhoan,
      moTa: giatri.moTa
    };
    await DeXuatDeTai(data_DeTai, maDot === "all" ? getall_data_all : () => getall_data(maDot));
    setHienModal(false);
    form.resetFields();
    setKeyDangSua(null);
    getGroupByIDStudent();
  };

  const handleChangeDot = (value: string) => {
    setMaDot(value);
    if (value === "all") {
      getall_data_all();
    } else {
      getall_data(value);
    }
  };

  const handleSearch = (value: string) => {
    const filteredData: DeTai_SinhVien[] = deTaiDoAn.filter(
      (item) =>
        item.tenDeTai.toLowerCase().includes(value.toLowerCase()) ||
        item.tenGiangVien.toLowerCase().includes(value.toLowerCase())
    );
    setDuLieuLoc(filteredData);
  };

  return danhSachDot.length > 0 ? (
    <div>
      <Card className="shadow rounded-lg overflow-hidden" style={{ height: '90vh' }}>
        <div className="p-6">
          <Title
            level={2}
            className="text-center mb-8"
            style={{ color: "#1e88e5", fontSize: "25px", fontWeight: "bold" }}
          >
            ĐĂNG KÝ ĐỀ TÀI
          </Title>
          <Divider />
          <Row gutter={16} className="mb-6">
            <Col xs={10} sm={24} md={8} lg={4} xl={6}>
              <Select
                value={maDot}
                onChange={handleChangeDot}
                placeholder="Chọn đợt"
                className="w-full"
                style={{width:'100%'}}
              >
                <Option key="all" value="all">
                  Tất cả đợt
                </Option>
                {danhSachDot.map((dot) => (
                  <Option key={dot.maDot} value={dot.maDot}>
                    {dot.tenDot || dot.maDot}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col xs={16} sm={16} md={12} lg={12} xl={12}>
              <Input
                placeholder="Tìm kiếm theo tên đề tài hoặc tên giảng viên"
                value={timKiem}
                onChange={(e) => {
                  setTimKiem(e.target.value);
                  handleSearch(e.target.value);
                }}
                prefix={<SearchOutlined className="text-gray-400" />}
                className="w-full"
              />
            </Col>
            <Col xs={24} sm={24} md={8} lg={6} xl={6} className="flex justify-end">
              <Space>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={hienThiModal}
                  className="bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600"
                >
                  Đề xuất đề tài
                </Button>
              </Space>
            </Col>
          </Row>
          <Divider />
          <Table
            columns={COLUMS()}
            dataSource={timKiem ? duLieuLoc : deTaiDoAn}
            rowKey="maDeTai"
            scroll={{ x: 768 }}
            loading={loading}
            className="shadow-sm rounded-md overflow-hidden"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} của ${total} mục`,
            }}
          />
        </div>
      </Card>
      <ReusableModal
        visible={hienModal}
        onOk={xuLyDongY}
        onCancel={() => setHienModal(false)}
        keyDangSua={keyDangSua}
        add_Titel="Đề xuất đề tài"
        update_Titel="Chỉnh sửa đề tài"
      >
        <Form_DeXuatDeTai_SV formdulieu={form} giangVienInDot={giangVienInDot || []} listGroup={listGroup} />
      </ReusableModal>
    </div>
  ) : (
    <div>
      <h1>Bạn không thuộc đợt Nghiên cứu Khoa Học nào</h1>
    </div>
  );
}