import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Popconfirm, Row, Col, Input, Space, Typography, Divider } from 'antd';
import { DeleteOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { useQuanLyDuLieu } from '../../../ultils/hook';
import ReusableModal from '../../../components/UI/Modal';
import { COLUMS } from '../../../components/UI/Table';
import { FormHocVi } from '../../../components/QLDanhMuc/QL_HocVi/QL_HocViForm';
import { cotHocVi } from '../../../components/QLDanhMuc/QL_HocVi/TableHocVi';
import { HocVi } from "../../../components/InterFace";

const { Title } = Typography;

const hocViBanDau: HocVi[] = [
  {
    key: 1,
    ma: 'TS',
    ten: 'Tiến sĩ',
    kyHieu: 'Dr.',
    moTa: 'Bậc học vị cao nhất',
    soLuongHuongDan: 10,
  },
  {
    key: 2,
    ma: 'ThS',
    ten: 'Thạc sĩ',
    kyHieu: 'M.',
    moTa: 'Bậc học vị sau đại học',
    soLuongHuongDan: 5,
  },
];

const QuanLyHocVi: React.FC = () => {
  const {
    duLieu: hocVi,
    hienModal,
    setHienModal,
    form,
    keyDangSua,
    cacDongDaChon,
    hienThiModal,
    xuLyDongY,
    xuLyXoa,
    xuLyXoaNhieu,
    chonDong,
  } = useQuanLyDuLieu<HocVi>({
    duLieuBanDau: hocViBanDau,
    khoaLuuTru: 'utehy_hocvi',
  });

  const [timKiem, setTimKiem] = useState("");
  const [duLieuLoc, setDuLieuLoc] = useState(hocVi);

  useEffect(() => {
    document.title = 'Quản lý học vị';
  }, []);

  useEffect(() => {
    const ketQuaLoc = hocVi.filter(
      (hv) =>
        hv.ten.toLowerCase().includes(timKiem.toLowerCase()) ||
        hv.kyHieu.toLowerCase().includes(timKiem.toLowerCase())
    );
    setDuLieuLoc(ketQuaLoc);
  }, [hocVi, timKiem]);

  const cotBang = COLUMS(cotHocVi, hienThiModal, xuLyXoa);

  const luaChonDong = {
    selectedRowKeys: cacDongDaChon,
    onChange: chonDong,
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Card className="shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <Title level={2} className="text-center  mb-8">
            Quản lý danh mục học vị
          </Title>
          <Row gutter={16} className="mb-6">
            <Col xs={24} sm={24} md={16} lg={18} xl={18}>
              <Input
                placeholder="Tìm kiếm theo tên học vị hoặc ký hiệu"
                value={timKiem}
                
                onChange={(e) => setTimKiem(e.target.value)}
                prefix={<SearchOutlined className="text-gray-400" />}
                className="w-full "
              />
            </Col>
            <Col xs={24} sm={24} md={8} lg={6} xl={4} className="flex justify-end">
              <Space>
                {cacDongDaChon.length > 0 && (
                  <Popconfirm
                    title={`Bạn có chắc chắn muốn xóa ${cacDongDaChon.length} học vị đã chọn?`}
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
                  Thêm Học Vị
                </Button>
              </Space>
            </Col>
          </Row>
          <Divider className="my-6" />
          <Table
            rowSelection={luaChonDong}
            columns={cotBang}
            dataSource={duLieuLoc}
            rowKey="key"
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
        add_Titel="Thêm Học vị mới"
        update_Titel="Chỉnh sửa Học vị"
      >
        <FormHocVi formdulieu={form} />
      </ReusableModal>
    </div>
  );
};

export default QuanLyHocVi;