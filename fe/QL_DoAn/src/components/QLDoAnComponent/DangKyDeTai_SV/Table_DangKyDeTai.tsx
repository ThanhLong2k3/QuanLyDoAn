import { Button, Space, Popconfirm, Tooltip } from 'antd';
import { EyeFilled } from '@ant-design/icons';
import { ColumnType } from '../types';

export const DangKyDeTai_Sv: ColumnType[] = [
    {
      title: 'Tên đề tài',
      dataIndex: 'TenDeTai',
      key: 'MaDeTai',
      width: '20%',
    },
    {
      title: 'Tên giảng viên',
      dataIndex: 'tenGiangVien',
      key: 'tenGiangVien',
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
    {
      title: 'Số lượng SV đang hướng dẫn',
      dataIndex: 'dangHuongDan',
      key: 'dangHuongDan',
      width: '15%',
    },
];

const taoCotBang = (
  danhSachCot: Array<ColumnType>, 
  xuLyDangKy: (maDeTai: string) => void
) => {
  const cotCoBan = [...danhSachCot];

  cotCoBan.push({
    title: 'Thao tác',
    key: 'action',
    width: '10%',
    render: (_: any, banGhi: any) => (
      <Space size="middle">
        <Tooltip title="Đăng ký đề tài">
          <Popconfirm title="Bạn có chắc chắn muốn đăng ký?" onConfirm={() => xuLyDangKy(banGhi.MaDeTai)}>
            <Button type="primary" danger icon={<EyeFilled />}/>
          </Popconfirm>
        </Tooltip>
      </Space>
    ),
  });

  return cotCoBan;
};

export const COLUMS = (xuLyDangKy: (maDeTai: string) => void) =>
  taoCotBang(DangKyDeTai_Sv, xuLyDangKy);

