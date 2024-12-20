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
    khoiPhucMatKhau: (banGhi: any) => void,
    ShowQuyen:(taiKhoan:string)=>void
  ) => {
    const cotCoBan = [...danhSachCot];
  
    cotCoBan.push({
      title: 'Thao tác',
      key: 'action',
      width:'20%',
      render: (_: any, banGhi: any) => (
        <Space size="middle">
          <Tooltip title="Xem Nhóm Quyền">
            <Button type="primary" icon={<EyeOutlined />}  onClick={()=>ShowQuyen(banGhi.taiKhoan)}/>
          </Tooltip>
          <Tooltip title="Khôi phục mật khẩu">
            <Button type="primary" icon={<UnlockOutlined  />} onClick={()=>khoiPhucMatKhau(banGhi)}/>
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <Button type="primary" icon={<EditOutlined />} onClick={() => hienThiModal(banGhi)}/>
          </Tooltip>
          <Tooltip title={banGhi.trangThai === "Đã xét duyệt" ? "Hủy kích hoạt" : "Kích hoạt"}>
            <Popconfirm title={banGhi.trangThai ==="Đã xét duyệt" ? "Bạn có chắc chắn muốn hủy kích hoạt tài khoản?" : "Bạn có chắc chắn muốn kích hoạt tài khoản?" }  onConfirm={() => kichHoat(banGhi)}>
              <Button type="primary" danger icon={<CheckOutlined />}/>
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    });
  
    return cotCoBan;
  };
  export const CoLumNguoiDung = (hienThiModal: (banGhi: any) => void, kichHoat: (banGhi: any) => void,khoiPhucMatKhau: (banGhi: any) => void,ShowQuyen:(taiKhoan:string)=>void) =>
    taoCotBangnguoidung(ColumLop, hienThiModal, kichHoat,khoiPhucMatKhau,ShowQuyen);