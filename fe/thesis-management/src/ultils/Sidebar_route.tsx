import {
    TeamOutlined,
    UserOutlined,
    BookOutlined,
    ProjectOutlined,
    OrderedListOutlined,
    CheckSquareOutlined,
    SolutionOutlined,
    AuditOutlined,
    FileTextOutlined,
    EyeOutlined,
    FormOutlined,
    FileDoneOutlined,
    DashboardOutlined
  } from '@ant-design/icons';
  import ROUTERS from "../router/Path";

  type SidebarItem = {
    KEY: string;
    ICON: React.ReactNode;
    LINK: string;
    TEXT: string;
  };
  
  type SidebarSection = {
    [key: string]: SidebarItem;
  };
  
  const Sidebar_router: { [key: string]: SidebarSection } = {
    GIAOVU1:{
      BAOCAO: { KEY: '0', ICON: <ProjectOutlined />, LINK: ROUTERS.GIAOVU.PROJECTWORK.PATH, TEXT: 'Báo cáo' },
      GIANGVIEN: { KEY: '1', ICON: <UserOutlined />, LINK:ROUTERS.GIAOVU.GIANGVIEN.PATH , TEXT: "Quản lý giảng viên" },
      LOP: { KEY: '2', ICON: <TeamOutlined />, LINK: ROUTERS.GIAOVU.CLASS.PATH, TEXT: "Quản lý lớp" },
      HOIDONG: { KEY: '3', ICON: <BookOutlined />, LINK: ROUTERS.GIAOVU.SUPERVISORS.PATH, TEXT: "Quản lý hội đồng" },
      SINHVIEN: { KEY: '4', ICON: <UserOutlined />, LINK: ROUTERS.GIAOVU.STUDENTS.PATH, TEXT: "Quản lý sinh viên" },
      DOTLAMDOAN: { KEY: '5', ICON: <ProjectOutlined />, LINK: ROUTERS.GIAOVU.PROJECTWORK.PATH, TEXT: 'Đợt làm đồ án tốt nghiệp' },
    },
    GIAOVU: {
      HOME: { KEY: '0', ICON: <DashboardOutlined />, LINK: ROUTERS.HOME.DEFAULT.PATH, TEXT: "Trang chủ" },
      CLASS: { KEY: '1', ICON: <TeamOutlined />, LINK: ROUTERS.GIAOVU.CLASS.PATH, TEXT: "Quản lý lớp" },
      SUPERVISORS: { KEY: '2', ICON: <UserOutlined />, LINK:ROUTERS.GIAOVU.GIANGVIEN.PATH , TEXT: "Quản lý giảng viên" },
      STUDENTS: { KEY: '3', ICON: <UserOutlined />, LINK: ROUTERS.GIAOVU.STUDENTS.PATH, TEXT: "Quản lý sinh viên" },
      COUNCIL: { KEY: '4', ICON: <BookOutlined />, LINK: ROUTERS.GIAOVU.SUPERVISORS.PATH, TEXT: "Quản lý hội đồng" },
      USER: { KEY: '6', ICON: <TeamOutlined />, LINK: ROUTERS.GIAOVU.USER.PATH, TEXT: "Quản lý người dùng" },
      PHANQUYEN: { KEY: '7', ICON: <TeamOutlined />, LINK: ROUTERS.GIAOVU.PHANQUYEN.PATH, TEXT: "Quản lý nhóm quyền" },
      DƠLAMDOAN: { KEY: '8', ICON: <ProjectOutlined />, LINK: ROUTERS.GIAOVU.DOTLAMDOAN.PATH, TEXT: "Quản lý đợt làm đồ án" },



    },
    TBM: {
      HOME: { KEY: '0', ICON: <DashboardOutlined />, LINK: "", TEXT: "Trang chủ" },
      PROJECTWORK: { KEY: '5', ICON: <ProjectOutlined />, LINK: ROUTERS.GIAOVU.PROJECTWORK.PATH, TEXT: 'Đợt làm đồ án tốt nghiệp' },
      LISTSV: { KEY: '1', ICON: <OrderedListOutlined />, LINK: "", TEXT: "Danh sách sinh viên phản biện và hội đồng" },
      REVIEWCOMMENT: { KEY: '7', ICON: <FileTextOutlined />, LINK: "", TEXT: "Giảng viên đánh giá, nhận xét báo cáo" },
      COUNCIL: { KEY: '5', ICON: <BookOutlined />, LINK: "", TEXT: "Quản lý hội đồng" },

      GV_COMFILMPROJECT: { KEY: '3', ICON: <CheckSquareOutlined />, LINK: "", TEXT: "Giảng viên xác nhận sinh viên đăng ký đề tài" },
      SUPPORT: { KEY: '4', ICON: <SolutionOutlined />, LINK: "", TEXT: "Phân công hướng dẫn, Xem danh sách sinh viên" },
      TBM_COMFILMPROJECT: { KEY: '6', ICON: <AuditOutlined />, LINK: "", TEXT: "Trưởng bộ môn xác nhận sinh viên đăng ký đề tài" },
    },
    GIANGVIEN: {
      HOME: { KEY: '0', ICON: <DashboardOutlined />, LINK: "", TEXT: "Trang chủ" },
      COUNCIL: { KEY: '1', ICON: <BookOutlined />, LINK: "", TEXT: "Quản lý hội đồng" },
      LISTSV: { KEY: '2', ICON: <OrderedListOutlined />, LINK: "", TEXT: "Danh sách sinh viên phản biện và hội đồng" },
      REVIEWCOMMENT: { KEY: '3', ICON: <FileTextOutlined />, LINK: "", TEXT: "Giảng viên đánh giá, nhận xét báo cáo" },
      GV_COMFILMPROJECT: { KEY: '4', ICON: <CheckSquareOutlined />, LINK: "", TEXT: "Giảng viên xác nhận sinh viên đăng ký đề tài" },
    },
    SINHVIEN: {
      HOME: { KEY: '0', ICON: <DashboardOutlined />, LINK: "", TEXT: "Trang chủ" },
      VIEWTEACHER: { KEY: '1', ICON: <EyeOutlined />, LINK: "", TEXT: "Xem giảng viên phản biện và hội đồng" },
      LONGUPTOPIC: { KEY: '2', ICON: <FormOutlined />, LINK: "", TEXT: "Đăng ký đề tài đồ án tốt nghiệp" },
      REPORT: { KEY: '3', ICON: <FileDoneOutlined />, LINK: "", TEXT: "Báo cáo kết quả làm đồ án tốt nghiệp" },
    }
  };
  
  export default Sidebar_router;