import { Button, Space, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

// Định nghĩa kiểu cho cột, bao gồm render
type ColumnType = {
  title: string;
  dataIndex?: string;
  key: string;
  render?: (text: any, record: any) => JSX.Element; 
};

// Hàm tạo cột chung
const taoCotBang = (
  danhSachCot: Array<ColumnType>, 
  hienThiModal: (banGhi: any) => void, 
  xuLyXoa: (key: string) => void
) => {
  const cotCoBan = [...danhSachCot];

  cotCoBan.push({
    title: 'Thao tác',
    key: 'action',
    render: (_: any, banGhi: any) => (
      <Space size="middle">
        <Button type="primary" icon={<EditOutlined />} onClick={() => hienThiModal(banGhi)}>
          Sửa
        </Button>
        <Popconfirm title="Bạn có chắc chắn muốn xóa?" onConfirm={() => xuLyXoa(banGhi.key)}>
          <Button type="primary" danger icon={<DeleteOutlined />}>
            Xóa
          </Button>
        </Popconfirm>
      </Space>
    ),
  });

  return cotCoBan;
};

// Ví dụ các cột cho bảng học vị
const cotHocVi: ColumnType[] = [
  {
    title: 'Mã học vị',
    dataIndex: 'ma',
    key: 'ma',
  },
  {
    title: 'Tên học vị',
    dataIndex: 'ten',
    key: 'ten',
  },
  {
    title: 'Ký hiệu',
    dataIndex: 'kyHieu',
    key: 'kyHieu',
  },
  {
    title: 'Mô tả',
    dataIndex: 'moTa',
    key: 'moTa',
  },
  {
    title: 'Số lượng hướng dẫn',
    dataIndex: 'soLuongHuongDan',
    key: 'soLuongHuongDan',
  },
];

// Ví dụ các cột cho bảng nhân viên
const cotNhanVien: ColumnType[] = [
  {
    title: 'Mã nhân viên',
    dataIndex: 'maNhanVien',
    key: 'maNhanVien',
  },
  {
    title: 'Tên nhân viên',
    dataIndex: 'tenNhanVien',
    key: 'tenNhanVien',
  },
  {
    title: 'Phòng ban',
    dataIndex: 'phongBan',
    key: 'phongBan',
  },
  {
    title: 'Chức vụ',
    dataIndex: 'chucVu',
    key: 'chucVu',
  },
];

// Xuất cột cho bảng học vị
export const cotBangHocVi = (hienThiModal: (banGhi: any) => void, xuLyXoa: (key: string) => void) =>
  taoCotBang(cotHocVi, hienThiModal, xuLyXoa);

// Xuất cột cho bảng nhân viên
export const cotBangNhanVien = (hienThiModal: (banGhi: any) => void, xuLyXoa: (key: string) => void) =>
  taoCotBang(cotNhanVien, hienThiModal, xuLyXoa);
