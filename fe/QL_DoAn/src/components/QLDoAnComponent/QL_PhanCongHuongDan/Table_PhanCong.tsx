import React, { useState, useEffect } from 'react';
import { Table, Select, message } from 'antd';
import { getGiangVien_maDot } from '../../../sevices/Api/QL_DoAn/QL_DotLamDoAn/GiangVien_Dot-servives';
import { getSinhVien_maDot } from '../../../sevices/Api/QL_DoAn/QL_DotLamDoAn/SinhVien_Dot-servives';
import { 
  addPhanCong, 
  editPhanCong, 
  GetAll_PhanCong_MaDot
} from '../../../sevices/Api/QL_DoAn/PhanCongHuongDan-servives';

const { Option } = Select;

interface SinhVien {
  maSinhVien: string;
  tenSinhVien: string;
  maLop: string;
  maGiangVien?: string;
}

interface GiangVien {
  maGiangVien: string;
  tenGiangVien: string;
  soLuongHuongDan: number;
  soLuongDangHuongDan: number;
}

interface PhanCongHuongDan {
  maDot: string;
  maSinhVien: string;
  maGiangVien: string;
}

interface PhanCongHuongDanTableProps {
  maDot: string;
}

const PhanCongHuongDanTable: React.FC<PhanCongHuongDanTableProps> = ({ maDot }) => {
  const [sinhVienList, setSinhVienList] = useState<SinhVien[]>([]);
  const [giangVienList, setGiangVienList] = useState<GiangVien[]>([]);
  const [phanCong, setPhanCong] = useState<PhanCongHuongDan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getall_data = async () => {
    try {
      setLoading(true);
      const [ListSinhVien, ListGiangVien, ListPhanCong] = await Promise.all([
        getSinhVien_maDot(maDot),
        getGiangVien_maDot(maDot),
        GetAll_PhanCong_MaDot(maDot)
      ]);
      setSinhVienList(ListSinhVien);
      setGiangVienList(ListGiangVien);
      setPhanCong(ListPhanCong);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Không thể tải dữ liệu. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Phân công giảng viên hướng dẫn";
    getall_data();
  }, [maDot]);

  const themPhanCong = async (maSinhVien: string, maGiangVien: string) => {
    try {
      let data = {
        maDot: maDot,
        maSinhVien: maSinhVien,
        maGiangVien: maGiangVien
      };
      await addPhanCong(data, getall_data);      
    } catch (error) {
      message.error('Thêm phân công thất bại');
    }
  };

  const suaPhanCong = async (maSinhVien: string, maGiangVienMoi: string) => {
      const data = {
        maDot: maDot,
        maSinhVien: maSinhVien,
        maGiangVien: maGiangVienMoi
      };
      
      await editPhanCong(data, getall_data);
  };

  const handleChangeGiangVien = (maSinhVien: string, maGiangVienMoi: string) => {
    const PhanCongNow=phanCong.find(pc=>pc.maSinhVien===maSinhVien);
    
    const giangVienMoi = giangVienList.find(gv => gv.maGiangVien === maGiangVienMoi);
    if (giangVienMoi && giangVienMoi.soLuongDangHuongDan >= giangVienMoi.soLuongHuongDan) {
      message.warning('Giảng viên đã đủ số lượng hướng dẫn');
      return;
    }

    if (!PhanCongNow?.maGiangVien) {
      themPhanCong(maSinhVien, maGiangVienMoi);
    } else {
      suaPhanCong(maSinhVien, maGiangVienMoi);
    }
  };

  const columns = [
    {
      title: 'Mã Sinh Viên',
      dataIndex: 'maSinhVien',
      key: 'maSinhVien',
      width: '10%'
    },
    {
      title: 'Tên Sinh Viên',
      dataIndex: 'tenSinhVien',
      key: 'tenSinhVien',
      width: '20%'
    },
    {
      title: 'Mã Lớp',
      dataIndex: 'maLop',
      key: 'maLop',
      width: '10%'
    },
    {
      title: 'Chọn Giảng Viên Hướng Dẫn',
      key: 'giangVienHuongDan',
      render: (record: SinhVien) => {
        const phanCongSinhVien = phanCong.find(pc => pc.maSinhVien === record.maSinhVien);
        
        return (
          <Select
            style={{ width: '100%' }}
            value={phanCongSinhVien ? phanCongSinhVien.maGiangVien : record.maGiangVien}
            placeholder="Chọn giảng viên"
            onChange={(value) => handleChangeGiangVien(record.maSinhVien, value)}
          >
            {/* Hiển thị giảng viên đang được phân công trước tiên */}
            {phanCongSinhVien && (
              <Option 
                key={`current-${phanCongSinhVien.maGiangVien}`} 
                value={phanCongSinhVien.maGiangVien}
              >
                {(() => {
                  const gv = giangVienList.find(g => g.maGiangVien === phanCongSinhVien.maGiangVien);
                  return gv 
                    ? `${gv.maGiangVien} - ${gv.tenGiangVien} - ${gv.soLuongDangHuongDan}/${gv.soLuongHuongDan} (Giảng viên hiện tại)` 
                    : phanCongSinhVien.maGiangVien
                })()}
              </Option>
            )}

            {/* Thêm một đường phân cách */}
            {phanCongSinhVien && <Option disabled>─────────────────────────────────────────────────────────────────────────────</Option>}

            {/* Hiển thị toàn bộ giảng viên khác */}
            {giangVienList
              .filter(gv => 
                // Loại bỏ giảng viên hiện tại khỏi danh sách để tránh trùng lặp
                !phanCongSinhVien || gv.maGiangVien !== phanCongSinhVien.maGiangVien
              )
              .map(gv => (
                <Option 
                  key={gv.maGiangVien} 
                  value={gv.maGiangVien}
                  disabled={gv.soLuongDangHuongDan >= gv.soLuongHuongDan}
                >
                  {`${gv.maGiangVien} - ${gv.tenGiangVien} - ${gv.soLuongDangHuongDan}/${gv.soLuongHuongDan}`}
                </Option>
              ))
            }
          </Select>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={sinhVienList}
      loading={loading}
      rowKey="maSinhVien"
    />
  );
};

export default PhanCongHuongDanTable;