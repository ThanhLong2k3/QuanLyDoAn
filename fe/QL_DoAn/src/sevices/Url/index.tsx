const LocalHot = "http://localhost:5295/";
    
export const URL = {
    QLDANHMUC:{
        QLBOMON:{
            GetAllBoMon:`${LocalHot}api/BoMon_CTRL/getall`,
            GetBoMonById:(ID:string)=>`${LocalHot}`,
            AddBoMon:`${LocalHot}api/BoMon_CTRL/create-BoMon`,
            UpdateBoMon:`${LocalHot}api/BoMon_CTRL/update-BoMon`,
            DeleteBoMon:(ID:string)=>`${LocalHot}api/BoMon_CTRL/delete-BoMon?maBoMon=${ID}`,
        },
        QLCHUCVU:{
            GetAllChucVu:`${LocalHot}api/ChucVu_CTRL/getall`,
            GetChucVuById:(ID:string)=>`${LocalHot}api/ChucVu_CTRL/getbyid`,
            AddChucVu:`${LocalHot}api/ChucVu_CTRL/create-ChucVu`,
            UpdateChucVu:`${LocalHot}api/ChucVu_CTRL/update-ChucVu`,
            DeleteChucVu:(ID:string)=>`${LocalHot}api/ChucVu_CTRL/delete-ChucVu?maChucVu=${ID}`,
        },
        QLKHOA:{
            GetAllKhoa:`${LocalHot}api/Khoa_CTRL/getall`,
            GetKhoaById:(ID:string)=>`${LocalHot}`,
            AddKhoa:`${LocalHot}api/Khoa_CTRL/create-Khoa`,
            UpdateKhoa:`${LocalHot}api/Khoa_CTRL/update-Khoa`,
            DeleteKhoa:(ID:string)=>`${LocalHot}api/Khoa_CTRL/delete-Khoa?maKhoa=${ID}`,
        },
        QLHOCHAM:{
            GetAllHocHam:`${LocalHot}api/HocHam_CTRL/getall-HocHam`,
            AddHocHam:`${LocalHot}api/HocHam_CTRL/create-HocHam`,
            UpdateHocHam:`${LocalHot}api/HocHam_CTRL/create-HocHam`,
            DeleteHocHam:(ID:string)=>`${LocalHot}api/HocHam_CTRL/delete-HocHam?maHocHam=${ID}`,
        },
        QLHOCVI:{
            GetAllHocVi:`${LocalHot}api/HocVi_CTRL/getall-HocVi`,
            AddHocVi:`${LocalHot}api/HocVi_CTRL/create-HocVi`,
            UpdateHocVi:`${LocalHot}api/HocVi_CTRL/update-HocVi`,
            DeleteHocVi:(ID:string)=>`${LocalHot}api/HocVi_CTRL/delete-HocVi?maHocVi=${ID}`,
        }
    },
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
            GETNHOMQUYEN_TAIKHOAN:(taiKhoan:string)=>`${LocalHot}api/nhomQuyen_CTRL/getnhomquyen_taikhoan?tk=${taiKhoan}`,
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
        BAO_CAO_TUAN:{
            GET_BAOCAOTUAN_MADETAI:(ID:string)=>`${LocalHot}api/BaoCaoTuan_CTRL/getall_MaDeTai?id=${ID}`,
            ADD_BAOCAO:`${LocalHot}api/BaoCaoTuan_CTRL/create-BaoCao`,
            UPDATE_BAOCAO:`${LocalHot}api/BaoCaoTuan_CTRL/update-BaoCao`,
        },
        QL_NHOMSINHVIEN:{
            LOIMOI:{
                GET_LOIMOI_ID:(ID:string)=>`${LocalHot}api/LoiMoiThamGiaNhom_CTRL/get_By_masinhvien?taikhoan=${ID}`,
                XU_LY_LOI_MOI:`${LocalHot}api/LoiMoiThamGiaNhom_CTRL/XuLyLoiMoi`,
                ADD_LOI_MOI:`${LocalHot}api/LoiMoiThamGiaNhom_CTRL/GuiLoiMoi`,
            },
            THANHVIEN:{
                    GET_ID:(ID:string)=>`${LocalHot}api/ThanhVienNhom_CTRL/get_By_Id?taiKhoan=${ID}`,
                    ADD:`${LocalHot}api/ThanhVienNhom_CTRL/add_thanhvien_nhom`,
                    DELETE:(MaTruongNhom:string)=>`${LocalHot}api/ThanhVienNhom_CTRL/delete-thanhvien_nhom?matruongnhom=${MaTruongNhom}`,
            },
            THEMTHANHVIEN:{
                GET_LOI_MOI:(maSV:string)=>`${LocalHot}api/LoiMoiThamGiaNhom_CTRL/get_By_masinhvien?taikhoan=${maSV}`,
                GUILOIMOI:`${LocalHot}api/LoiMoiThamGiaNhom_CTRL/GuiLoiMoi`,
                XULYLOIMOI:`${LocalHot}api/LoiMoiThamGiaNhom_CTRL/XuLyLoiMoi`
            },
            TAONHOM:{
                GET_NHOM_MASV: (
                    maSV?: string,
                    isTruongNhom?: number,
                    maDot?: string,
                    maGiangVien?: string
                  ) => {
                    let baseUrl = `${LocalHot}api/NhomSinhVien_CTRL/get_By_masinhvien?`;
                    const params: string[] = [];
                  
                    if (maSV) {
                      params.push(`taikhoan=${encodeURIComponent(maSV)}`);
                    }
                    if (isTruongNhom !== undefined) {
                      params.push(`isTruongNhom=${isTruongNhom}`);
                    }
                    if (maDot) {
                      params.push(`maDot=${encodeURIComponent(maDot)}`);
                    }
                    if (maGiangVien) {
                      params.push(`maGiangVien=${encodeURIComponent(maGiangVien)}`);
                    }
                  
                    return baseUrl + params.join('&');
                  },
                  
                ADD_NHOM:`${LocalHot}api/NhomSinhVien_CTRL/create-NhomSinhVien`,
                DELETE:(manhom:string, matruongnhom:string)=>`${LocalHot}api/NhomSinhVien_CTRL/delete-NhomSinhVien?manhom=${manhom}&matruongnhom=${matruongnhom}`,
            }
        },
        LQ_LOP:{
            ADD:(taiKhoan:string)=> `${LocalHot}api/Lop_CTRL/create-Lop?taikhoan=${taiKhoan}`,
            UPDATE:(taiKhoan:string)=> `${LocalHot}api/Lop_CTRL/update-Lop?taikhoan=${taiKhoan}`,
            DELETE:(taiKhoan:string,maLop:string)=> `${LocalHot}api/Lop_CTRL/delete-Lop?ma=${maLop}&taikhoan=${taiKhoan}`,
            GETALL:`${LocalHot}api/Lop_CTRL/getall`,
            SEARCH:`${LocalHot}api/Lop_CTRL/search`,
        },
        QL_SINHVIEN:{
            GET_BY_ID:(taikhoan:string)=>`${LocalHot}api/SinhVien_CTRL/get_By_Id?taikhoan=${taikhoan}`,
            ADD:(taiKhoan:string)=> `${LocalHot}api/SinhVien_CTRL/create-SinhVien?taikhoan=${taiKhoan}`,
            UPDATE:(taiKhoan:string)=> `${LocalHot}api/SinhVien_CTRL/update-SinhVien?taikhoan=${taiKhoan}`,
            DELETE:(taiKhoan:string,maSinhVien:string)=> `${LocalHot}api/SinhVien_CTRL/delete-SinhVien?ma=${maSinhVien}&taikhoan=${taiKhoan}`,
            GETALL:`${LocalHot}api/SinhVien_CTRL/getall`,
            UPDATE_SINHVIEN_SINHVIEN:`${LocalHot}api/SinhVien_CTRL/update-SinhVien_SinhVien`,
            SEARCH:`${LocalHot}api/SinhVien_CTRL/Search_SinhVien`,
            THONGKEDASHBOARD:`${LocalHot}api/SinhVien_CTRL/ThongKeDashboard`,
        },
        QL_GIANGVIEN:{
            ADD:(taiKhoan:string)=> `${LocalHot}api/GiangVien_CTRL/create-GiangVien?taikhoan=${taiKhoan}`,
            UPDATE:(taiKhoan:string)=> `${LocalHot}api/GiangVien_CTRL/update-GiangVien?taikhoan=${taiKhoan}`,
            DELETE:(taiKhoan:string,maGiangVien:string)=> `${LocalHot}api/GiangVien_CTRL/delete-GiangVien?ma=${maGiangVien}&taikhoan=${taiKhoan}`,
            GETALL:`${LocalHot}api/GiangVien_CTRL/getall`,
            SEARCH:`${LocalHot}api/GiangVien_CTRL/Search_GiangVien`,
        },
        QL_DOTDOAN:{
            GetByTaiKhoan:(taiKhoan:string)=>`${LocalHot}api/DotLamDoAn_CTRL/getByTaiKhoan?tk=${taiKhoan}`,
            ADD:(taiKhoan:string)=> `${LocalHot}api/DotLamDoAn_CTRL/create-DotLamDoAn?taikhoan=${taiKhoan}`,
            UPDATE:(taiKhoan:string)=> `${LocalHot}api/DotLamDoAn_CTRL/update-DotLamDoAn?taikhoan=${taiKhoan}`,
            DELETE:(taiKhoan:string,maGiangVien:string)=> `${LocalHot}api/DotLamDoAn_CTRL/delete-DotLamDoAn?ma=${maGiangVien}&taikhoan=${taiKhoan}`,
            GETALL:`${LocalHot}api/DotLamDoAn_CTRL/getall`,
            DOT_GIANGVIEN:{
                GETALL_GV_HD:`${LocalHot}api/Dot_GiangVien_CTRL/getallgv`,
                GET_GV_MADOT:(maDot:string)=>`${LocalHot}api/Dot_GiangVien_CTRL/getallgv_madot?madot=${maDot}`,
                CREATE_DOT_GV:`${LocalHot}api/Dot_GiangVien_CTRL/create-Dot_GiangVien`,
                UP_DOT_GV:`${LocalHot}api/Dot_GiangVien_CTRL/update-Dot_GiangVien`,
                DEL_GV_DOT:(maDot:string,maGV:string)=>`${LocalHot}api/Dot_GiangVien_CTRL/delete-Dot_GiangVien?maDot=${maDot}&maGiangVien=${maGV}`
            },
            DOT_SINHVIEN:{
                GET_DOT_TK:(TK:string)=>`${LocalHot}api/Dot_SinhVien/getall_Dot_taiKHoan?tk=${TK}`,
                GETALL_SV_HD:`${LocalHot}api/Dot_SinhVien/getall_SinhVien`,
                GET_SV_MADOT:(maDot:string)=>`${LocalHot}api/Dot_SinhVien/get_SinhVien_madot?madot=${maDot}`,
                CREATE_DOT_SV:`${LocalHot}api/Dot_SinhVien/create-Dot_SinhVien`,
                DEL_SV_DOT:(maDot:string,maSV:string)=>`${LocalHot}api/Dot_SinhVien/delete-Dot_SinhVien?maDot=${maDot}&maSinhVien=${maSV}`
            }
        },
        PHANCONGHUONGDAN:{
            GETPHANCONG_MADOT:(maDot:string)=>`${LocalHot}api/PhanCongHuongDan_CTRL/GetAll_PhanCong_MaDot?maDot=${maDot}`,
            CREATE:(taiKhoan:string)=>`${LocalHot}api/PhanCongHuongDan_CTRL/create-PhanCongHuongDan?taiKhoan=${taiKhoan}`,
            UPDATE:(taiKhoan:string)=>`${LocalHot}api/PhanCongHuongDan_CTRL/update-PhanCongHuongDan?taiKhoan=${taiKhoan}`
        },
        QUANLYDETAI:{
            SEARCH_DETAI:`${LocalHot}api/QuanLyDeTai_CTRL/get_detai_madot?`,
            ADD_DT_GV:(taikhoan:string)=>`${LocalHot}api/QuanLyDeTai_CTRL/create-DeTai-GV?taikhoan=${taikhoan}`,
            DEXUATDETAI:(taikhoan:string)=>`${LocalHot}api/QuanLyDeTai_CTRL/DeXuatDeTai?taikhoan=${taikhoan}`,
            DANGKYDETAI:(MaDeTai:string,masinhvien:string,taikhoan:string)=>`${LocalHot}api/QuanLyDeTai_CTRL/DangKyDeTai_sv?MaDeTai=${MaDeTai}&MaSinhVien=${masinhvien} &taikhoan=${taikhoan}`,
            UPDATE_DT_GV:(taikhoan:string)=>`${LocalHot}api/QuanLyDeTai_CTRL/UPDATE_DETAI_GV?taikhoan=${taikhoan}`,
            GET_DETAI_MADOT_SV:(MaDot:string)=>`${LocalHot}api/QuanLyDeTai_CTRL/get_detai_madot_SV?maDot=${MaDot}`,

            GIANGVIENXACNHANDETAI:{
                GET_DETAISINHVIEN_MADOT:(MaDot:string)=>`${LocalHot}api/QuanLyDeTai_CTRL/get_detaisinhvien_giangvien?maDot=${MaDot}`,
                GIANGVIEN_XACNHANDETAI:(TaiKhoan:string)=>`${LocalHot}api/QuanLyDeTai_CTRL/GiangVienXacNhanDeTai?taikhoan=${TaiKhoan}`,
                GIANGVIEN_TUCHOIDETAI:(TaiKhoan:string)=>`${LocalHot}api/QuanLyDeTai_CTRL/GiangVienTuChoiDeTai?taikhoan=${TaiKhoan}`,
            },
            TBMXACNHANDETAI:{
                GET_DETAISINHVIEN_MADOT:(MaDot:string)=>`${LocalHot}api/QuanLyDeTai_CTRL/get_detaisinhvien_TBM?maDot=${MaDot}`,
                TBM_XACNHANDETAI:(TaiKhoan:string)=>`${LocalHot}api/QuanLyDeTai_CTRL/TBMXacNhanDeTai?taikhoan=${TaiKhoan}`,
                TBM_TUCHOIDETAI:(TaiKhoan:string)=>`${LocalHot}api/QuanLyDeTai_CTRL/TBMTuChoiDeTai?taikhoan=${TaiKhoan}`,
            }
        }
    }
};