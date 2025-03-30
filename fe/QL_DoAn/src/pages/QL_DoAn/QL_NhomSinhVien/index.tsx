import {
  Button,
  Layout,
  Card,
  List,
  Modal,
  Form,
  Input,
  Typography,
  Avatar,
  Divider,
  Space,
  Tag,
  Badge,
  Empty,
  Table,
  Popconfirm,
  Select,
  message,
  Spin,
} from "antd";
import { useEffect, useState } from "react";
import {
  add_GROUP,
  get_GROUP_ID,
  get_MemberGROUP_ID,
  add_Member_Group,
  del_Member_Group,
} from "../../../sevices/Api/QL_DoAn/QL_NhomSinhVien";
import {
  AppstoreAddOutlined,
  TeamOutlined,
  UserOutlined,
  InfoCircleOutlined,
  SettingOutlined,
  SearchOutlined,
  UserAddOutlined,
  DeleteOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Search } from "../../../sevices/Api/QL_DoAn/QL_SinhVien-servives";
import CustomNotification from "../../../components/UI/notification";

const { Header, Content: LayoutContent } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;


interface GroupData {
  maNhom: string;
  tenNhom: string;
  soThanhVien: number;
  tenTruongNhom?: string;
  maSinhVienTruong?:string;
  trangThai?:string;
  ngayTao?: string;
}

interface MemberData {
  maSinhVien: string;
  hoTen: string;
  email: string;
  ngayThamGia: string;
  vaiTro: string;
}



export default function QuanLyNhomSinhVien() {
  const [listGroup, setListGroup] = useState<GroupData[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isMemberModalVisible, setIsMemberModalVisible] =
    useState<boolean>(false);
  const [isAddMemberModalVisible, setIsAddMemberModalVisible] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [membersLoading, setMembersLoading] = useState<boolean>(false);
  const [currentGroup, setCurrentGroup] = useState<GroupData | null>(null);
  const [groupMembers, setGroupMembers] = useState<MemberData[]>([]);
  const [form] = Form.useForm();
  const [memberForm] = Form.useForm();
  const [students, setStudents] = useState([]); 
  useEffect(() => {
    getGroupByIDStudent();
  }, []);

  
  const fetchStudents = async (searchTerm: string) => {
    if (!searchTerm) return; 
    setLoading(true);
    try {
      const response = await Search(undefined,searchTerm);
      setStudents(response || []); 
    } catch (error) {
      console.error("Lỗi khi tìm kiếm sinh viên:", error);
    } finally {
      setLoading(false);
    }
  };


  const getGroupByIDStudent = async () => {
    setLoading(true);
    try {
      const data = await get_GROUP_ID(0);
      setListGroup(data);
    } catch (error) {
      console.error("Error fetching groups:", error);
      message.error("Không thể tải danh sách nhóm");
    } finally {
      setLoading(false);
    }
  };

  const getGroupMembers = async (groupId: string) => {
    setMembersLoading(true);
    try {
      
      const data = await get_MemberGROUP_ID(groupId);
      setGroupMembers(data || []);
    } catch (error) {
      console.error("Error fetching group members:", error);
      message.error("Không thể tải danh sách thành viên");
    } finally {
      setMembersLoading(false);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showMemberModal = async (group: GroupData) => {
    setCurrentGroup(group);
    await getGroupMembers(group.maNhom);
    setIsMemberModalVisible(true);
  };

  const showAddMemberModal = async () => {
    try {
      setIsAddMemberModalVisible(true);
    } catch (error) {
      console.error("Error fetching available students:", error);
      message.error("Không thể tải danh sách sinh viên");
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await add_GROUP(values, getGroupByIDStudent);
      setIsModalVisible(false);
      form.resetFields();
      message.success("Tạo nhóm thành công");
    } catch (error) {
      console.error("Error creating group:", error);
      message.error("Không thể tạo nhóm");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleMemberModalCancel = () => {
    setIsMemberModalVisible(false);
    setCurrentGroup(null);
  };

  const handleAddMemberModalCancel = () => {
    setIsAddMemberModalVisible(false);
    memberForm.resetFields();
  };

  const handleAddMember = async () => {
    try {
      const values = await memberForm.validateFields();
      if (currentGroup) {
        await add_Member_Group(
            {
                maNhom: currentGroup.maNhom,
                ...values
              },
        );

        
        await getGroupByIDStudent();

        setIsAddMemberModalVisible(false);
        memberForm.resetFields();
        message.success("Thêm thành viên thành công");
      }
    } catch (error) {
      console.error("Error adding member:", error);
      message.error("Không thể thêm thành viên");
    }
  };

  const handleRemoveMember = async (value: any) => {
    debugger;
    try {
      if (currentGroup) {
        var taiKhoan= localStorage.getItem('taiKhoan')|| '';
        const refreshMembers = async () => {
          await getGroupMembers(currentGroup.maNhom);
        };
        if(currentGroup.maSinhVienTruong===taiKhoan){
          await del_Member_Group(
            {
              maNhom: currentGroup.maNhom,
              maSinhVien: value.maSinhVien,
            },
            refreshMembers
          ); 
  
          
          await getGroupByIDStudent();
  
          CustomNotification({ result: 1, MessageDone:"Xóa thành viên thành công!"});

        }
        else{
           CustomNotification({ result: 0, KhongCoQuyen:"Bạn không phải là trưởng nhóm, không thể xóa thành viên!"});
        }
        
      }
    } catch (error) {
      console.error("Error removing member:", error);
      message.error("Không thể xóa thành viên");
    }
  };

  const getRandomColor = () => {
    const colors = ["#f50", "#2db7f5", "#87d068", "#108ee9", "#722ed1"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getGroupInitials = (name: string | undefined): string => {
    if (!name) return "N";
    return name
      .split(" ")
      .map((word: string) => word[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const memberColumns = [
    {
      title: "Mã sinh viên",
      dataIndex: "maSinhVien",
      key: "maSinhVien",
    },
    {
      title: "Họ và tên",
      dataIndex: "tenSinhVien",
      key: "tenSinhVien",
    },

    {
      title: "Vai trò",
      dataIndex: "vaiTro",
      key: "vaiTro",
      render: (vaiTro: string) => (
        <Tag color={vaiTro === "Trưởng nhóm" ? "gold" : "blue"}>{vaiTro}</Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_: any, record: MemberData) => (
        <Popconfirm
          title="Xóa thành viên"
          description="Bạn có chắc muốn xóa thành viên này không?"
          onConfirm={() => handleRemoveMember(record)}
          okText="Xóa"
          cancelText="Hủy"
        >
          <Button
            danger
            type="text"
            icon={<DeleteOutlined />}
            disabled={record.vaiTro === "Trưởng nhóm"}
          >
            Xóa
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f7fa" }}>
      <Header
        style={{
          background: "#fff",
          padding: "0 24px",
          boxShadow: "0 1px 4px rgba(0,21,41,.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <TeamOutlined
            style={{ fontSize: 24, color: "#1890ff", marginRight: 12 }}
          />
          <Title level={4} style={{ margin: 0 }}>
            Quản Lý Nhóm Nghiên Cứu Khoa Học
          </Title>
        </div>
        <Space>
          <Input
            prefix={<SearchOutlined />}
            placeholder="Tìm kiếm nhóm"
            style={{ width: 250 }}
          />
          <Button
            type="primary"
            icon={<AppstoreAddOutlined />}
            onClick={showModal}
            size="middle"
          >
            Tạo Nhóm Mới
          </Button>
        </Space>
      </Header>

      <LayoutContent style={{ padding: "24px", overflow: "auto" }}>
        {loading ? (
          <Card loading={true} />
        ) : listGroup.length > 0 ? (
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 1,
              md: 2,
              lg: 3,
              xl: 3,
              xxl: 4,
            }}
            dataSource={listGroup}
            renderItem={(group: GroupData) => (
              <List.Item>
                <Badge.Ribbon
                  text={`${group.soThanhVien} thành viên`}
                  color={group.soThanhVien > 5 ? "green" : "blue"}
                >
                  <Card
                    hoverable
                    style={{
                      borderRadius: 8,
                      overflow: "hidden",
                    }}
                    actions={[
                      <Button type="text" icon={<InfoCircleOutlined />}>
                        Chi tiết
                      </Button>,
                      <Button
                        type="text"
                        icon={<SettingOutlined />}
                        onClick={() => showMemberModal(group)}
                      >
                        Quản lý
                      </Button>,
                    ]}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 16,
                      }}
                    >
                      <Avatar
                        size={64}
                        style={{
                          backgroundColor: getRandomColor(),
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: 24,
                          fontWeight: "bold",
                        }}
                      >
                        {getGroupInitials(group.tenNhom)}
                      </Avatar>
                      <div style={{ marginLeft: 16 }}>
                        <Title level={4} style={{ margin: 0 }}>
                          {group.tenNhom}
                        </Title>
                        <Tag color="blue">{group.trangThai}</Tag>
                      </div>
                    </div>

                    <Divider style={{ margin: "12px 0" }} />

                    <div>
                      <Space
                        direction="vertical"
                        size="small"
                        style={{ width: "100%" }}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <UserOutlined
                            style={{ marginRight: 8, color: "#1890ff" }}
                          />
                          <Text>
                            Trưởng nhóm: {group.tenTruongNhom || "Chưa có"}
                          </Text>
                        </div>
                        <div>
                          <Text type="secondary">
                            Ngày tạo: {group.ngayTao || "N/A"}
                          </Text>
                        </div>
                      </Space>
                    </div>
                  </Card>
                </Badge.Ribbon>
              </List.Item>
            )}
          />
        ) : (
          <Empty
            description="Chưa có nhóm nghiên cứu nào"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            <Button type="primary" onClick={showModal}>
              Tạo nhóm mới ngay
            </Button>
          </Empty>
        )}
      </LayoutContent>

      {/* Create Group Modal */}
      <Modal
        title={
          <div style={{ display: "flex", alignItems: "center" }}>
            <TeamOutlined
              style={{ fontSize: 20, marginRight: 8, color: "#1890ff" }}
            />
            <span>Tạo Nhóm Nghiên Cứu Mới</span>
          </div>
        }
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Tạo nhóm"
        cancelText="Hủy"
        centered
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="tenNhom"
            label="Tên Nhóm"
            tooltip="Tên nhóm nên mô tả rõ lĩnh vực nghiên cứu của nhóm"
            rules={[
              { required: true, message: "Vui lòng nhập tên nhóm!" },
              { min: 3, message: "Tên nhóm phải có ít nhất 3 ký tự!" },
            ]}
          >
            <Input
              prefix={<TeamOutlined style={{ color: "#bfbfbf" }} />}
              placeholder="Nhập tên nhóm nghiên cứu"
            />
          </Form.Item>

          <Form.Item name="moTa" label="Mô tả nhóm">
            <Input.TextArea
              placeholder="Nhập mô tả về mục tiêu và lĩnh vực nghiên cứu của nhóm"
              rows={4}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Group Members Modal */}
      <Modal
        title={
          <div style={{ display: "flex", alignItems: "center" }}>
            <TeamOutlined
              style={{ fontSize: 20, marginRight: 8, color: "#1890ff" }}
            />
            <span>Quản Lý Thành Viên - {currentGroup?.tenNhom}</span>
          </div>
        }
        open={isMemberModalVisible}
        onCancel={handleMemberModalCancel}
        footer={null}
        width={900}
        centered
        closeIcon={<CloseOutlined />}
      >
        <div
          style={{
            marginBottom: 16,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text>
            Tổng số thành viên:{" "}
            <strong>{currentGroup?.soThanhVien || 0}</strong>
          </Text>
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            onClick={showAddMemberModal}
          >
            Thêm Thành Viên
          </Button>
        </div>

        <Table
          columns={memberColumns}
          dataSource={groupMembers}
          rowKey="maSinhVien"
          loading={membersLoading}
          pagination={{ pageSize: 5 }}
          scroll={{ x: 800 }}
        />
      </Modal>

      {/* Add Member Modal */}
      <Modal
        title="Thêm Thành Viên Mới"
        open={isAddMemberModalVisible}
        onOk={handleAddMember}
        onCancel={handleAddMemberModalCancel}
        okText="Thêm"
        cancelText="Hủy"
        centered
      >
        <Form form={memberForm} layout="vertical">
          <Form.Item
            name="maSinhVien"
            label="Sinh viên"
            rules={[{ required: true, message: "Vui lòng chọn sinh viên!" }]}
          >
            <Select
              showSearch
              placeholder="Chọn sinh viên"
              onSearch={fetchStudents} 
              onChange={(value) => console.log("Đã chọn:", value)}
              notFoundContent={
                loading ? <Spin size="small" /> : "Không tìm thấy sinh viên"
              }
              style={{ width: 300 }}
            >
              {students.map((student:any) => (
                <Option key={student.maSinhVien} value={student.maSinhVien}>
                  {student.tenSinhVien} ({student.maSinhVien})
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="vaiTro"
            label="Vai trò"
            initialValue="Thành viên"
            rules={[{ required: true, message: "Vui lòng chọn vai trò!" }]}
          >
            <Select placeholder="Chọn vai trò">
              <Option value="Thành viên">Thành viên</Option>
              <Option value="Trưởng nhóm">Trưởng nhóm</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
}
