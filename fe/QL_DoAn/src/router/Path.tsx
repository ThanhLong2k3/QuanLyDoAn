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
      QL_NHOMSINHVIEN:{PATH:"student/groupstudent"},
      QL_SINHVIEN:{PATH:"nckh/sinhvien"},
      QL_GIANGVIEN:{PATH:"nckh/giangvien"},
      QL_LOP:{PATH:"nckh/lop"},
      QL_DOTLAMDOAN:{PATH:"nckh/dotlamnckh"},
      PHANCONG_HUONGDAN:{PATH:"nckh/phancong"},
      QL_DETAI:{PATH:"nckh/quanlydetai"},
      DEXUATDETAI:{PATH:"nckh/dangkydetai"},
      XACNHANDETAI:{PATH:"nckh/xacnhandetai"},
      THONGTINSINHVIEN:{PATH:"sinhvien/thongtincanhan"},
      TBMXACNHANDETAI:{PATH:"tbm/xacnhandetai"},
      IndustryReportPage:{PATH:'nckh/reportPage'},
      GIANGVIEN_DANHGIA_NHANXET:{PATH:'nckh/teachr-report'},
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
  