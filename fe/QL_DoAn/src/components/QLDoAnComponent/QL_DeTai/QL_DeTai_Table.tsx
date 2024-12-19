import { Button, Space, Popconfirm, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ColumnType } from '../types';

export const CotDeTai: ColumnType[] = [
    {
      title: 'Mã đề tài',
      dataIndex: 'maDeTai',
      key: 'maDeTai',
      width: '10%',
    },
    {
      title: 'Tên đề tài',
      dataIndex: 'tenDeTai',
      key: 'tenDeTai',
      width: '12%',
    },
    {
      title: 'Tên đợt',
      dataIndex: 'tenDot',
      key: 'tenDot',
      width: '12%',
    },
    {
      title: 'Mô tả đề tài',
      dataIndex: 'moTa',
      key: 'moTa',
      width: '10%',
    },
    {
      title: 'Đề tài do sv đề xuất',
      dataIndex: 'tenSinhVien',
      key: 'maSinhVien',
      width: '10%',
    },
];

const taoCotBang = (
  danhSachCot: Array<ColumnType>, 
  hienThiModal: (banGhi: any) => void, 
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
          <Button type="primary" icon={<EditOutlined />} onClick={() => hienThiModal(banGhi)}/>
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

export const COLUMS = (hienThiModal: (banGhi: any) => void, xuLyXoa: (maDeTai: string) => void) =>
  taoCotBang(CotDeTai, hienThiModal, xuLyXoa);