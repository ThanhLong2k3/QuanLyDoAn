import { Button, Space, Popconfirm, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ColumnType } from '../types';

export const DangKyDeTai_Sv: ColumnType[] = [
    {
      title: 'Tên đề tài',
      dataIndex: 'tenDeTai',
      key: 'maDeTai',
      width: '20%',
    },
    {
      title: 'Tên giảng viên',
      dataIndex: 'tenGiangVien',
      key: 'maGiangVien',
      width: '15%',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'sDT',
      key: 'sDT',
      width: '15%',
    },
    {
      title: 'Mô tả',
      dataIndex: 'moTa',
      key: 'moTa',
      width: '25%',
    },
    {
      title: 'Số lượng đang hướng dẫn',
      dataIndex: 'huongdan',
      key: 'huongdan',
      width: '15%',
    },
];

const taoCotBang = (
  danhSachCot: Array<ColumnType>, 
  xuLyDangKy: (banghi:any) => void
) => {
  const cotCoBan = [...danhSachCot];

  cotCoBan.push({
    title: 'Thao tác',
    key: 'action',
    width: '10%',
    render: (_: any, banGhi: any) => (
      <Space size="middle">
          <Popconfirm title="Bạn có chắc chắn muốn đăng ký?" onConfirm={() => xuLyDangKy(banGhi)}>
            <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  className="bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600"
                >
                  Đăng ký đề tài
                </Button>
          </Popconfirm>
      </Space>
    ),
  });

  return cotCoBan;
};

export const COLUMS = (xuLyDangKy: (banghi:any) => void) =>
  taoCotBang(DangKyDeTai_Sv, xuLyDangKy);

