import {
  HomeOutlined,
  BarChartOutlined,
  UserOutlined,
  TeamOutlined,
  BookOutlined,
  CalendarOutlined,
  SafetyCertificateOutlined,
  UsergroupAddOutlined,
  OrderedListOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  SolutionOutlined,
  AuditOutlined,
  EyeOutlined,
  FormOutlined,
  FileDoneOutlined,
  BankOutlined,
  ClusterOutlined,
  TrophyOutlined,
  CrownOutlined,
  IdcardOutlined
} from '@ant-design/icons';
import ROUTERS from "../router/Path";

type SidebarItem = {
  KEY: string;
  ICON: React.ReactNode;
  LINK: string;
  TEXT: string;
  PERMISSION: string[]; 
};

export const Sidebar_router: { [key: string]: SidebarItem } = {
  HOME: { KEY: '0', ICON: <HomeOutlined />, LINK: ROUTERS.HOME.DEFAULT.PATH, TEXT: "Trang chủ", PERMISSION: ["VIEW_HOME"] },
  BAOCAO: { KEY: '1', ICON: <BarChartOutlined />, LINK:"", TEXT: 'Báo cáo', PERMISSION: ["VIEW_BAOCAO"] },
  GIANGVIEN: { KEY: '2', ICON: <UserOutlined />, LINK: ROUTERS.DOAN.QL_GIANGVIEN.PATH, TEXT: "Quản lý giảng viên", PERMISSION: ["ADD_GIANGVIEN","UP_GIANGVIEN","DEL_GIANGVIEN"] },
  LOP: { KEY: '3', ICON: <TeamOutlined />, LINK: ROUTERS.DOAN.QL_LOP.PATH, TEXT: "Quản lý lớp", PERMISSION: ["ADD_LOP", "UP_LOP", "DEL_LOP"] },
  HOIDONG: { KEY: '4', ICON: <BookOutlined />, LINK: "ROUTERS.PATH.SUPERVISORS.PATH", TEXT: "Quản lý hội đồng", PERMISSION: ["MANAGE_HOIDONG"] },
  SINHVIEN: { KEY: '5', ICON: <UserOutlined />, LINK:  ROUTERS.DOAN.QL_SINHVIEN.PATH, TEXT: "Quản lý sinh viên", PERMISSION: ["ADD_SINHVIEN","UP_SINHVIEN","DEL_SINHVIEN"] },
  DOTLAMDOAN: { KEY: '6', ICON: <CalendarOutlined />, LINK: ROUTERS.DOAN.QL_DOTLAMDOAN.PATH, TEXT: 'Đợt Nghiên cứu Khoa Học tốt nghiệp', PERMISSION: ["ADD_DOTLAMDOAN","DEL_DOTLAMDOAN","UP_DOTLAMDOAN"] },
  QUANLYDETAI: { KEY: '17', ICON: <OrderedListOutlined />, LINK:ROUTERS.DOAN.QL_DETAI.PATH, TEXT: "Quản lý đề tài", PERMISSION: ["ADD_DETAI"] },
  LISTSV: { KEY: '9', ICON: <OrderedListOutlined />, LINK: "", TEXT: "Danh sách sinh viên phản biện và hội đồng", PERMISSION: ["VIEW_LISTSV"] },
  REVIEWCOMMENT: { KEY: '10', ICON: <FileTextOutlined />, LINK: "", TEXT: "Giảng viên đánh giá, nhận xét báo cáo", PERMISSION: ["REVIEW_COMMENT"] },
  GV_COMFILMPROJECT: { KEY: '11', ICON: <CheckCircleOutlined />, LINK:ROUTERS.DOAN.XACNHANDETAI.PATH, TEXT: "Giảng viên xác nhận sinh viên đăng ký đề tài", PERMISSION: ["GIANGVIEN_CONFIRM_DETAI","GIANGVIEN_REJECT_DETAI"] },
  SUPPORT: { KEY: '12', ICON: <SolutionOutlined />, LINK: ROUTERS.DOAN.PHANCONG_HUONGDAN.PATH, TEXT: "Phân công hướng dẫn, Xem danh sách sinh viên", PERMISSION: ["ADD_PHANCONG","UP_PHANCONG"] },
  TBM_COMFILMPROJECT: { KEY: '13', ICON: <AuditOutlined />, LINK: ROUTERS.DOAN.TBMXACNHANDETAI.PATH, TEXT: "TBM Xác nhận sinh viên đăng ký đề tài", PERMISSION: ["TBM_CONFIRM_DETAI","TBM_REJECT_DETAI"] },
  VIEWTEACHER: { KEY: '14', ICON: <EyeOutlined />, LINK: "", TEXT: "Xem giảng viên phản biện và hội đồng", PERMISSION: ["VIEW_TEACHER"] },
  LONGUPTOPIC: { KEY: '15', ICON: <FormOutlined />, LINK: ROUTERS.DOAN.DEXUATDETAI.PATH, TEXT: "Đăng ký đề tài đồ án tốt nghiệp", PERMISSION: ["REGISTER_DETAI","SUGGEST_DETAI"] },
  MANAGE_GROUP: { KEY: '22', ICON: <FormOutlined />, LINK: ROUTERS.DOAN.QL_NHOMSINHVIEN.PATH, TEXT: "Nhóm Nghiên cứu khoa học", PERMISSION: ["REGISTER_DETAI","SUGGEST_DETAI"] },
  REPORT: { KEY: '16', ICON: <FileDoneOutlined />, LINK: ROUTERS.DOAN.IndustryReportPage.PATH, TEXT: "Báo cáo kết quả Nghiên cứu Khoa Học", PERMISSION: ["SUBMIT_REPORT"] },
  TEACHER_REPORT: { KEY: '23', ICON: <FileDoneOutlined />, LINK: ROUTERS.DOAN.GIANGVIEN_DANHGIA_NHANXET.PATH, TEXT: "Giảng viên đánh giá, nhận xét báo cáo", PERMISSION: ["TEACHER_REPORT"] },

};

export const Sidebar_router_DanhMuc: { [key: string]: SidebarItem } = {
  QLKHOA: { KEY: '17', ICON: <BankOutlined />, LINK: ROUTERS.DANHMUC.QL_KHOA.PATH, TEXT: "Danh mục khoa", PERMISSION: ["QL_DANHMUC"]},
  QLBOMON: { KEY: '18', ICON: <ClusterOutlined />, LINK: ROUTERS.DANHMUC.QL_BOMON.PATH, TEXT: 'Danh mục bộ môn', PERMISSION: ["QL_DANHMUC"]},
  QLHOCVI: { KEY: '19', ICON: <TrophyOutlined />, LINK: ROUTERS.DANHMUC.QL_HOCVI.PATH, TEXT: "Danh Mục học vị", PERMISSION: ["QL_DANHMUC"]},
  QLHOCHAM: { KEY: '21', ICON: <CrownOutlined />, LINK: ROUTERS.DANHMUC.QL_HOCHAM.PATH, TEXT: "Danh Mục học hàm", PERMISSION: ["QL_DANHMUC"]},
  QLCHUCVU: { KEY: '20', ICON: <IdcardOutlined />, LINK: ROUTERS.DANHMUC.QL_CHUCVU.PATH, TEXT: "Danh mục chức vụ", PERMISSION: ["QL_DANHMUC"]},
};
export const Sidebar_HeThong: { [key: string]: SidebarItem } = {
  PHANQUYEN: { KEY: '7', ICON: <SafetyCertificateOutlined />, LINK: ROUTERS.HETHONG.QL_NHOMQUYEN.PATH, TEXT: "Quản lý nhóm quyền", PERMISSION: ["ADD_NHOMQUYEN","UP_NHOMQUYEN","DEL_NHOMQUYEN"] },
  USER: { KEY: '8', ICON: <UsergroupAddOutlined />, LINK: ROUTERS.HETHONG.QL_NGUOIDUNG.PATH, TEXT: "Quản lý người dùng", PERMISSION: ["ADD_NGUOIDUNG","UP_NGUOIDUNG","DEL_NGUOIDUNG"] },
  
}
