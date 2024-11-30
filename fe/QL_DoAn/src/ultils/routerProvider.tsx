import { createBrowserRouter } from "react-router-dom"
import Dashboard from '../pages/Dashboard'
import QuanLyHocVi from '../pages/QL_DanhMuc/QL_HocVi'
import Projects from '../pages/Projects'
import Students from '../pages/students'
import Supervisors from '../pages/Supervisors'
import Class from "../pages/Classs"
import QuanLyLop from "../pages/QL_DoAn/QL_Lop"
import ROUTERS from "../router/Path"
import Login from '../pages/Login/Login'
import App from "../App"
import QuanLyNguoiDung from "../pages/QL_HeThong/QL_NguoiDung"
import QuanLyNhomQuuyen from "../pages/QL_HeThong/QL_NhomQuyen"
import QuanLygiangvien from "../pages/QL_DoAn/QL_GiangVien"
import QuanLySinhVien from "../pages/QL_DoAn/QL_SinhVien"
import QuanLyDotLamDoAn from "../pages/QL_DoAn/QL_DotLamDoAn"



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
    ],
  },
  {
    path: ROUTERS.AUTH.DEFAULT.PATH,  
    element: <Login />,
  }
]);

export default router;

