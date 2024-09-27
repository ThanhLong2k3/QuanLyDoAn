type router = {
    PART: string;
  };
  
  type routerSection = {
    [key: string]: router;
  };
  
  // ROUTERS định nghĩa chỉ chứa các đường dẫn là chuỗi
  const ROUTERS: { [key: string]: routerSection } = {
    HOME: { 
       DEFAULT : {
         PART: "/"
       }
       
     },
    GIAOVU: {
      STUDENTS: { PART: "giaovu/sinhvien" },
      PROJECTWORK: { PART: "giaovu/project" },
      SUPERVISORS: { PART: "giaovu/supervisors" },
      CLASS: { PART: "giaovu/class" },
    },
  };
  
  export default ROUTERS;
  