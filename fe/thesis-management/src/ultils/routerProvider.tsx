import { createBrowserRouter } from "react-router-dom";
import Dashboard from '../pages/Dashboard';
import Projects from '../pages/Projects';
import Students from '../pages/students';
import Supervisors from '../pages/Supervisors';
import Class from "../pages/Classs";
import ROUTERS from "../router/Part";
import Login from '../pages/Login/Login';
import App from "../App";

console.log(ROUTERS.GIAOVU.STUDENTS.PART);

const router = createBrowserRouter([
  {
    path: ROUTERS.HOME.DEFAULT.PART,  
    element: <App />,
    children: [
      {
        path: "",  
        element: <Dashboard />,
      },
      {
        path: ROUTERS.GIAOVU.STUDENTS.PART,
        element: <Students />,
      },
      {
        path: ROUTERS.GIAOVU.PROJECTWORK.PART,
        element: <Projects />,
      },
      {
        path: ROUTERS.GIAOVU.SUPERVISORS.PART,
        element: <Supervisors />,
      },
      {
        path: ROUTERS.GIAOVU.CLASS.PART,
        element: <Class />,
      },
    ],
  },
  {
    path: "/login",  
    element: <Login />,
  }
]);

export default router;

