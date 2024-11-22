const LocalHot = "http://localhost:5295/";
    
export const URL = {
    QLHETHONG: {
        QLNGUOIDUNG: {
            GETALL: `${LocalHot}api/nguoiDung_CTRL/getall`,
            GETBYTK: (taiKhoan: string) => `${LocalHot}api/nguoiDung_CTRL/get-by-taikhoan/${taiKhoan}`,
            ADD: `${LocalHot}api/nguoiDung_CTRL/create-nguoiDung`,
            UPDATE:`${LocalHot}api/nguoiDung_CTRL/update-nguoiDung`,
            DELETE: (key: string) =>  LocalHot+`api/nguoiDung_CTRL/delete-nguoiDung?tk=${key}`,
            DANGNHAP:LocalHot+`api/nguoiDung_CTRL/dangnhap-nguoiDung`
        },
        QLNHOMQUYEN:{
            GETALL: `${LocalHot}api/nhomQuyen_CTRL/getall`,
            ADD: `${LocalHot}api/nhomQuyen_CTRL/create-nhomQuyen`,
            UPDATE: `${LocalHot}api/nhomQuyen_CTRL/update-nhomQuyen`,
            DELETE: (key: string) =>  `${LocalHot}api/nhomQuyen_CTRL/delete-nhomQuyen?ma=${key}`,
        },
        NGUOIDUNG_NHOMQUYEN:{
            GETBYTAIKHOAN:(taiKhoan:string)=>`${LocalHot}api/nhomQuyen_PhanQuyen_CTRL/getquyen_taikhoan?taikhoan=${taiKhoan}`,
            ADD:`${LocalHot}api/nguoiDung_NhomQuyen_CTRL/create-nguoiDung_NhomQuyen`,
            GETBYMANHOMQUYEN:(maNhomQuyen:string)=>`${LocalHot}api/nguoiDung_NhomQuyen_CTRL/getall?ma=${maNhomQuyen}`,
            DELETE:`${LocalHot}api/nguoiDung_NhomQuyen_CTRL/delete-nguoiDung_NhomQuyen`,
        },
        PHANQUYEN:{
            GETALL:`${LocalHot}api/PhanQuyen_CTRL/getall`,
            GETBYMANHOMQUYEN:(maNhomQuyen:string)=>`${LocalHot}api/PhanQuyen_CTRL/get_phanquyen_manhomquyen?ma=${maNhomQuyen}`
        },
        NHOMQUYENPHANQUYEN:{
            ADD:`${LocalHot}api/nhomQuyen_PhanQuyen_CTRL/create-nhomquyen_phanquyen`,
            DELETE:`${LocalHot}api/nhomQuyen_PhanQuyen_CTRL/delete-nhomquyen_phanquyen`,
        }
    },
    QLDOAN:{
        LQ_LOP:{
            ADD:(taiKhoan:string)=> `${LocalHot}api/Lop_CTRL/create-Lop?taikhoan=${taiKhoan}`,
            UPDATE:(taiKhoan:string)=> `${LocalHot}api/Lop_CTRL/update-Lop?taikhoan=${taiKhoan}`,
            DELETE:(taiKhoan:string,maLop:string)=> `${LocalHot}api/Lop_CTRL/delete-Lop?ma=${maLop}&taikhoan=${taiKhoan}`,
            GETALL:`${LocalHot}api/Lop_CTRL/getall`,
        },
        QL_SINHVIEN:{
            ADD:(taiKhoan:string)=> `${LocalHot}api/SinhVien_CTRL/create-SinhVien?taikhoan=${taiKhoan}`,
            UPDATE:(taiKhoan:string)=> `${LocalHot}api/SinhVien_CTRL/update-SinhVien?taikhoan=${taiKhoan}`,
            DELETE:(taiKhoan:string,maSinhVien:string)=> `${LocalHot}api/SinhVien_CTRL/delete-SinhVien?ma=${maSinhVien}&taikhoan=${taiKhoan}`,
            GETALL:`${LocalHot}api/SinhVien_CTRL/getall`,
        },
        QL_GIANGVIEN:{
            ADD:(taiKhoan:string)=> `${LocalHot}api/GiangVien_CTRL/create-GiangVien?taikhoan=${taiKhoan}`,
            UPDATE:(taiKhoan:string)=> `${LocalHot}api/GiangVien_CTRL/update-GiangVien?taikhoan=${taiKhoan}`,
            DELETE:(taiKhoan:string,maGiangVien:string)=> `${LocalHot}api/GiangVien_CTRL/delete-GiangVien?ma=${maGiangVien}&taikhoan=${taiKhoan}`,
            GETALL:`${LocalHot}api/GiangVien_CTRL/getall`,
        }
    }
};