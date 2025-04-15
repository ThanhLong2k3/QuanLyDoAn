import { ColumnType } from '../types';
import { Button, Space, Tooltip } from 'antd';
import { EyeOutlined, CommentOutlined } from '@ant-design/icons';
const ColumTeacherReport: ColumnType[] = [
  {
    title: 'Tên nhóm',
    dataIndex: 'tenNhom',
    key: 'tenNhom',
  },
  {
    title: 'Tên đợt',
    dataIndex: 'tenDot',
    key: 'tenDot',
    width:'100px'
  },
  {
    title: 'Tên trưởng nhóm',
    dataIndex: 'tenTruongNhom',
    key: 'tenTruongNhom',
    width:'200px'
  },
  {
    title: 'Số thành viên',
    dataIndex: 'soThanhVien',
    key: 'soThanhVien',
    width:'150px',
    align:'center'
  },
  {
    title: 'Tên đề tài',
    dataIndex: 'tenDeTai',
    key: 'tenDeTai',
  },
];

const taocotbangTeacherReport = (
  danhSachCot: Array<ColumnType>, 
  XemChiTiet: (banGhi: any) => void,
  DanhGia_NhanXet:(banGhi: any)=>void,
) => {
  const cotCoBan = [...danhSachCot];

  cotCoBan.push({
    title: 'Thao tác',
    key: 'action',
    width:'10%',
    render: (_: any, banGhi: any) => (
      <Space size="middle">
        <Tooltip title="Xem chi tiết đề tài">
          <Button type="primary" icon={<EyeOutlined />} onClick={()=> XemChiTiet(banGhi)} />
        </Tooltip>
        <Tooltip title="Đánh giá nhận xét">
          <Button type="primary" icon={<CommentOutlined />} onClick={()=>DanhGia_NhanXet(banGhi)}/>
        </Tooltip>
      </Space>
    ),
  });

  return cotCoBan;
};

export const columTeacherReport = (XemChiTiet: (banGhi: any) => void, DanhGia_NhanXet: (banGhi: any) => void) =>
  taocotbangTeacherReport(ColumTeacherReport, XemChiTiet, DanhGia_NhanXet);