import {ColumnType} from '../../QLDanhMucComponent/types';
import { Button, Space, Popconfirm,Tooltip } from 'antd';
import { EditOutlined, UnlockOutlined,EyeOutlined,CheckOutlined  } from '@ant-design/icons';
export const ColumLop: ColumnType[] = [
    {
      title: 'Tài Khoản',
      dataIndex: 'taiKhoan',
      key: 'taiKhoan',
    },
    {
      title: 'Họ Tên',
      dataIndex: 'hoTen',
      key: 'hoTen',
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
    kichHoat: (banGhi: any) => void, 
    khoiPhucMatKhau: (banGhi: any) => void
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
            <Button type="primary" icon={<UnlockOutlined  />} onClick={()=>khoiPhucMatKhau(banGhi)}/>
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <Button type="primary" icon={<EditOutlined />} onClick={() => hienThiModal(banGhi)}/>
          </Tooltip>
          <Tooltip title={banGhi.trangThai === "Đã Xét Duyệt" ? "Hủy kích hoạt" : "Kích hoạt"}>
            <Popconfirm title={banGhi.trangThai ==="Đã Xét Duyệt" ? "Bạn có chắc chắn muốn hủy kích hoạt tài khoản?" : "Bạn có chắc chắn muốn kích hoạt tài khoản?" }  onConfirm={() => kichHoat(banGhi)}>
              <Button type="primary" danger icon={<CheckOutlined />}/>
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    });
  
    return cotCoBan;
  };
  export const CoLumNguoiDung = (hienThiModal: (banGhi: any) => void, kichHoat: (banGhi: any) => void,khoiPhucMatKhau: (banGhi: any) => void) =>
    taoCotBangnguoidung(ColumLop, hienThiModal, kichHoat,khoiPhucMatKhau);