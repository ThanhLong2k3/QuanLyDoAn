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
    capNhapNguoiDung:(maNhomQuyen: string)=>void,
    PhanQuyen:(maNhomQuyen: string)=>void
  ) => {
    const cotCoBan = [...danhSachCot];
  
    cotCoBan.push({
      title: 'Thao tác',
      key: 'action',
      width:'20%',
      render: (_: any, banGhi: any) => (
        <Space size="middle">
          <Tooltip title="Thêm người dùng vào nhóm quyền">
            <Button type="primary" icon={<UserAddOutlined />} onClick={()=>capNhapNguoiDung(banGhi.maNhomQuyen)}/>
          </Tooltip>
          <Tooltip title="Phân Quyền">
            <Button type="primary" icon={<TeamOutlined />} onClick={()=> PhanQuyen(banGhi.maNhomQuyen)} />
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
  export const columNhomQuyen = (hienThiModal: (banGhi: any) => void, xuLyXoa: (maNhomQuyen: string) => void,capNhapNguoiDung:(maNhomQuyen: string)=> void,PhanQuyen:(maNhomQuyen:string)=>void)=>
    taoCotBangnguoidung(COLUMS, hienThiModal, xuLyXoa,capNhapNguoiDung,PhanQuyen);