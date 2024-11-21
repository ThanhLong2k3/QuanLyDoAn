import { Button, Space, Popconfirm,Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined  } from '@ant-design/icons';

import {ColumnType} from '../types';
export const CotGiangVien: ColumnType[] = [
    {
      title: 'Mã giảng viên',
      dataIndex: 'maGiangVien',
      key: 'maGiangVien',
    },
    {
      title: 'Tên giảng viên',
      dataIndex: 'tenGiangVien',
      key: 'tenGiangVien',
    },
    {
      title: 'Tên bộ môn',
      dataIndex: 'tenBoMon',
      key: 'tenBoMon',
    },
    {
      title: 'Chức vụ',
      dataIndex: 'chucVu',
      key: 'chucVu',
    },
    {
        title: 'Học vị',
        dataIndex: 'tenHocVi',
        key: 'tenHocVi',
    },
    {
        title: 'Học hàm',
        dataIndex: 'tenHocHam',
        key: 'tenHocHam',
    },
    {
        title: 'SDT',
        dataIndex: 'sDT',
        key: 'sDT',
        align:'center'
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
  ];
  const taoCotBang = (
    danhSachCot: Array<ColumnType>, 
    hienThiModal: (banGhi: any) => void, 
    xuLyXoa: (maGiangVien: string) => void
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
            <Popconfirm title="Bạn có chắc chắn muốn xóa?" onConfirm={() => xuLyXoa(banGhi.maGiangVien)}>
              <Button type="primary" danger icon={<DeleteOutlined />}/>
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    });
  
    return cotCoBan;
  };
  
   
  export const COLUMS = (hienThiModal: (banGhi: any) => void, xuLyXoa: (maGiangVien: string) => void) =>
    taoCotBang(CotGiangVien, hienThiModal, xuLyXoa);