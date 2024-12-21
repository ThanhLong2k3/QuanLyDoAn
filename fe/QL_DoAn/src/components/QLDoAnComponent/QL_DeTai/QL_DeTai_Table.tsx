import { Button, Space, Popconfirm, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ColumnType } from '../types';

export const CotDeTai: ColumnType[] = [
  {
    title: 'STT',
    dataIndex: 'stt',
    key: 'stt',
    width: '10%',
  },
  {
    title: 'Tên đề tài',
    dataIndex: 'tenDeTai',
    key: 'tenDeTai',
    width: '10%',
  },
    {
      title: 'Hình thức',
      dataIndex: 'hinhThucBaoCaoBaoVe',
      key: 'hinhThucBaoCaoBaoVe',
      width: '12%',
    },
    {
      title: 'Mô tả ',
      dataIndex: 'moTa',
      key: 'moTa',
      width: '10%',
    },
    {
      title: 'Sinh viên đăng ký',
      dataIndex: 'sinhVienDangKy',
      key: 'sinhVienDangKy',
      width: '10%',
    },
    {
      title: 'Đề tài do sv đề xuất',
      dataIndex: 'sinhVienDeXuat',
      key: 'sinhVienDeXuat',
      width: '10%',
    },
];

const taoCotBang = (
  danhSachCot: Array<ColumnType>, 
  Showmodal: (banGhi: any) => void, 
  xuLyXoa: (maDeTai: string) => void
) => {
  const cotCoBan = [...danhSachCot];

  cotCoBan.push({
    title: 'Thao tác',
    key: 'action',
    width: '10%',
    render: (_: any, banGhi: any) => (
      <Space size="middle">
        <Tooltip title="Sửa">
          <Button type="primary" icon={<EditOutlined />} onClick={() => Showmodal(banGhi)}/>
        </Tooltip>
        <Tooltip title="Xóa">
          <Popconfirm title="Bạn có chắc chắn muốn xóa?" onConfirm={() => xuLyXoa(banGhi.maDeTai)}>
            <Button type="primary" danger icon={<DeleteOutlined />}/>
          </Popconfirm>
        </Tooltip>
      </Space>
    ),
  });

  return cotCoBan;
};

export const COLUMSDETAI = (Showmodal: (banGhi: any) => void, xuLyXoa: (maDeTai: string) => void) =>
  taoCotBang(CotDeTai, Showmodal, xuLyXoa);