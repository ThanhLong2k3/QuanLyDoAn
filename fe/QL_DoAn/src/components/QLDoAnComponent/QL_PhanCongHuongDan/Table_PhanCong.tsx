import React, { useState, useEffect } from 'react';
import { Table, Select, message } from 'antd';
import { getGiangVien_maDot } from '../../../sevices/Api/QL_DoAn/QL_DotLamDoAn/GiangVien_Dot-servives';
import { getSinhVien_maDot } from '../../../sevices/Api/QL_DoAn/QL_DotLamDoAn/SinhVien_Dot-servives';
import { addPhanCong,editPhanCong} from '../../../sevices/Api/QL_DoAn/PhanCongHuongDan-servives';
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
  tongSoLuongToiDa: number;
}

interface PhanCongHuongDanTableProps {
  maDot: string;
}

const PhanCongHuongDanTable: React.FC<PhanCongHuongDanTableProps> = ({ maDot }) => {
  const [sinhVienList, setSinhVienList] = useState<SinhVien[]>([]);
  const [giangVienList, setGiangVienList] = useState<GiangVien[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getall_data = async () => {
    try {
      setLoading(true);
      const [ListSinhVien, ListGiangVien] = await Promise.all([
        getSinhVien_maDot(maDot),
        getGiangVien_maDot(maDot)
      ]);
      setSinhVienList(ListSinhVien);
      setGiangVienList(ListGiangVien);
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
        let data={
            maDot:maDot,
            maSinhVien:maSinhVien,
            maGiangVien:maGiangVien
        }
        await addPhanCong(data,getall_data);      
    } catch (error) {
      message.error('Thêm phân công thất bại');
    }
  };

  const suaPhanCong = (maSinhVien: string, maGiangVienMoi: string, maGiangVienCu: string) => {
    try {
      console.log(`Sửa sinh viên ${maSinhVien} từ giảng viên ${maGiangVienCu} sang ${maGiangVienMoi}`);
      
      const updatedSinhVienList = sinhVienList.map(sv => 
        sv.maSinhVien === maSinhVien 
          ? {...sv, maGiangVien: maGiangVienMoi} 
          : sv
      );
      setSinhVienList(updatedSinhVienList);

      const updatedGiangVienList = giangVienList.map(gv => {
        if (gv.maGiangVien === maGiangVienCu) {
          return {...gv, soLuongHuongDan: gv.soLuongHuongDan - 1};
        }
        if (gv.maGiangVien === maGiangVienMoi) {
          return {...gv, soLuongHuongDan: gv.soLuongHuongDan + 1};
        }
        return gv;
      });
      setGiangVienList(updatedGiangVienList);

      message.success('Sửa phân công thành công');
    } catch (error) {
      message.error('Sửa phân công thất bại');
    }
  };

  const handleChangeGiangVien = (maSinhVien: string, maGiangVienMoi: string) => {
    const sinhVien = sinhVienList.find(sv => sv.maSinhVien === maSinhVien);
    
    const giangVienMoi = giangVienList.find(gv => gv.maGiangVien === maGiangVienMoi);
    if (giangVienMoi && giangVienMoi.soLuongHuongDan >= giangVienMoi.tongSoLuongToiDa) {
      message.warning('Giảng viên đã đủ số lượng hướng dẫn');
      return;
    }

    if (!sinhVien?.maGiangVien) {
      themPhanCong(maSinhVien, maGiangVienMoi);
    } else {
      suaPhanCong(maSinhVien, maGiangVienMoi, sinhVien.maGiangVien);
    }
  };

  const columns = [
    {
      title: 'Mã Sinh Viên',
      dataIndex: 'maSinhVien',
      key: 'maSinhVien',
      width:'10%'
    },
    {
      title: 'Tên Sinh Viên',
      dataIndex: 'tenSinhVien',
      key: 'tenSinhVien',
      width:'20%'
    },
    {
      title: 'Mã Lớp',
      dataIndex: 'maLop',
      key: 'maLop',
      width:'10%'
    },
    {
      title: 'Chọn Giảng Viên Hướng Dẫn',
      key: 'giangVienHuongDan',
      render: (record: SinhVien) => (
        <Select
          style={{ width: '100%' }}
          value={record.maGiangVien}
          placeholder="Chọn giảng viên"
          onChange={(value) => handleChangeGiangVien(record.maSinhVien, value)}
        >
          {giangVienList.map(gv => (
            <Option 
              key={gv.maGiangVien} 
              value={gv.maGiangVien}
              disabled={gv.soLuongHuongDan >= gv.tongSoLuongToiDa}
            >
              {`${gv.maGiangVien} - ${gv.tenGiangVien} - ${gv.soLuongHuongDan}/${gv.tongSoLuongToiDa}`}
            </Option>
          ))}
        </Select>
      ),
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

