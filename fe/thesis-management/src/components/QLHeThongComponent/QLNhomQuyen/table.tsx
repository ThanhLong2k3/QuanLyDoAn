import {ColumnType} from '../../QLDanhMucComponent/types';
import { Button, Space, Popconfirm,Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined,UserAddOutlined,TeamOutlined  } from '@ant-design/icons';
export const COLUMS: ColumnType[] = [
    {
      title: 'Mã Nhóm Quyền',
      dataIndex: 'maNhomQuyen',
      key: 'maNhomQuyen',
    },
    {
      title: 'Tên Nhóm Quyền',
      dataIndex: 'tenNhomQuyen',
      key: 'tenNhomQuyen',
    },
    {
      title: 'Số Lượng',
      dataIndex: 'soLuong',
      key: 'soLuong',
      align:'right',
    },
    {
      title: 'Mô Tả',
      dataIndex: 'moTa',
      key: 'moTa',
    },
    {
        title: 'Loại',
        dataIndex: 'loai',
        key: 'loai',
    },

  ];
  const taoCotBangnguoidung = (
    danhSachCot: Array<ColumnType>, 
    hienThiModal: (banGhi: any) => void, 
    xuLyXoa: (maNhomQuyen: string) => void,
    capNhapNguoiDung:()=>void
  ) => {
    const cotCoBan = [...danhSachCot];
  
    cotCoBan.push({
      title: 'Thao tác',
      key: 'action',
      render: (_: any, banGhi: any) => (
        <Space size="middle">
          <Tooltip title="Thêm người dùng">
            <Button type="primary" icon={<UserAddOutlined />} onClick={()=>capNhapNguoiDung()}/>
          </Tooltip>
          <Tooltip title="Thành viên nhóm">
            <Button type="primary" icon={<TeamOutlined />} />
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <Button type="primary" icon={<EditOutlined />} onClick={() => hienThiModal(banGhi)}/>
          </Tooltip>
          <Popconfirm title="Bạn có chắc chắn muốn xóa?" onConfirm={() => xuLyXoa(banGhi.maNhomQuyen)}>
            <Tooltip title="Xóa">
              <Button type="primary" danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    });
  
    return cotCoBan;
  
  };
  export const columNhomQuyen = (hienThiModal: (banGhi: any) => void, xuLyXoa: (maNhomQuyen: string) => void,capNhapNguoiDung:()=> void) =>
    taoCotBangnguoidung(COLUMS, hienThiModal, xuLyXoa,capNhapNguoiDung);