import React from 'react';
import { Table, Typography } from 'antd';

const { Title } = Typography;

const columns = [
  {
    title: 'Mã khoa',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: 'Tên khoa',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Trưởng khoa',
    dataIndex: 'head',
    key: 'head',
  },
  {
    title: 'Số lượng sinh viên',
    dataIndex: 'studentCount',
    key: 'studentCount',
  },
];

const data = [
  {
    key: '1',
    code: 'CNTT',
    name: 'Công nghệ thông tin',
    head: 'TS. Nguyễn Văn A',
    studentCount: 500,
  },
  {
    key: '2',
    code: 'CK',
    name: 'Cơ khí',
    head: 'PGS.TS. Trần Văn B',
    studentCount: 450,
  },
  {
    key: '3',
    code: 'DT',
    name: 'Điện tử',
    head: 'TS. Lê Thị C',
    studentCount: 400,
  },
  {
    key: '4',
    code: 'KT',
    name: 'Kinh tế',
    head: 'PGS.TS. Phạm Văn D',
    studentCount: 600,
  },
  {
    key: '5',
    code: 'NN',
    name: 'Ngoại ngữ',
    head: 'TS. Hoàng Thị E',
    studentCount: 300,
  },
];

const Departments: React.FC = () => {
  return (
    <div>
      <Title level={2}>Quản lý Khoa</Title>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default Departments;

export {};