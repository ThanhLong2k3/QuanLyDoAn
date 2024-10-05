import {ColumnType} from '../../QLDanhMucComponent/types';
import { Button, Space, Popconfirm,Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined,EyeOutlined,UnlockOutlined  } from '@ant-design/icons';
export const ColumLop: ColumnType[] = [
    {
      title: 'Tài Khoản',
      dataIndex: 'tk',
      key: 'tk',
    },
    {
      title: 'Họ Tên',
      dataIndex: 'ten',
      key: 'ten',
    },
    {
      title: 'Mô Tả',
      dataIndex: 'moTa',
      key: 'moTa',
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'trangThai',
      key: 'trangThai',
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
          <Tooltip title="Xem Quền">
            <Button type="primary" icon={<EyeOutlined />} />
          </Tooltip>
          <Tooltip title="Khôi phục mật khẩu">
            <Button type="primary" icon={<UnlockOutlined  />} />
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <Button type="primary" icon={<EditOutlined />} onClick={() => hienThiModal(banGhi)}/>
          </Tooltip>
          <Tooltip title="Xóa">
            <Popconfirm title="Bạn có chắc chắn muốn xóa?" onConfirm={() => xuLyXoa(banGhi.key)}>
              <Button type="primary" danger icon={<DeleteOutlined />}/>
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    });
  
    return cotCoBan;
  };
  export const CoLumNguoiDung = (hienThiModal: (banGhi: any) => void, xuLyXoa: (key: number) => void) =>
    taoCotBangnguoidung(ColumLop, hienThiModal, xuLyXoa);