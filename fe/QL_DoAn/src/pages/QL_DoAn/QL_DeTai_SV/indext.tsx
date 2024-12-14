import { Card, Table, Button, Row, Col, Input, Space, Typography, Divider, Form, message } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import ReusableModal from "../../../components/UI/Modal";
import { Form_DeXuatDeTai_SV } from "../../../components/QLDoAnComponent/DangKyDeTai_SV/FormDeXuatDeTai";
import { useState, useEffect } from 'react';
import { mockDeTaiData } from '../../../components/QLDoAnComponent/DangKyDeTai_SV/mockdata';
import { COLUMS } from '../../../components/QLDoAnComponent/DangKyDeTai_SV/Table_DangKyDeTai';
import { GetAll_MaDot_TK } from "../../../sevices/Api/QL_DoAn/QL_DeTaiDoAn/DeXuatDeTai_SV";

const { Title } = Typography;

export default function DangKyDeTai() {
    const [form] = Form.useForm();
    const [hienModal, setHienModal] = useState(false);
    const [keyDangSua, setKeyDangSua] = useState("");
    const [timKiem, setTimKiem] = useState("");
    const [loading, setLoading] = useState(true);
    const [duLieuLoc, setDuLieuLoc] = useState(mockDeTaiData);
    const [maDot, setMaDot] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            await getdata();
            setLoading(false);
        };
        fetchData();
    }, []);

    const getdata = async () => {
        try {
            const kq = await GetAll_MaDot_TK();
            setMaDot(kq || "");
        } catch (error) {
            console.error("Lỗi khi lấy mã đợt:", error);
            setMaDot("");
        }
    };

    const hienThiModal = () => {
        setHienModal(true);
    };

    const xuLyDongY = () => {
        message.success('Đề xuất đề tài thành công!');
        setHienModal(false);
    };

    const xuLyDangKy = (maDeTai: string) => {
        message.success(`Đăng ký đề tài ${maDeTai} thành công!`);
    };

    const handleSearch = (value: string) => {
        const filteredData = mockDeTaiData.filter(
            (item) =>
                item.TenDeTai.toLowerCase().includes(value.toLowerCase()) ||
                item.tenGiangVien.toLowerCase().includes(value.toLowerCase())
        );
        setDuLieuLoc(filteredData);
    };

    return (
        maDot ? (
            <div className="bg-gray-100 min-h-screen p-6">
                <Card className="shadow rounded-lg overflow-hidden">
                    <div className="p-6">
                        <Title level={2} className="text-center mb-8" style={{ color: '#1e88e5', fontSize: '25px', fontWeight: 'bold' }}>
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
                        <Table
                            columns={COLUMS(xuLyDangKy)}
                            dataSource={duLieuLoc}
                            rowKey="MaDeTai"
                            scroll={{ x: 768 }}
                            loading={loading}
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
                    add_Titel="Đề xuất đề tài"
                    update_Titel="Chỉnh sửa đề tài"
                >
                    <Form_DeXuatDeTai_SV formdulieu={form} maDot={maDot || ""} />
                </ReusableModal>
            </div>
        ) : (
            <div>
                <h1>Bạn không thuộc đợt làm đồ án nào</h1>
            </div>
        )
    );
}
