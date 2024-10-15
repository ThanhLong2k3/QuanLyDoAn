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

// Define SidebarItem type with explicit permission type
type SidebarItem = {
  KEY: string;
  ICON: React.ReactNode;
  LINK: string;
  TEXT: string;
  PERMISSION: string[]; // Define permission as an array of strings
};

const Sidebar_router: { [key: string]: SidebarItem } = {
  HOME: { KEY: '0', ICON: <DashboardOutlined />, LINK: ROUTERS.HOME.DEFAULT.PATH, TEXT: "Trang chủ", PERMISSION: ["VIEW_HOME"] },
  BAOCAO: { KEY: '1', ICON: <ProjectOutlined />, LINK: ROUTERS.GIAOVU.PROJECTWORK.PATH, TEXT: 'Báo cáo', PERMISSION: ["VIEW_BAOCAO"] },
  GIANGVIEN: { KEY: '2', ICON: <UserOutlined />, LINK: ROUTERS.GIAOVU.GIANGVIEN.PATH, TEXT: "Quản lý giảng viên", PERMISSION: ["ADD_GIANGVIEN","UP_GIANGVIEN","DEL_GIANGVIEN"] },
  LOP: { KEY: '3', ICON: <TeamOutlined />, LINK: ROUTERS.GIAOVU.CLASS.PATH, TEXT: "Quản lý lớp", PERMISSION: ["ADD_LOP", "UP_LOP", "DEL_LOP"] },
  HOIDONG: { KEY: '4', ICON: <BookOutlined />, LINK: ROUTERS.GIAOVU.SUPERVISORS.PATH, TEXT: "Quản lý hội đồng", PERMISSION: ["MANAGE_HOIDONG"] },
  SINHVIEN: { KEY: '5', ICON: <UserOutlined />, LINK: ROUTERS.GIAOVU.STUDENTS.PATH, TEXT: "Quản lý sinh viên", PERMISSION: ["MANAGE_SINHVIEN"] },
  DOTLAMDOAN: { KEY: '6', ICON: <ProjectOutlined />, LINK: ROUTERS.GIAOVU.PROJECTWORK.PATH, TEXT: 'Đợt làm đồ án tốt nghiệp', PERMISSION: ["MANAGE_DOTLAMDOAN"] },
  PHANQUYEN: { KEY: '7', ICON: <TeamOutlined />, LINK: ROUTERS.GIAOVU.PHANQUYEN.PATH, TEXT: "Quản lý nhóm quyền", PERMISSION: ["MANAGE_PHANQUYEN"] },
  USER: { KEY: '8', ICON: <TeamOutlined />, LINK: ROUTERS.GIAOVU.USER.PATH, TEXT: "Quản lý người dùng", PERMISSION: ["MANAGE_USER"] },
  LISTSV: { KEY: '9', ICON: <OrderedListOutlined />, LINK: "", TEXT: "Danh sách sinh viên phản biện và hội đồng", PERMISSION: ["VIEW_LISTSV"] },
  REVIEWCOMMENT: { KEY: '10', ICON: <FileTextOutlined />, LINK: "", TEXT: "Giảng viên đánh giá, nhận xét báo cáo", PERMISSION: ["REVIEW_COMMENT"] },
  GV_COMFILMPROJECT: { KEY: '11', ICON: <CheckSquareOutlined />, LINK: "", TEXT: "Giảng viên xác nhận sinh viên đăng ký đề tài", PERMISSION: ["CONFIRM_PROJECT"] },
  SUPPORT: { KEY: '12', ICON: <SolutionOutlined />, LINK: "", TEXT: "Phân công hướng dẫn, Xem danh sách sinh viên", PERMISSION: ["MANAGE_SUPPORT"] },
  TBM_COMFILMPROJECT: { KEY: '13', ICON: <AuditOutlined />, LINK: "", TEXT: "Trưởng bộ môn xác nhận sinh viên đăng ký đề tài", PERMISSION: ["TBM_CONFIRM_PROJECT"] },
  VIEWTEACHER: { KEY: '14', ICON: <EyeOutlined />, LINK: "", TEXT: "Xem giảng viên phản biện và hội đồng", PERMISSION: ["VIEW_TEACHER"] },
  LONGUPTOPIC: { KEY: '15', ICON: <FormOutlined />, LINK: "", TEXT: "Đăng ký đề tài đồ án tốt nghiệp", PERMISSION: ["REGISTER_TOPIC"] },
  REPORT: { KEY: '16', ICON: <FileDoneOutlined />, LINK: "", TEXT: "Báo cáo kết quả làm đồ án tốt nghiệp", PERMISSION: ["SUBMIT_REPORT"] },
};

export default Sidebar_router;
