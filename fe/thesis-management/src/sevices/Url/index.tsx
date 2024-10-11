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
        }
    }
};