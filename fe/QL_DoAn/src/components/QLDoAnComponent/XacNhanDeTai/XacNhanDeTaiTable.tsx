import { Button, Space, Popconfirm, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ColumnType } from '../types';

export const CotDeTai: ColumnType[] = [
    {
      title: 'Mã sinh viên',
      dataIndex: 'maSinhVien',
      key: 'maSinhVien',
    },
    {
      title: 'Tên sinh viên',
      dataIndex: 'tenSinhVien',
      key: 'tenSinhVien',
    },
    {
      title: 'Điểm tổng kết',
      dataIndex: 'diemTongKet',
      key: 'diemTongKet',
    },
    {
      title: 'Mã giảng viên',
      dataIndex: 'maGiangVien',
      key: 'maGiangVien',
    },
    {
      title: 'Tên giảng viên',
      dataIndex: 'tenGiangVien',
      key: 'tenGiangVien',
    },
    {
      title: 'Mã lớp',
      dataIndex: 'maLop',
      key: 'maLop',
    },
    {
      title: 'Tên đề tài',
      dataIndex: 'tenDeTai',
      key: 'tenDeTai',
      align: 'center',
    },
    {
      title: 'Tác vụ',
      dataIndex: 'tacVu',
      key: 'tacVu',
    },
];

const taoCotBang = (
  danhSachCot: Array<ColumnType>, 
  DongY: (banGhi: any) => void, 
  KhongDongY: (banGhi: any) => void
) => {
  const cotCoBan = [...danhSachCot];

  cotCoBan.push({
    title: 'Thao tác',
    key: 'action',
    width: '10%',
    render: (_: any, banGhi: any) => (
      <Space size="middle">
        <Tooltip title="Đồng ý">
          <Button type="primary" icon={<EditOutlined />} onClick={() => DongY(banGhi)}/>
        </Tooltip>
        <Tooltip title="Xóa">
          <Popconfirm title="Không đồng ý?" onConfirm={() => KhongDongY(banGhi)}>
            <Button type="primary" danger icon={<DeleteOutlined />}/>
          </Popconfirm>
        </Tooltip>
      </Space>
    ),
  });

  return cotCoBan;
};

export const Table_XacNhanDeTai = (DongY: (banGhi: any) => void, KhongDongY: (banGhi: any)  => void) =>
  taoCotBang(CotDeTai, DongY, KhongDongY);