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
} from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import ReusableModal from "../../../components/UI/Modal";
import { Form_DeXuatDeTai_SV } from "../../../components/QLDoAnComponent/DangKyDeTai_SV/FormDeXuatDeTai";
import { useState, useEffect } from "react";
import { mockDeTaiData } from "../../../components/QLDoAnComponent/DangKyDeTai_SV/mockdata";
import { COLUMS } from "../../../components/QLDoAnComponent/DangKyDeTai_SV/Table_DangKyDeTai";
import {DeXuatDeTai,DangKyDeTai_SV,Get_MaDot_TK,get_detai_madot_sv} from '../../../sevices/Api/QL_DoAn/QL_DeTaiDoAn/QL_DeTai'
import { getGiangVien_maDot } from "../../../sevices/Api/QL_DoAn/QL_DotLamDoAn/GiangVien_Dot-servives";

const { Title } = Typography;
interface GiangVien {
  maGiangVien: string;
  tenGiangVien: string;
  soLuongHuongDan: number;
  soLuongDangHuongDan: number;
}
interface DeTai_SinhVien{
        maDeTai:string,
        tenDeTai:string,
        maGiangVien:string,
        tenGiangVien:string,
        email:string,
        sDT:string,
        moTa:string,
        huongdan:string
}
export default function DangKyDeTai() {
  var taiKhoan = localStorage.getItem("taiKhoan") || "";

  const [form] = Form.useForm();
  const [hienModal, setHienModal] = useState(false);
  const [keyDangSua, setKeyDangSua] = useState(null);
  const [timKiem, setTimKiem] = useState("");
  const [loading, setLoading] = useState(true);
  const [duLieuLoc, setDuLieuLoc] = useState(mockDeTaiData);
  const [maDot, setMaDot] = useState<string>("");
  const [giangVienInDot, setGiangVienInDot] = useState<GiangVien[]>([]);
  const [DeTaDoAn,setDeTaiDoAn]=useState<DeTai_SinhVien[]>([]);

  useEffect(() => {
    document.title = 'Đăng ký đề tài';
    getall_data();
  },[]);


  const getall_data = async () => {
    try {
      setLoading(true);
      const DotLamDoAn = await Get_MaDot_TK();
      setMaDot(DotLamDoAn.maDot || "");
      const DeTai=await get_detai_madot_sv(DotLamDoAn.maDot);
      setDeTaiDoAn(DeTai);
      const ListGiangVien = await getGiangVien_maDot(DotLamDoAn.maDot);
      setGiangVienInDot(ListGiangVien);
     
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Không thể tải dữ liệu. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };
  

  const hienThiModal =async () => {
    getall_data();
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
      maSinhVien: taiKhoan,
      trangThai: 0,
      nguoiDeXuat: taiKhoan,
      moTa: giatri.moTa
    };
    await DeXuatDeTai( data_DeTai, getall_data);
    setHienModal(false);
    form.resetFields();
    setKeyDangSua(null);
  };

  const xuLyDangKy =async (banghi:DeTai_SinhVien) => {
    await DangKyDeTai_SV(banghi.maDeTai,taiKhoan,getall_data);
  };

  const handleSearch = (value: string) => {
    const filteredData = mockDeTaiData.filter(
      (item) =>
        item.TenDeTai.toLowerCase().includes(value.toLowerCase()) ||
        item.tenGiangVien.toLowerCase().includes(value.toLowerCase())
    );
    setDuLieuLoc(filteredData);
  };

  return maDot ? (
    <div className="bg-gray-100 min-h-screen p-6">
      <Card className="shadow rounded-lg overflow-hidden">
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
            <Col xs={24} sm={24} md={16} lg={18} xl={18}>
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
            <Col
              xs={24}
              sm={24}
              md={8}
              lg={6}
              xl={6}
              className="flex justify-end"
            >
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
          <Table
            columns={COLUMS(xuLyDangKy)}
            dataSource={DeTaDoAn}
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
        <Form_DeXuatDeTai_SV formdulieu={form} giangVienInDot={giangVienInDot || ""} />
      </ReusableModal>
    </div>
  ) : (
    <div>
      <h1>Bạn không thuộc đợt làm đồ án nào</h1>
    </div>
  );
}
