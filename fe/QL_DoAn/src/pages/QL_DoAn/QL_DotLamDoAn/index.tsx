import React, { useEffect, useState, useCallback } from 'react'
import { Card, Table, Button, Popconfirm, Row, Col, Input, Space, Typography, Divider, Form, message } from 'antd'
import { DeleteOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons'
import ReusableModal from '../../../components/UI/Modal'
import { columDotLamDoAn } from '../../../components/QLDoAnComponent/QLDotLamDoAn/table'
import { FormDotLamDoAn } from '../../../components/QLDoAnComponent/QLDotLamDoAn/form'
import { DotLamDoAn, DotLamDoAn_GiangVien } from "../../../components/InterFace"
import { getAll_DotDoAn, add_DotDoAn, edit_DotDoAn, del_DotDoAn } from '../../../sevices/Api/QL_DoAn/QL_DotLamDoAn/QL_DotDoAn'
import moment from 'moment'
import Modal_GiangVien_Dot from "../../../components/QLDoAnComponent/QLDotLamDoAn/Modal_GiangVien"
import { add_GiangVien_DotLamDoAn, getAll_GiangVien_HD, getGiangVien_maDot,del_GiangVien_DotDoAn,Up_SLHuongDan } from '../../../sevices/Api/QL_DoAn/QL_DotLamDoAn/DotLamDoAn_GiangVien-servives'

const { Title } = Typography

export default function QuanLyDotLamDoAn() {
  const [dotlamdoan, setDotLamDoAn] = useState<DotLamDoAn[]>([]);
  const [hienModal, setHienModal] = useState(false);
  const [timKiem, setTimKiem] = useState("");
  const [maDot, setMaDot] = useState<string | null>(null);
  const [cacDongDaChon, setCacDongDaChon] = useState<React.Key[]>([]);
  const [hienmodalGiangVien, setHienModalGiangVien] = useState(false);
  const [GiangVien, setGiangVien] = useState<DotLamDoAn_GiangVien[]>([]);
  const [GiangVien_Dot, setGiangVien_Dot] = useState<DotLamDoAn_GiangVien[]>([]);
  const [form] = Form.useForm();
  const [maDot_on,setMaDotOn]=useState("");
  useEffect(() => {
    document.title = 'Quản lý đợt làm đồ án'
    GetAll_DotDoAn()
  }, [])

  const GetAll_DotDoAn = async () => {
    const data = await getAll_DotDoAn();
    setDotLamDoAn(data);
  }

  const hienThiModal = (banGhi?: DotLamDoAn) => {
    form.resetFields();
    if (banGhi) {
      const ngayBatDau = banGhi.ngayBatDau ? moment(banGhi.ngayBatDau) : null;
      form.setFieldsValue({ ...banGhi, ngayBatDau: ngayBatDau });
      setMaDot(banGhi.maDot);
    } else {
      setMaDot(null);
    }
    setHienModal(true);
  };

  const xuLyDongY = async () => {
    const giatri = await form.validateFields();
    if (maDot !== null) {
      await edit_DotDoAn(giatri, GetAll_DotDoAn);
    } else {
      const fieldsToEnsure = [
        'dangKyDeTai',
        'choPhepSinhVienDangKyGiangVienKhacBoMon',
        'choPhepSinhVienBaoCaoKhacTuanHienTai',
        'choPhepGiangVienBaoCaoKhacTuanHienTai',
        'choPhepGiangVienSuaDeTai',
        'trangThai',
      ];

      fieldsToEnsure.forEach((field) => {
        if (giatri[field] === undefined) giatri[field] = false;
      });

      await add_DotDoAn(giatri, GetAll_DotDoAn);
    }
    setHienModal(false);
    form.resetFields();
    setMaDot(null);
  };

  const xuLyXoa = async (maDot: string) => {
    await del_DotDoAn(maDot, GetAll_DotDoAn);
  };

  const xulyXoaNhieu = async () => {
    for (let i = 0; i < cacDongDaChon.length; i++) {
      await xuLyXoa(cacDongDaChon[i].toString());
    }
    setCacDongDaChon([]);
  };

  const chonDong = (cacKeyChon: React.Key[]) => {
    setCacDongDaChon(cacKeyChon);
  };

  const handleAddGiangVien = useCallback((giangVien: DotLamDoAn_GiangVien) => {
    setGiangVien_Dot(prevState => [...prevState, giangVien]);
  }, []);

  const handleRemoveGiangVien = useCallback(async(maDot: string, maGiangVien: string) => {
    setGiangVien_Dot(prevState => prevState.filter(gv => gv.maGiangVien !== maGiangVien));
    await del_GiangVien_DotDoAn(maDot,maGiangVien);
  }, []);
// chưa xong hàm này
  const updateSelectedGiangVien = useCallback(async(updatedGiangVien: DotLamDoAn_GiangVien[]) => {
    console.log(maDot_on);
    const existingGiangVien = await getGiangVien_maDot(maDot_on);
    for(let i=0;i<existingGiangVien.length;i++)
    {
      for(let j=0;j<updatedGiangVien.length;j++)
      {
        if(existingGiangVien[i].maGiangVien===updatedGiangVien[j].maGiangVien && existingGiangVien[i].soLuongHuongDan !== updatedGiangVien[j].soLuongHuongDan )
        {
            let data={
              maDot:maDot_on,
              maGiangVien:existingGiangVien[i].maGiangVien,
              soLuongHuongDan:updatedGiangVien[j].soLuongHuongDan
            }
            await Up_SLHuongDan(data);
        }
      }
    }
  }, []);

  const themGiangVien = async () => {
    setHienModalGiangVien(false);
    
    const existingGiangVien = await getGiangVien_maDot(maDot_on);
    
    const newGiangVien = GiangVien_Dot.filter(
        gv => !existingGiangVien.some(
            (existing:DotLamDoAn_GiangVien) => existing.maGiangVien === gv.maGiangVien
        )
    );

    for(let gv of newGiangVien) {
        let data = {
            maDot: maDot_on,
            maGiangVien: gv.maGiangVien,
            soLuongHuongDan: gv.soLuongHuongDan
        }
        await add_GiangVien_DotLamDoAn(data);
    }

    
    message.success(`Đã thêm ${newGiangVien.length} giảng viên mới`);
};
  const showMoDAL_ADDGiangVien=async(maDot:string)=>{
      setMaDotOn(maDot);
      setHienModalGiangVien(true);
      setGiangVien(await getAll_GiangVien_HD());
      setGiangVien_Dot(await getGiangVien_maDot(maDot));
  }
  const cotBang = columDotLamDoAn(hienThiModal, xuLyXoa,showMoDAL_ADDGiangVien)
  const luaChonDong = {
    selectedRowKeys: cacDongDaChon,
    onChange: chonDong,
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Card className="shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <Title level={2} className="text-center custom-blue mb-8" style={{ color: '#1e88e5', fontSize: '25px', fontWeight: 'bold' }}>
            QUẢN LÝ ĐỢT LÀM ĐỒ ÁN
          </Title>
          <hr />
          <Row gutter={16} className="mb-6">
            <Col xs={24} sm={24} md={16} lg={18} xl={18}>
              <Input
                placeholder="Tìm kiếm theo tên lớp hoặc chuyên ngành"
                value={timKiem}
                onChange={(e) => setTimKiem(e.target.value)}
                prefix={<SearchOutlined className="text-gray-400" />}
                className="w-full"
              />
            </Col>
            <Col xs={24} sm={24} md={8} lg={6} xl={6} className="flex justify-end">
              <Space>
                {cacDongDaChon.length > 0 && (
                  <Popconfirm
                    title={`Bạn có chắc chắn muốn xóa ${cacDongDaChon.length} đợt đã chọn?`}
                    onConfirm={xulyXoaNhieu}
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
                  Thêm đợt làm đồ án
                </Button>
              </Space>
            </Col>
          </Row>
          <Divider className="my-6" />
          <Table
            rowSelection={luaChonDong}
            columns={cotBang}
            dataSource={dotlamdoan.filter(
              (hv) =>
                hv.tenDot.toLowerCase().includes(timKiem.toLowerCase()) ||
                hv.maDot.toLowerCase().includes(timKiem.toLowerCase())
            )}
            rowKey="maDot"
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
      <Modal_GiangVien_Dot
        hienmodalGiangVien={hienmodalGiangVien}
        setHienModal={setHienModalGiangVien}
        GiangVien={GiangVien}
        selectedGiangVien={GiangVien_Dot}
        handleAddGiangVien={handleAddGiangVien}
        handleRemoveGiangVien={handleRemoveGiangVien}
        themGiangVien={themGiangVien}
        updateSelectedGiangVien={updateSelectedGiangVien}
      />
      <ReusableModal
        visible={hienModal}
        onOk={xuLyDongY}
        onCancel={() => setHienModal(false)}
        keyDangSua={maDot}
        add_Titel="Thêm đợt làm đồ án"
        update_Titel="Sửa đợt làm đồ án"
      >
        <FormDotLamDoAn formdulieu={form} />
      </ReusableModal>
    </div>
  )
}

