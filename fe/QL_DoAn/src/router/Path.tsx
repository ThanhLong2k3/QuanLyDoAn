type router = {
    PATH: string;
  };
  
  type routerSection = {
    [key: string]: router;
  };
  
  const ROUTERS: { [key: string]: routerSection } = {
    
    HOME: { DEFAULT : {PATH: "/home"}},
    AUTH: { DEFAULT : {PATH:"/"}},
    DOAN: {
      QL_SINHVIEN:{PATH:"doan/sinhvien"},
      QL_GIANGVIEN:{PATH:"doan/giangvien"},
      QL_LOP:{PATH:"doan/lop"},
      QL_DOTLAMDOAN:{PATH:"doan/dotlamdoan"},
      PHANCONG_HUONGDAN:{PATH:"doan/phancong"},
      DEXUATDETAI:{PATH:"doan/dangkydetai"},
      XACNHANDETAI:{PATH:"doan/xacnhandetai"},
    },
    HETHONG:{
      QL_NGUOIDUNG:{PATH:"hethong/nguoidung"},
      QL_NHOMQUYEN:{PATH:"hethong/nhomquyen"},
    },
    DANHMUC:{
      QL_CHUCVU:{PATH:"danhmuc/chucvu"},
      QL_BOMON:{PATH:"danhmuc/bomon"},
      QL_HOCVI:{PATH:"danhmuc/hocvi"},
      QL_HOCHAM:{PATH:"danhmuc/hocham"},
      QL_KHOA:{PATH:"danhmuc/khoa"},

    }
  };
  
  export default ROUTERS;
  