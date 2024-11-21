import { Button, Space, Popconfirm,Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {ColumnType} from '../types';
import moment from 'moment';
export const CotSinhVien: ColumnType[] = [
    {
      title: 'Mã sinh viên',
      dataIndex: 'maSinhVien',
      key: 'maSinhVien',
    },
    {
      title: 'Tên sinh viên',
      dataIndex: 'tenSinhVien',
      key: 'tenSinhVien',
    },
    {
      title: 'Mã Lớp',
      dataIndex: 'maLop',
      key: 'maLop',
    },
    {
        title: 'Ngày sinh',
        dataIndex: 'ngaySinh',
        key: 'ngaySinh',
        render: (text) => <span>{moment(text).format('DD/MM/YYYY')}</span>,
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Giới tính',
        dataIndex: 'gioiTinh',
        key: 'gioiTinh',
    },
    {
        title: 'SDT',
        dataIndex: 'sDT',
        key: 'sDT',
    },
  ];
  const taoCotBang = (
    danhSachCot: Array<ColumnType>, 
    hienThiModal: (banGhi: any) => void, 
    xuLyXoa: (maSinhVien: string) => void
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
            <Popconfirm title="Bạn có chắc chắn muốn xóa?" onConfirm={() => xuLyXoa(banGhi.maSinhVien)}>
              <Button type="primary" danger icon={<DeleteOutlined />}/>
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    });
  
    return cotCoBan;
  };
  
   
  export const COLUMS = (hienThiModal: (banGhi: any) => void, xuLyXoa: (maSinhVien: string) => void) =>
    taoCotBang(CotSinhVien, hienThiModal, xuLyXoa);