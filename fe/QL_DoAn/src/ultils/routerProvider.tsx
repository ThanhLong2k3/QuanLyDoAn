import { createBrowserRouter } from "react-router-dom"
import Dashboard from '../pages/Dashboard'
import QuanLyHocVi from '../pages/QL_DanhMuc/QL_HocVi'

import QuanLyChucVu from "../pages/QL_DanhMuc/QL_ChucVu"
import QuanLyBoMon from "../pages/QL_DanhMuc/QL_BoMon"
import QuanLyKhoa from "../pages/QL_DanhMuc/QL_Khoa"
import QuanLyHocHam from "../pages/QL_DanhMuc/QL_HocHam"
import QuanLyLop from "../pages/QL_DoAn/QL_Lop"
import ROUTERS from "../router/Path"
import Login from '../pages/Login/Login'
import App from "../App"
import QuanLyNguoiDung from "../pages/QL_HeThong/QL_NguoiDung"
import QuanLyNhomQuuyen from "../pages/QL_HeThong/QL_NhomQuyen"
import QuanLygiangvien from "../pages/QL_DoAn/QL_GiangVien"
import QuanLySinhVien from "../pages/QL_DoAn/QL_SinhVien"
import QuanLyDotLamDoAn from "../pages/QL_DoAn/QL_DotLamDoAn"
import PhanCongHuongDan from "../pages/QL_DoAn/QL_PhanHuongDan"
import DangKyDeTai from "../pages/QL_DoAn/QL_DeTai/DangKyDe"
import GiangVienXacNhanDeTai from "../pages/QL_DoAn/QL_DeTai/GiangVienXacNhanDeTai"
import TBMXacNhanDeTai from "../pages/QL_DoAn/QL_DeTai/TruongBoMonXacNhan"

import QuanLyDeTai from "../pages/QL_DoAn/QL_DeTai/QuanLyDeTai"
import ThongTinSinhVien from '../pages/QL_DoAn/ThongTinSinhVien'
import QuanLyNhomSinhVien from "../pages/QL_DoAn/QL_NhomSinhVien"
import IndustryReportPage from "../pages/QL_DoAn/IndustryReportPage/indext"
import TeacherReportPage from "../pages/QL_DoAn/GV_DanhGia_NhanXet/indext"
const router = createBrowserRouter([
  {
    path: ROUTERS.HOME.DEFAULT.PATH,  
    element: <App />,
    children: [
      {
        path: "",  
        element: <Dashboard />,
      },
      {
        path: ROUTERS.DOAN.QL_SINHVIEN.PATH,
        element: <QuanLySinhVien />,
      },
      
      {
        path: ROUTERS.DOAN.QL_LOP.PATH,
        element: <QuanLyLop />,
      },
      {
        path: ROUTERS.HETHONG.QL_NGUOIDUNG.PATH,
        element: <QuanLyNguoiDung />,
      },
      {
        path: ROUTERS.HETHONG.QL_NHOMQUYEN.PATH,
        element:<QuanLyNhomQuuyen/>,
      },
      {
        path: ROUTERS.DOAN.QL_GIANGVIEN.PATH,
        element: <QuanLygiangvien />,
      },
      {
        path: ROUTERS.DOAN.QL_DOTLAMDOAN.PATH,
        element: <QuanLyDotLamDoAn />,
      },
      {
        path: ROUTERS.DANHMUC.QL_HOCVI.PATH,
        element: <QuanLyHocVi />,
      },
      {
        path: ROUTERS.DANHMUC.QL_HOCHAM.PATH,
        element: <QuanLyHocHam />,
      },
      {
        path: ROUTERS.DANHMUC.QL_KHOA.PATH,
        element: <QuanLyKhoa />,
      },
      {
        path: ROUTERS.DANHMUC.QL_BOMON.PATH,
        element: <QuanLyBoMon />,
      },
      {
        path: ROUTERS.DANHMUC.QL_CHUCVU.PATH,
        element: <QuanLyChucVu />,
      },
      {
        path: ROUTERS.DOAN.PHANCONG_HUONGDAN.PATH,
        element: <PhanCongHuongDan />,
      },
      {
        path: ROUTERS.DOAN.DEXUATDETAI.PATH,
        element: <DangKyDeTai />,
      },
      {
        path: ROUTERS.DOAN.XACNHANDETAI.PATH,
        element: <GiangVienXacNhanDeTai />,
      },
      {
        path: ROUTERS.DOAN.QL_DETAI.PATH,
        element: <QuanLyDeTai />,
      },
      {
        path: ROUTERS.DOAN.THONGTINSINHVIEN.PATH,
        element: <ThongTinSinhVien />,
      },
      {
        path: ROUTERS.DOAN.TBMXACNHANDETAI.PATH,
        element: <TBMXacNhanDeTai />,
      },
      {
        path: ROUTERS.DOAN.QL_NHOMSINHVIEN.PATH,
        element: <QuanLyNhomSinhVien />,
      },
      {
        path: ROUTERS.DOAN.IndustryReportPage.PATH,
        element: <IndustryReportPage />,
      },
      {
        path: ROUTERS.DOAN.GIANGVIEN_DANHGIA_NHANXET.PATH,
        element: <TeacherReportPage />,
      },
    ],
  },
  {
    path: ROUTERS.AUTH.DEFAULT.PATH,  
    element: <Login />,
  }
]);

export default router;

