const LocalHot = "https://localhost:7204/";

export const URL = {
    QLHETHONG: {
        QLNGUOIDUNG: {
            GETALL: LocalHot + "api/nguoiDung_CTRL/getall",
            GETBYTK: (taiKhoan: string) => `${LocalHot}api/nguoiDung_CTRL/get-by-taikhoan/${taiKhoan}`,
            ADD: "https://localhost:7204/api/nguoiDung_CTRL/create-nguoiDung",
            UPDATE: LocalHot + "api/nguoiDung_CTRL/update-nguoiDung",
            DELETE: (key: string) =>  LocalHot+`api/nguoiDung_CTRL/delete-nguoiDung?tk=${key}`,
        },
        QLNHOMQUYEN:{
            GETALL: LocalHot + "api/nhomQuyen_CTRL/getall",
            ADD: "https://localhost:7204/api/nhomQuyen_CTRL/create-nhomQuyen",
            UPDATE: LocalHot + "api/nhomQuyen_CTRL/update-nhomQuyen",
            DELETE: (key: string) =>  LocalHot+`api/nhomQuyen_CTRL/delete-nhomQuyen?ma=${key}`,
        },
        NGUOIDUNG_NHOMQUYEN:{
            ADD:LocalHot+"api/nguoiDung_NhomQuyen_CTRL/create-nguoiDung_NhomQuyen",
            GETBYMANHOMQUYEN:(maNhomQuyen:string)=> LocalHot+`api/nguoiDung_NhomQuyen_CTRL/getall?ma=${maNhomQuyen}`,
            DELETE:LocalHot+"api/nguoiDung_NhomQuyen_CTRL/delete-nguoiDung_NhomQuyen",
        },
        PHANQUYEN:{
            GETALL:LocalHot+"api/PhanQuyen_CTRL/getall",
            GETBYMANHOMQUYEN:(maNhomQuyen:string)=>LocalHot+`api/PhanQuyen_CTRL/get_phanquyen_manhomquyen?ma=${maNhomQuyen}`
        },
        NHOMQUYENPHANQUYEN:{
            ADD:LocalHot+"api/nhomQuyen_PhanQuyen_CTRL/create-nhomquyen_phanquyen",
            DELETE:LocalHot+"api/nhomQuyen_PhanQuyen_CTRL/delete-nhomquyen_phanquyen",
        }
    }
};