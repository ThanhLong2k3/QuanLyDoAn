import { Button, Space, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined,EyeOutlined,UnlockOutlined  } from '@ant-design/icons';
import {ColumnType} from '../QLDanhMuc/types';


 const taoCotBang = (
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

 
export const COLUMS = (colums:ColumnType[],hienThiModal: (banGhi: any) => void, xuLyXoa: (key: number) => void) =>
  taoCotBang(colums, hienThiModal, xuLyXoa);



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
        <Button type="primary" icon={<EyeOutlined />} />
        <Button type="primary" icon={<UnlockOutlined  />} />
        <Button type="primary" icon={<EditOutlined />} onClick={() => hienThiModal(banGhi)}/>
        <Popconfirm title="Bạn có chắc chắn muốn xóa?" onConfirm={() => xuLyXoa(banGhi.key)}>
          <Button type="primary" danger icon={<DeleteOutlined />}/>
        </Popconfirm>
      </Space>
    ),
  });

  return cotCoBan;
};
export const CoLumNguoiDung = (colums:ColumnType[],hienThiModal: (banGhi: any) => void, xuLyXoa: (key: number) => void) =>
  taoCotBangnguoidung(colums, hienThiModal, xuLyXoa);