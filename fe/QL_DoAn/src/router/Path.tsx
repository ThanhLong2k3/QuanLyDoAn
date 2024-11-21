type router = {
    PATH: string;
  };
  
  type routerSection = {
    [key: string]: router;
  };
  
  // ROUTERS định nghĩa chỉ chứa các đường dẫn là chuỗi
  const ROUTERS: { [key: string]: routerSection } = {
    HOME: { DEFAULT : {PATH: "/home"}},
    AUTH: { DEFAULT : {PATH:"/"}},
    GIAOVU: {
      DOTLAMDOAN:{PATH:"admin/quanlydotlamdoan"},
      GIANGVIEN:{PATH:"admin/canbogiangvien"},
      PHANQUYEN:{PATH:"admin/nhomquyen"},
      USER:{PATH:"admin/user"},
      STUDENTS: { PATH: "giaovu/sinhvien" },
      PROJECTWORK: { PATH: "giaovu/project" },
      SUPERVISORS: { PATH: "giaovu/supervisors" },
      CLASS: { PATH: "giaovu/class" },
    },
  };
  
  export default ROUTERS;
  