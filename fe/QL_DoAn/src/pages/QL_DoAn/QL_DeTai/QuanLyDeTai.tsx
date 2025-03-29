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
  import { Form_QL_DeTai } from "../../../components/QLDoAnComponent/QL_DeTai/Form_DeTai";
  import { useState, useEffect, useCallback } from "react";
  import { mockDeTaiData } from "../../../components/QLDoAnComponent/DangKyDeTai_SV/mockdata";
  import { COLUMSDETAI } from "../../../components/QLDoAnComponent/QL_DeTai/QL_DeTai_Table";
  import { DotLamDoAn, QL_DETAI_GV } from "../../../components/InterFace";
  import { GetDotByTaiKhoan } from "../../../sevices/Api/QL_DoAn/QL_DotLamDoAn/QL_DotDoAn";
  import { add_DeTaiDoAn_GV, get_dettai_madot_or_ten, edit_DeTaiDoAn_GV } from "../../../sevices/Api/QL_DoAn/QL_DeTaiDoAn/QL_DeTai";
  
  const { Title } = Typography;
  const { Option } = Select;
  
  export default function QuanLyDeTai() {
    const taiKhoan = localStorage.getItem("taiKhoan") || "";
    const [form] = Form.useForm();
    const [hienModal, setHienModal] = useState(false);
    const [keyDangSua, setKeyDangSua] = useState<string | null>(null);
    const [timKiem, setTimKiem] = useState("");
    const [loading, setLoading] = useState(true);
    const [duLieuLoc, setDuLieuLoc] = useState(mockDeTaiData);
    const [ListDot, setListDot] = useState<DotLamDoAn[]>([]);
    const [selectedMaDot, setSelectedMaDot] = useState<string>("");
  
    useEffect(() => {
        document.title = 'Quản lý đề tài';
      getall_data();
    }, []);
  
    useEffect(() => {
      if (selectedMaDot) {
        Search();
      }
    }, [timKiem, selectedMaDot]);
  
    const getall_data = async () => {
      try {
        setLoading(true);
        const ListDot = await GetDotByTaiKhoan();
        setListDot(ListDot);
        if (ListDot.length > 0) {
          setSelectedMaDot(ListDot[0].maDot);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Không thể tải dữ liệu. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };
  
    const Search = async () => {
      const data = await get_dettai_madot_or_ten(selectedMaDot, timKiem);
      setDuLieuLoc(data);
    };
  
    const showModal = useCallback(
      (banGhi?: QL_DETAI_GV) => {
        form.resetFields();
        if (banGhi) {
          form.setFieldsValue(banGhi);
          setKeyDangSua(banGhi.maDeTai);
        } else {
          setKeyDangSua(null);
        }
        setHienModal(true);
      },
      [form]
    );
  
    const xuLyDongY = async () => {
      const giatri = await form.validateFields();
      const data_DeTai = {
        tenDeTai: giatri.tenDeTai,
        maDot: giatri.maDot,
        hinhThucBaoCaoBaoVe: giatri.hinhThucBaoCaoBaoVe,
        maGiangVien: taiKhoan,
        maSinhVien: taiKhoan,
        trangThai: 1,
        nguoiDeXuat: taiKhoan,
        moTa: giatri.moTa,
        maDeTai: keyDangSua=== null? '0': keyDangSua,
      };
      if (keyDangSua != null) {
        await edit_DeTaiDoAn_GV(data_DeTai, Search);
      } else {
        await add_DeTaiDoAn_GV(data_DeTai, Search);
      }
      setHienModal(false);
      form.resetFields();
      setKeyDangSua(null);
    };
  
    const xuLyDangKy = (maDeTai: string) => {
      message.success(`Đăng ký đề tài ${maDeTai} thành công!`);
    };
  
    const handleSelectChange = (value: string) => {
      setSelectedMaDot(value);
    };
  
    const cotBang = COLUMSDETAI(showModal, xuLyDangKy);
  
    return (
      <div>
        {ListDot.length > 0 ? (
          <Card className="shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <Title
                level={2}
                className="text-center mb-8"
                style={{ color: "#1e88e5", fontSize: "25px", fontWeight: "bold" }}
              >
                QUẢN LÝ ĐỀ TÀI
              </Title>
              <Divider />
              <Row gutter={16} className="mb-6">
                <Col xs={24} sm={24} md={16} lg={18} xl={18}>
                  <Space direction="horizontal" className="w-full">
                    <Input
                      placeholder="Tìm kiếm theo tên đề tài hoặc tên giảng viên"
                      value={timKiem}
                      onChange={(e) => setTimKiem(e.target.value)}
                      prefix={<SearchOutlined className="text-gray-400" />}
                    />
                    <Select
                      placeholder="Chọn mã đợt"
                      onChange={handleSelectChange}
                      value={selectedMaDot}
                      style={{ width: "100%" }}
                    >
                      {ListDot.map((dot) => (
                        <Option key={dot.maDot} value={dot.maDot}>
                          {dot.tenDot}
                        </Option>
                      ))}
                    </Select>
                  </Space>
                </Col>
                <Col xs={24} sm={24} md={8} lg={6} xl={6} className="flex justify-end items-end">
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => showModal()}
                    className="bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600"
                  >
                    Thêm đề tài
                  </Button>
                </Col>
              </Row>
              <Divider />
              <Table
                columns={cotBang}
                dataSource={duLieuLoc}
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
        ) : (
          <h1>Bạn không thuộc đợt Nghiên cứu Khoa Học nào</h1>
        )}
  
        <ReusableModal
          visible={hienModal}
          onOk={xuLyDongY}
          onCancel={() => setHienModal(false)}
          keyDangSua={keyDangSua}
          add_Titel="Thêm đề tài"
          update_Titel="Chỉnh đề tài"
        >
          <Form_QL_DeTai formdulieu={form} Dot_MaGV={ListDot} />
        </ReusableModal>
      </div>
    );
  }
  