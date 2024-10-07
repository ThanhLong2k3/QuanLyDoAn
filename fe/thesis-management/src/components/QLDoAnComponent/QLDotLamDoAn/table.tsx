import { ColumnType } from '../types';
import { Button, Space, Popconfirm, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, UserAddOutlined, TeamOutlined, FileExcelOutlined } from '@ant-design/icons';

export const DotLamDoAn: ColumnType[] = [
  {
    title: 'Mã đợt',
    dataIndex: 'maDot',
    key: 'maDot',
  },
  {
    title: 'Tên đợt',
    dataIndex: 'tenDot',
    key: 'tenDot',
  },
  {
    title: 'Ngày bắt đầu làm đồ án',
    dataIndex: 'ngayBatDau',
    key: 'ngayBatDau',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'trangThai',
    key: 'trangThai',
  },
  {
    title: 'Năm áp dụng',
    dataIndex: 'namApDung',
    key: 'namApDung',
  },
];

const taoCotBangnguoidung = (
  danhSachCot: Array<ColumnType>, 
  hienThiModal: (banGhi: any) => void, 
  xuLyXoa: (key: number) => void
) => {
  const cotCoBan = [...danhSachCot];

  cotCoBan.push({
    title: 'Thao tác',
    key: 'action',
    render: (_: any, banGhi: any) => (
      <Space size="middle">
        <Tooltip title="Xuất ra Excel">
          <Button type="primary" icon={<FileExcelOutlined />} />
        </Tooltip>
        <Tooltip title="Thêm giảng viên vào đợt làm đồ án">
          <Button type="primary" icon={<UserAddOutlined />} />
        </Tooltip>
        <Tooltip title="Thêm sinh viên vào đợt làm đồ án">
          <Button type="primary" icon={<TeamOutlined />} />
        </Tooltip>
        <Tooltip title="Chỉnh sửa">
          <Button type="primary" icon={<EditOutlined />} onClick={() => hienThiModal(banGhi)}/>
        </Tooltip>
        <Popconfirm title="Bạn có chắc chắn muốn xóa?" onConfirm={() => xuLyXoa(banGhi.key)}>
          <Tooltip title="Xóa">
            <Button type="primary" danger icon={<DeleteOutlined />} />
          </Tooltip>
        </Popconfirm>
      </Space>
    ),
  });

  return cotCoBan;
};

export const columNhomQuyen = (hienThiModal: (banGhi: any) => void, xuLyXoa: (key: number) => void) =>
  taoCotBangnguoidung(DotLamDoAn, hienThiModal, xuLyXoa);