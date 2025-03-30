import { Button, Space, Popconfirm, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined, EyeTwoTone } from "@ant-design/icons";
import { ColumnType } from "../types";

export const CotDeTai: ColumnType[] = [
  {
    title: "Tên Nhóm",
    dataIndex: "tenNhom",
    key: "maNhom",
  },
  {
    title: "Tên trưởng nhóm",
    dataIndex: "tenSinhVien",
    key: "tenSinhVien",
  },

  {
    title: "Mã lớp",
    dataIndex: "maLop",
    key: "maLop",
  },
  {
    title: "Tên đề tài",
    dataIndex: "tenDeTai",
    key: "maDeTai",
    align: "center",
  },
  {
    title: "Tác vụ",
    dataIndex: "tacVu",
    key: "tacVu",
    align: "center",
    render: (record) => {
      return <Button type="primary" icon={<EyeTwoTone />} />;
    },
  },
];

const taoCotBang = (
  danhSachCot: Array<ColumnType>,
  DongY: (banGhi: any) => void,
  KhongDongY: (banGhi: any) => void
) => {
  const cotCoBan = [...danhSachCot];

  cotCoBan.push({
    title: "Thao tác",
    key: "action",
    width: "10%",
    render: (_: any, banGhi: any) => (
      <Space size="middle">
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => DongY(banGhi)}
        >
          Đồng ý
        </Button>

        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          onClick={() => KhongDongY(banGhi)}
        >
          Từ chối
        </Button>
      </Space>
    ),
  });

  return cotCoBan;
};

export const Table_XacNhanDeTai = (
  DongY: (banGhi: any) => void,
  KhongDongY: (banGhi: any) => void
) => taoCotBang(CotDeTai, DongY, KhongDongY);
