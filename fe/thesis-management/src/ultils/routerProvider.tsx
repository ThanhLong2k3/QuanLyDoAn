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


const router = createBrowserRouter([
  {
    path: ROUTERS.HOME.DEFAULT.PATH,  
    element: <App />,
    children: [
      {
        path: "",  
        element: <QuanLyHocVi />,
      },
      {
        path: ROUTERS.GIAOVU.STUDENTS.PATH,
        element: <QuanLySinhVien />,
      },
      {
        path: ROUTERS.GIAOVU.PROJECTWORK.PATH,
        element: <Projects />,
      },
      {
        path: ROUTERS.GIAOVU.SUPERVISORS.PATH,
        element: <Supervisors />,
      },
      {
        path: ROUTERS.GIAOVU.CLASS.PATH,
        element: <QuanLyLop />,
      },
      {
        path: ROUTERS.GIAOVU.USER.PATH,
        element: <QuanLyNguoiDung />,
      },
      {
        path: ROUTERS.GIAOVU.PHANQUYEN.PATH,
        element:<QuanLyNhomQuuyen/>,
      },
      {
        path: ROUTERS.GIAOVU.GIANGVIEN.PATH,
        element: <QuanLygiangvien />,
      },
    ],
  },
  {
    path: ROUTERS.AUTH.DEFAULT.PATH,  
    element: <Login />,
  }
]);

export default router;

