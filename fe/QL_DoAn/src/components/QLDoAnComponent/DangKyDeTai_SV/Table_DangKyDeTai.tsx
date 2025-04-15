import { Button, Space, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ColumnType } from '../types';

export const DangKyDeTai_Sv: ColumnType[] = [
    {
      title: 'Tên đề tài',
      dataIndex: 'tenDeTai',
      key: 'maDeTai',
      width: '20%',
    },
    {
      title: 'Tên giảng viên',
      dataIndex: 'tenGiangVien',
      key: 'maGiangVien',
      width: '15%',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'sDT',
      key: 'sDT',
      width: '15%',
    },
    {
      title: 'Mô tả',
      dataIndex: 'moTa',
      key: 'moTa',
      width: '25%',
    },
];

const taoCotBang = (
  danhSachCot: Array<ColumnType>, 
) => {
  const cotCoBan = [...danhSachCot];
  return cotCoBan;
};

export const COLUMS = () =>
  taoCotBang(DangKyDeTai_Sv);

