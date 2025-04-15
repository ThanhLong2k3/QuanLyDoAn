import  { useEffect, useState, useCallback, useMemo } from "react";
import {
  Layout,
  Form,
  Button,
  Table,
  Space,
  Card,
  Typography,
  message,
  Select,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import "./IndustryReportPage.scss";
import moment from "moment";
import { get_GROUP_ID } from "../../../sevices/Api/QL_DoAn/QL_NhomSinhVien";
import { BAO_CAO_TUAN, WeekReport } from "../../../components/InterFace";
import {
  addBaoCaoTuan,
  editBaoCaoTuan,
  get_BaoCao_MaDeTai,
} from "../../../sevices/Api/QL_DoAn/BaoCaoTuan-services";
import ReportForm from "../../../components/QLDoAnComponent/BaoCaoTuan/Form_BaoCaoTuan";

const { Content } = Layout;
const { Title, Text } = Typography;




// Hàm điền form từ dữ liệu của tuần báo cáo
const fillFormFromWeekData = (form: any, record: WeekReport) => {
  form.setFieldsValue({
    weekId: record.id,
    work: record.work,
    taskContent: record.taskContent,
    result: record.result,
    report_content: record.content,
    reportUrl: record.url,
    fromDate: moment(record.fromDate, "DD/MM/YYYY"),
    toDate: moment(record.toDate, "DD/MM/YYYY"),
    name: record.title,
  });
};

// Hàm sinh các tuần báo cáo dựa vào ngày bắt đầu
const generateWeeks = (startDate: string) => {
  const weeks: WeekReport[] = [];
  const start = moment(startDate, "MM/DD/YYYY hh:mm:ss A");
  const now = moment();
  const diffDays = now.diff(start, "days");
  const numWeeks = Math.ceil((diffDays + 1) / 7);
  let currentIndex = -1;

  for (let i = 0; i < numWeeks; i++) {
    const fromDate = start.clone().add(i * 7, "days");
    const toDate = fromDate.clone().add(6, "days");

    if (
      now.isBetween(
        fromDate.startOf("day"),
        toDate.endOf("day"),
        undefined,
        "[]"
      )
    ) {
      currentIndex = i;
    }

    weeks.push({
      key: `${i + 1}`,
      id: i+1,
      title: `Báo cáo tiến độ tuần ${i + 1}`,
      content: "",
      work: "",
      taskContent: "",
      result: "",
      url: "",
      fromDate: fromDate.format("DD/MM/YYYY"),
      toDate: toDate.format("DD/MM/YYYY"),
    });
  }

  return { weeks, currentIndex };
};

// Hàm kết hợp listBaoCao và sortedData
const mergeDataSource = (weeks: WeekReport[], listBaoCao: any[]): WeekReport[] => {
  return weeks.map((week) => {
    const report = listBaoCao.find((baoCao) => baoCao.soTuan === week.id);
    if (report) {
      return {
        ...week,
        title:report.congViec || "",
        work: report.congViec || "",
        taskContent: report.noiDungThucHien || "",
        result: report.ketQuaDatDuoc || "",
        content: report.noiDungBaoCao || "",
        url: report.duongDanBaoCao || "",
        comment: report.nhanXetCuaGiangVien || "",
        evaluation: report.diem || "",
      };
    }
    return week;
  });
};


const IndustryReportPage = () => {
  const [form] = Form.useForm();
  const [listGroup, setListGroup] = useState<any[]>([]);
  const [dataSource, setDataSource] = useState<WeekReport[]>([]);
  const [currentWeekIndex, setCurrentWeekIndex] = useState<number>(0);
  const [project, setProject] = useState<any>({});
  const [listBaoCao, setListBaoCao] = useState<any[]>([]);

  // Tải danh sách nhóm
  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const data = await get_GROUP_ID(0);
      setListGroup(data || []);
    } catch (error) {
      console.error("Error fetching groups:", error);
      message.error("Không thể tải danh sách nhóm");
    }
  };

  // Tải danh sách báo cáo
  useEffect(() => {
    if (project.maDeTai) {
      Get_BaoCao_MaDeTai();
    }
  }, [project]);

  const Get_BaoCao_MaDeTai = async () => {
    try {
      const data = await get_BaoCao_MaDeTai(project.maDeTai);
      setListBaoCao(data || []);
    } catch (error) {
      console.error("Error fetching reports:", error);
      message.error("Không thể tải danh sách báo cáo");
    }
  };

  // Cập nhật dataSource khi project hoặc listBaoCao thay đổi
  useEffect(() => {
    if (project.ngayBatDau) {
      const { weeks, currentIndex } = generateWeeks(project.ngayBatDau);
      const mergedData = mergeDataSource(weeks, listBaoCao);
      setDataSource(mergedData);
      setCurrentWeekIndex(currentIndex);
      if (mergedData.length > 0 && currentIndex >= 0) {
        fillFormFromWeekData(form, mergedData[currentIndex]);
      } else if (mergedData.length > 0) {
        fillFormFromWeekData(form, mergedData[0]);
      }
    } else {
      setDataSource([]);
      setListBaoCao([]);
      form.resetFields();
    }
  }, [project, listBaoCao, form]);

  const handleProjectChange = useCallback(
    (value: any) => {
      const selectedProject = listGroup.find(
        (group: any) => group.maDeTai === value
      );
      if (selectedProject) {
        setProject(selectedProject);
      } else {
        setProject({});
        setDataSource([]);
        setListBaoCao([]);
        form.resetFields();
      }
    },
    [listGroup, form]
  );

  const loadWeekData = useCallback(
    (record: WeekReport) => {
      const index = dataSource.findIndex((item) => item.key === record.key);
      setCurrentWeekIndex(index);
      fillFormFromWeekData(form, record);
      message.success(`Đã chọn tuần ${record.id} để chỉnh sửa`);
    },
    [dataSource, form]
  );

  const onFinish = useCallback(
    async (values: any) => {
      try {
        const newData: BAO_CAO_TUAN = {
          maDeTai: project.maDeTai,
          soTuan: values.weekId,
          tuNgay: moment(values.fromDate).toISOString(), 
          denNgay: moment(values.toDate).toISOString(),
          congViec: values.work,
          noiDungThucHien: values.taskContent,
          noiDungBaoCao: values.report_content,
          ketQuaDatDuoc: values.result,
          duongDanBaoCao: values.reportUrl,
          nhanXetCuaGiangVien: null,
          diem: null,
        };

        const existingReport = listBaoCao.find(
          (baoCao) => baoCao.soTuan === values.weekId
        );
        if (existingReport) {
          const values={
            ...newData,
            maBaoCao:existingReport.maBaoCao
          }
          await editBaoCaoTuan(values,Get_BaoCao_MaDeTai);
        } else {
          await addBaoCaoTuan(newData,Get_BaoCao_MaDeTai);
        }

        await Get_BaoCao_MaDeTai();
        form.resetFields();
        setCurrentWeekIndex(-1);
      } catch (error) {
        console.error("Error saving report:", error);
        message.error("Không thể lưu báo cáo");
      }
    },
    [project, form, listBaoCao]
  );

  // Sắp xếp dataSource theo thứ tự giảm dần (tuần mới nhất lên đầu)
  const sortedData = useMemo(() => {
    return [...dataSource].sort((a, b) => parseInt(b.key) - parseInt(a.key));
  }, [dataSource]);

  const rowClassName = (record: WeekReport) =>
    record.key === dataSource[currentWeekIndex]?.key ? "selected-row" : "";

  const columns = [
    { title: "STT", dataIndex: "key", key: "key", width: 60 },
    { title: "Tuần", dataIndex: "id", key: "id", width: 80, render: (id: number) => <span > Tuần {id}</span> },
    { title: "Nội dung theo tuần", dataIndex: "title", key: "title" },
    {
      title: "Đường dẫn",
      dataIndex: "url",
      key: "url",
      width: 120,
      render: (text: string) =>
        text ? (
          <a href={text} target="_blank" rel="noopener noreferrer">
            Xem báo cáo
          </a>
        ) : null,
    },
    { title: "Nhận xét", dataIndex: "comment", key: "comment", width: 120 },
    {
      title: "Đánh giá của tuần",
      dataIndex: "evaluation",
      key: "evaluation",
      width: 120,
    },
    {
      title: "Tác vụ",
      key: "action",
      width: 80,
      render: (_: any, record: WeekReport) => {
        const originalIndex = dataSource.findIndex(
          (item) => item.key === record.key
        );
        const canEdit =
          project.choPhepGiangVienBaoCaoKhacTuanHienTai ||
          (originalIndex !== -1 && originalIndex === currentWeekIndex);
        return canEdit ? (
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => loadWeekData(record)}
          />
        ) : null;
      },
    },
  ];

  return (
    <Layout className="industry-report-layout">
      <Content className="main-content">
        <Card className="form-card">
          <Form.Item label="Tên đề tài" name="name">
            <Select placeholder="Chọn đề tài" onChange={handleProjectChange}>
              {listGroup.length > 0 ? (
                listGroup
                  .filter((group: any) => group.maTrangThai === 4)
                  .map((group: any) => (
                    <Select.Option key={group.maDeTai} value={group.maDeTai}>
                      {group.tenDeTai}
                    </Select.Option>
                  ))
              ) : (
                <Select.Option disabled>
                  Bạn không có đề tài nào cả!
                </Select.Option>
              )}
            </Select>
          </Form.Item>
          <Title level={5}>Tên giảng viên: {project.tenGiangVien}</Title>
          <div className="form-section">
            <Text>Báo cáo cuối:</Text>
            <Space>
              <Button type="primary">Chọn tệp</Button>
              <Button>Xóa bỏ</Button>
            </Space>
          </div>
          <ReportForm
            form={form}
            dataSource={dataSource}
            currentWeekIndex={currentWeekIndex}
            onFinish={onFinish}
          />
        </Card>
        <Card className="table-card">
          <Table
            dataSource={sortedData}
            columns={columns}
            pagination={false}
            size="small"
            bordered
            rowClassName={rowClassName}
          />
        </Card>
      </Content>
    </Layout>
  );
};

export default IndustryReportPage;