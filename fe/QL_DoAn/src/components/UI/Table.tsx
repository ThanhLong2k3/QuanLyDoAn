import { Button, Space, Popconfirm,Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined,EyeOutlined,UnlockOutlined  } from '@ant-design/icons';
import {ColumnType} from '../QLDanhMucComponent/types';


 const taoCotBang = (
  danhSachCot: Array<ColumnType>, 
  hienThiModal: (banGhi: any) => void, 
  xuLyXoa: (id: string) => void
) => {
  const cotCoBan = [...danhSachCot];

  cotCoBan.push({
    title: 'Thao tác',
    key: 'action',
    render: (_: any, banGhi: any) => (
      <Space size="middle">
        <Tooltip title="Sửa">
          <Button type="primary" icon={<EditOutlined />} onClick={() => hienThiModal(banGhi)}/>
        </Tooltip>
        <Tooltip title="Xóa">
          <Popconfirm title="Bạn có chắc chắn muốn xóa?" onConfirm={() => xuLyXoa(banGhi)}>
            <Button type="primary" danger icon={<DeleteOutlined />}/>
          </Popconfirm>
        </Tooltip>
      </Space>
    ),
  });

  return cotCoBan;
};

 
export const COLUMS = (colums:ColumnType[],hienThiModal: (banGhi: any) => void, xuLyXoa: (banGhi: any) => void) =>
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
