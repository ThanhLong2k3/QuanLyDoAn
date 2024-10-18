import { Button, Space, Popconfirm,Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined  } from '@ant-design/icons';

import {ColumnType} from '../types';
 const cotLop: ColumnType[] = [
    {
      title: 'Mã Lớp',
      dataIndex: 'maLop',
      key: 'maLop',
    },
    {
      title: 'Tên Lớp',
      dataIndex: 'tenLop',
      key: 'tenLop',
    },
    {
      title: 'Tên chuyên ngành',
      dataIndex: 'tenChuyenNganh',
      key: 'tenChuyenNganh',
    },
    {
      title: 'Khóa học',
      dataIndex: 'khoaHoc',
      key: 'KhoaHoc',
    },
    
  ];
  
  const taoCotBang = (
    danhSachCot: Array<ColumnType>, 
    hienThiModal: (banGhi: any) => void, 
    xuLyXoa: (maLop: string) => void
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
            <Popconfirm title="Bạn có chắc chắn muốn xóa?" onConfirm={() => xuLyXoa(banGhi.maLop)}>
              <Button type="primary" danger icon={<DeleteOutlined />}/>
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    });
  
    return cotCoBan;
  };
  
   
  export const COLUMS = (hienThiModal: (banGhi: any) => void, xuLyXoa: (maLop: string) => void) =>
    taoCotBang(cotLop, hienThiModal, xuLyXoa);
  
  