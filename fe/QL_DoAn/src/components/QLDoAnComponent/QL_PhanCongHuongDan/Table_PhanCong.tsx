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
  soLuongDeTaiChuaDangKy:number;
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
  const [isPhanCongLoading, setIsPhanCongLoading] = useState<boolean>(true);

  const getall_data = async () => {
    try {
      setLoading(true);
      setIsPhanCongLoading(true);
      const [ListSinhVien, ListGiangVien, ListPhanCong] = await Promise.all([
        getSinhVien_maDot(maDot),
        getGiangVien_maDot(maDot),
        GetAll_PhanCong_MaDot(maDot)
      ]);

      setSinhVienList(ListSinhVien);
      setGiangVienList(ListGiangVien);
      setPhanCong(ListPhanCong.map((pc: PhanCongHuongDan) => ({
        ...pc,
        maSinhVien: pc.maSinhVien.toString().trim()
      })));

    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Không thể tải dữ liệu. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
      setIsPhanCongLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Phân công giảng viên hướng dẫn";
    console.log('Initial phanCong data:', phanCong);
    getall_data();
  }, [maDot]);

  const themPhanCong = async (maSinhVien: string, maGiangVien: string): Promise<void> => {
    try {
      const data: PhanCongHuongDan = {
        maDot,
        maSinhVien: maSinhVien.toString().trim(),
        maGiangVien
      };
      console.log('Adding new assignment:', data);
      await addPhanCong(data, getall_data);      
    } catch (error) {
      console.error('Error adding assignment:', error);
      message.error('Thêm phân công thất bại');
    }
  };

  const suaPhanCong = async (maSinhVien: string, maGiangVienMoi: string): Promise<void> => {
    try {
      const data: PhanCongHuongDan = {
        maDot,
        maSinhVien: maSinhVien.toString().trim(),
        maGiangVien: maGiangVienMoi
      };
      console.log('Updating assignment:', data);
      await editPhanCong(data, getall_data);
    } catch (error) {
      console.error('Error updating assignment:', error);
      message.error('Sửa phân công thất bại');
    }
  };

  const handleChangeGiangVien = (maSinhVien: string, maGiangVienMoi: string): void => {
    console.log('Handling teacher change:', { maSinhVien, maGiangVienMoi });
    
    const phanCongHienTai = phanCong.find((pc: PhanCongHuongDan) => {
      const normalizedPcMaSV = pc.maSinhVien.toString().trim();
      const normalizedMaSV = maSinhVien.toString().trim();
      console.log('Comparing in handleChange:', {
        pcMaSV: normalizedPcMaSV,
        maSV: normalizedMaSV,
        isMatch: normalizedPcMaSV === normalizedMaSV
      });
      return normalizedPcMaSV === normalizedMaSV;
    });
    
    console.log('Current assignment found:', phanCongHienTai);
    
    const giangVienMoi = giangVienList.find((gv: GiangVien) => gv.maGiangVien === maGiangVienMoi);
    if (giangVienMoi && giangVienMoi.soLuongDangHuongDan >= giangVienMoi.soLuongHuongDan) {
      message.warning('Giảng viên đã đủ số lượng hướng dẫn');
      return;
    }

    if (!phanCongHienTai) {
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
      width: '10%',
      render: (text: string) => {
        console.log('Rendering maSinhVien:', text);
        return text;
      }
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
        console.log('Rendering teacher selection for student:', {
          record,
          type: typeof record.maSinhVien
        });

        const phanCongSinhVien = phanCong.find((pc: PhanCongHuongDan) => {
          const normalizedPcMaSV = pc.maSinhVien.toString().trim();
          const normalizedRecordMaSV = record.maSinhVien.toString().trim();      
          return normalizedPcMaSV === normalizedRecordMaSV;
        });


        if (isPhanCongLoading) {
          return <Select loading style={{ width: '100%' }} />;
        }

        return (
          <Select
            style={{ width: '100%' }}
            value={phanCongSinhVien?.maGiangVien}
            placeholder="Chọn giảng viên"
            onChange={(value: string) => handleChangeGiangVien(record.maSinhVien, value)}
          >
            {phanCongSinhVien && (
              <>
                <Option 
                  key={`current-${phanCongSinhVien.maGiangVien}`} 
                  value={phanCongSinhVien.maGiangVien}
                >
                  {(() => {
                    const gv = giangVienList.find((g: GiangVien) => g.maGiangVien === phanCongSinhVien.maGiangVien);
                    return gv 
                      ? `${gv.maGiangVien} - ${gv.tenGiangVien} - ${gv.soLuongDangHuongDan}/${gv.soLuongHuongDan} -  Có: ${gv.soLuongDeTaiChuaDangKy} Đề tài chưa phân công` 
                      : phanCongSinhVien.maGiangVien;
                  })()}
                </Option>
                <Option disabled>─────────────────────────────────────────────────────────────────────────────</Option>
              </>
            )}

            {giangVienList
              .filter((gv: GiangVien) => !phanCongSinhVien || gv.maGiangVien !== phanCongSinhVien.maGiangVien)
              .map((gv: GiangVien) => (
                <Option 
                  key={gv.maGiangVien} 
                  value={gv.maGiangVien}
                  disabled={gv.soLuongDangHuongDan >= gv.soLuongHuongDan}
                >
                  {`${gv.maGiangVien} - ${gv.tenGiangVien} - ${gv.soLuongDangHuongDan}/${gv.soLuongHuongDan} -  Có: ${gv.soLuongDeTaiChuaDangKy} Đề tài chưa phân công`}
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