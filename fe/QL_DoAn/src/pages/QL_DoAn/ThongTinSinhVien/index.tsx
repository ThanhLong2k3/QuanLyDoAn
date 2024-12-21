import React, { useEffect, useState } from 'react';
import { Card, Descriptions, Typography, Spin, message, Button, Form, Input, Modal, DatePicker, Select, Empty, Result } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { SinhVien } from '../../../components/InterFace';
import { get_SinhVien_ID,editSinhVien_SinhVien } from '../../../sevices/Api/QL_DoAn/QL_SinhVien-servives';
import dayjs from 'dayjs';

const { Title } = Typography;
const { Option } = Select;

interface EditFormValues extends Omit<SinhVien, 'ngaySinh'> {
    ngaySinh: dayjs.Dayjs;
}

const ThongTinSinhVien: React.FC = () => {
    const [sinhVien, setSinhVien] = useState<SinhVien | undefined>();
    const [loading, setLoading] = useState<boolean>(true);
    const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
    const [form] = Form.useForm();
    const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            setLoading(true);
            const data = await get_SinhVien_ID();
            setSinhVien(data);
            setIsDataFetched(true);
        } catch (error) {
            message.error('Không thể tải thông tin sinh viên');
            console.error('Error:', error);
            setIsDataFetched(true);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date: Date | string | undefined) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('vi-VN');
    };

    const showEditModal = () => {
        if (sinhVien) {
            form.setFieldsValue({
                ...sinhVien,
                ngaySinh: dayjs(sinhVien.ngaySinh)
            });
        }
        setIsEditModalVisible(true);
    };

    const handleEditSubmit = async () => {
            const taiKhoan= localStorage.getItem('taiKhoan')|| '';
            const giatri = await form.validateFields();
            const data={
                maSinhVien: taiKhoan,
                tenSinhVien: giatri.tenSinhVien,
                email: giatri.email,
                sDT: giatri.sDT,
                ngaySinh: giatri.ngaySinh,
                gioiTinh: giatri.gioiTinh
            }
            debugger;
            await editSinhVien_SinhVien(data,getData);
            setIsEditModalVisible(false);
    };

    if (loading) {
        return (
            <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Spin size="large" />
            </div>
        );
    }

    if (isDataFetched && !sinhVien) {
        return (
            <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
                <Result
                    status="warning"
                    title="Không tìm thấy thông tin sinh viên"
                    subTitle="Bạn không phải là sinh viên hoặc chưa được cấp quyền truy cập."
                    extra={
                        <Button type="primary" onClick={() => window.history.back()}>
                            Quay lại
                        </Button>
                    }
                />
            </div>
        );
    }

    return (
        <div style={{ padding: '24px', background: 'white', minHeight: '100vh' }}>
            <Card style={{ maxWidth: 1000, margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
                        THÔNG TIN SINH VIÊN
                    </Title>
                    <Button 
                        type="primary" 
                        icon={<EditOutlined />}
                        onClick={showEditModal}
                    >
                        Sửa thông tin
                    </Button>
                </div>

                {sinhVien && (
                    <Descriptions
                        bordered
                        column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
                        
                    >
                        <Descriptions.Item label="Mã sinh viên">
                            {sinhVien.maSinhVien}
                        </Descriptions.Item>
                        <Descriptions.Item label="Họ và tên">
                            {sinhVien.tenSinhVien}
                        </Descriptions.Item>
                        <Descriptions.Item label="Lớp">
                            {sinhVien.maLop}
                        </Descriptions.Item>
                        <Descriptions.Item label="Trạng thái">
                            {sinhVien.tenTrangThai || 'N/A'}
                        </Descriptions.Item>
                        <Descriptions.Item label="Ngày sinh">
                            {formatDate(sinhVien.ngaySinh)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Email">
                            {sinhVien.email}
                        </Descriptions.Item>
                        <Descriptions.Item label="Giới tính">
                            {sinhVien.gioiTinh}
                        </Descriptions.Item>
                        <Descriptions.Item label="Số điện thoại">
                            {sinhVien.sDT}
                        </Descriptions.Item>
                    </Descriptions>
                )}

                <Modal
                    title="Cập nhật thông tin sinh viên"
                    open={isEditModalVisible}
                    onCancel={() => setIsEditModalVisible(false)}
                    footer={null}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleEditSubmit}
                    >
                        <Form.Item
                            name="tenSinhVien"
                            label="Tên sinh viên"
                            rules={[
                                { required: true, message: 'Vui lòng tên' },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                { required: true, message: 'Vui lòng nhập email' },
                                { type: 'email', message: 'Email không hợp lệ' }
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="sDT"
                            label="Số điện thoại"
                            rules={[
                                { required: true, message: 'Vui lòng nhập số điện thoại' },
                                { pattern: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ' }
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="gioiTinh"
                            label="Giới tính"
                            rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}
                        >
                            <Select>
                                <Option value="Nam">Nam</Option>
                                <Option value="Nữ">Nữ</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="ngaySinh"
                            label="Ngày sinh"
                            rules={[{ required: true, message: 'Vui lòng chọn ngày sinh' }]}
                        >
                            <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                        </Form.Item>

                        <Form.Item>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                                <Button onClick={() => setIsEditModalVisible(false)}>
                                    Hủy
                                </Button>
                                <Button type="primary" htmlType="submit">
                                    Cập nhật
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </Modal>
            </Card>
        </div>
    );
};

export default ThongTinSinhVien;