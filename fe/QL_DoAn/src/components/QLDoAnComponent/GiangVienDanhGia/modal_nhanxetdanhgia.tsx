import { useState } from "react";
import { Form, Button, Table, message } from "antd";
import { BAO_CAO_TUAN, WeekReport } from "../../InterFace";
import { EditOutlined } from "@ant-design/icons";
import FormTeacherReport from "./form_giangviendanhgia";
import moment from "moment";
import { editBaoCaoTuan } from "../../../sevices/Api/QL_DoAn/BaoCaoTuan-services";

interface formProps {
  sortedData: WeekReport[];
  loader:any;
}

const ModalTeacherReport = ({ sortedData,loader }: formProps) => {
  const [form] = Form.useForm();
  const [editingIndex, setEditingIndex] = useState<number | null>(null); 
  const [currenReport, setcurrenReport] = useState<any | null>(null); 


  const setCurenWeek=(week:number,report:any)=>{
    setEditingIndex(week);
    setcurrenReport(report);
    console.log("report",currenReport);
    message.success(`Bạn đã chọn tuần ${week+1}`);
  }
  const columns = [
    { title: "STT", dataIndex: "soTuan", key: "soTuan", width: 60 },
    {
      title: "Tuần",
      dataIndex: "soTuan",
      key: "soTuan",
      width: 80,
      render: (id: number) => <span> Tuần {id}</span>,
    },
    { title: "Nội dung theo tuần", dataIndex: "congViec", key: "congViec" ,width:250},
    {
      title: "Đường dẫn",
      dataIndex: "duongDanBaoCao",
      key: "duongDanBaoCao",
      width: 120,
      render: (text: string) =>
        text ? (
          <a href={text} target="_blank" rel="noopener noreferrer">
            Xem báo cáo
          </a>
        ) : null,
    },
    {
      title: "Nhận xét",
      dataIndex: "nhanXetCuaGiangVien",
      key: "nhanXetCuaGiangVien",
    },
    {
      title: "Đánh giá của tuần",
      dataIndex: "diem",
      key: "diem",
      width: 150,
    },
    {
      title: "Tác vụ",
      key: "action",
      width: 80,
      render: (_: any, record: any, index: number) => {
        return (
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => setCurenWeek(index,record)} 
          />
        );
      },
    },
  ];
  const handleFinish = async (values: any) => {
    const newData: BAO_CAO_TUAN = {
      maDeTai: currenReport.maDeTai,
      soTuan: values.weekId,
      tuNgay: moment(values.fromDate).toISOString(),
      denNgay: moment(values.toDate).toISOString(),
      congViec: values.work,
      noiDungThucHien: values.taskContent,
      noiDungBaoCao: values.report_content,
      ketQuaDatDuoc: values.result,
      duongDanBaoCao: values.reportUrl,
      nhanXetCuaGiangVien: values.nhanXetCuaGiangVien,
      diem: values.diem || null,
      maBaoCao: currenReport.maBaoCao,
    };
    console.log(newData);
    await editBaoCaoTuan(newData, loader);
  };
  return (
    <>
      {editingIndex !== null && (
        <FormTeacherReport
          form={form}
          dataSource={sortedData}
          currentWeekIndex={editingIndex}
          onFinish={handleFinish}
        />
      )}
      <Table
        dataSource={sortedData}
        columns={columns}
        pagination={false}
        size="small"
        bordered
        rowKey={(record) => record.id}
      />
    </>
  );
};

export default ModalTeacherReport;
