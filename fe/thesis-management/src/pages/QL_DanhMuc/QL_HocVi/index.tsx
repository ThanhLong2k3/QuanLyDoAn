import React, { useState, useEffect } from "react";
import {
  Card,
  Table,
  Button,
  Form,
  Space,
  Popconfirm,
  message,
  Row,
  Col,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { HocVi } from "../../../components/InterFace";
import ReusableModal from "../../../components/UI/Modal";
import formHocVi from "../../../components/QLDanhMuc/QL_HocVi/QL_HocViForm";

const hocViBanDau: HocVi[] = [
  {
    key: 1,
    ma: "TS",
    ten: "Tiến sĩ",
    kyHieu: "Dr.",
    moTa: "Bậc học vị cao nhất",
    soLuongHuongDan: 10,
  },
  {
    key: 2,
    ma: "ThS",
    ten: "Thạc sĩ",
    kyHieu: "M.",
    moTa: "Bậc học vị sau đại học",
    soLuongHuongDan: 5,
  },
];

const QuanLyHocVi: React.FC = () => {
  const [hocVi, setHocVi] = useState<HocVi[]>(hocViBanDau);
  const [hienModal, setHienModal] = useState(false);
  const [form] = Form.useForm();
  const [keyDangSua, setKeyDangSua] = useState<number | null>(null);
  const [cacDongDaChon, setCacDongDaChon] = useState<React.Key[]>([]);

  useEffect(() => {
    const hocViLuuTru = localStorage.getItem("utehy_hocvi");
    if (hocViLuuTru) {
      setHocVi(JSON.parse(hocViLuuTru));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("utehy_hocvi", JSON.stringify(hocVi));
  }, [hocVi]);

  const hienThiModal = (banGhi?: HocVi) => {
    form.resetFields();
    if (banGhi) {
      form.setFieldsValue(banGhi);
      setKeyDangSua(banGhi.key);
    } else {
      setKeyDangSua(null);
    }
    setHienModal(true);
  };

  const xuLyDongY = () => {
    form.validateFields().then((giaTri) => {
      if (keyDangSua !== null) {
        setHocVi((hocViCu) =>
          hocViCu.map((item) =>
            item.key === keyDangSua ? { ...item, ...giaTri } : item
          )
        );
      } else {
        const hocViMoi: HocVi = {
          key: Date.now(),
          ...giaTri,
        };
        setHocVi((hocViCu) => [...hocViCu, hocViMoi]);
      }
      setHienModal(false);
      form.resetFields();
      setKeyDangSua(null);
      message.success("Học vị đã được lưu thành công!");
    });
  };

  const xuLyXoa = (key: number) => {
    setHocVi((hocViCu) => hocViCu.filter((item) => item.key !== key));
    message.success("Học vị đã được xóa thành công!");
  };

  const xuLyXoaNhieu = () => {
    setHocVi((hocViCu) =>
      hocViCu.filter((item) => !cacDongDaChon.includes(item.key))
    );
    setCacDongDaChon([]);
    message.success(`${cacDongDaChon.length} học vị đã được xóa thành công!`);
  };

  const cotBang = [
    {
      title: "Mã học vị",
      dataIndex: "ma",
      key: "ma",
    },
    {
      title: "Tên học vị",
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: "Ký hiệu",
      dataIndex: "kyHieu",
      key: "kyHieu",
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      key: "moTa",
    },
    {
      title: "Số lượng hướng dẫn",
      dataIndex: "soLuongHuongDan",
      key: "soLuongHuongDan",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_: any, banGhi: HocVi) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => hienThiModal(banGhi)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={() => xuLyXoa(banGhi.key)}
          >
            <Button type="primary" danger icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const chonDong = (cacKeyChon: React.Key[]) => {
    setCacDongDaChon(cacKeyChon);
  };

  const luaChonDong = {
    selectedRowKeys: cacDongDaChon,
    onChange: chonDong,
  };

  return (
    <div style={{ padding: "24px" }}>
      <Row gutter={16} justify="center" style={{ marginBottom: "24px" }}>
        <Col xl={24} xs={24} sm={24} md={24} lg={24} >
        <h1 style={{ textAlign: "center", color: "#1890ff",fontWeight:'bold' }}>Quản lý danh mục học vị</h1>
        </Col>
      </Row>
      <Card
        style={{ width: "100%" }}
        title="Danh sách Học vị"
        extra={
          <Button
            type="primary"
            onClick={() => hienThiModal()}
            icon={<PlusOutlined />}
          >
            Thêm Học vị mới
          </Button>
        }
      >
        {cacDongDaChon.length > 0 && (
          <Popconfirm
            title={`Bạn có chắc chắn muốn xóa ${cacDongDaChon.length} học vị đã chọn?`}
            onConfirm={xuLyXoaNhieu}
          >
            <Button type="primary" danger>
              Xóa {cacDongDaChon.length} mục đã chọn
            </Button>
          </Popconfirm>
        )}
        <Table
          rowSelection={luaChonDong}
          columns={cotBang}
          dataSource={hocVi}
          rowKey="key"
          scroll={{ x: 768 }}
        />
      </Card>
      <ReusableModal
        visible={hienModal}
        onOk={xuLyDongY}
        onCancel={() => setHienModal(false)}
        keyDangSua={keyDangSua}
        add_Titel="Thêm Học vị mới"
        update_Titel="Chỉnh sửa Học vị"
      >
        <formHocVi formdulieu={form} />
      </ReusableModal> 
    </div>
  );
};

export default QuanLyHocVi;
