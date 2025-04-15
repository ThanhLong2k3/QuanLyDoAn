using DAL.InterFace.QL_DoAn;
using DTO.QL_DoAn;

namespace DAL.QL_DoAnRepository
{
    public class QuanLyDeTai_Repository : IQuanLyDeTai_Repository
    {
        private IDatabaseHelper _dbHelper;

        public QuanLyDeTai_Repository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }
        public List<V_QL_DETAI_SinhVien> GET_DETAI_MADOT_SinhVien(string maDot)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "GETDETAI_MADOT_SV", "@MaDot", maDot);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<V_QL_DETAI_SinhVien>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        public List<V_QL_DETAI_GV> GET_DETAI_MADOT(string? maDot, string? tenDeTai)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "GET_DETAI_MADOT", "@MaDot",maDot, "@TenDeTai",tenDeTai);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<V_QL_DETAI_GV>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public string Create_SV(QL_DeTai_DTO model, string taikhoan)
        {
            string msgError = "";
            string kq = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_DeXuat_DeTai_SV",
                    "@TenDeTai", model.TenDeTai,
                    "@MaGiangVien",model.MaGiangVien,
                    "@MaDot", model.MaDot,
                    "@HinhThucBaoCao", model.HinhThucBaoCaoBaoVe,
                    "@MaNhom", model.maNhom,
                    "@MoTa", model.MoTa,
                    "@TaiKhoan", taikhoan
                );

                if (result != null)
                {
                    kq = result.ToString();
                }
                else
                {
                    kq = "Không có phản hồi từ server";
                }
                return kq;
            }
            catch (Exception ex)
            {
                throw new Exception("Đã xảy ra lỗi trong quá trình thêm đề tài: " + ex.Message, ex);
            }
        }
        public string Create_GV(QL_DeTai_DTO model, string taikhoan)
        {
            string msgError = "";
            string kq = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_ThemDeTai_GV",
                    "@TenDeTai", model.TenDeTai,
                    "@MaDot", model.MaDot,
                    "@HinhThucBaoCao",model.HinhThucBaoCaoBaoVe,
                    "@MaGiangVien", model.MaGiangVien,
                    "@MoTa", model.MoTa,
                    "@TaiKhoan", taikhoan
                );

                if (result != null)
                {
                    kq = result.ToString();
                }
                else
                {
                    kq = "Không có phản hồi từ server";
                }
                return kq;
            }
            catch (Exception ex)
            {
                throw new Exception("Đã xảy ra lỗi trong quá trình thêm đề tài: " + ex.Message, ex);
            }
        }

        public string updateDeTai(QL_DeTai_DTO model, string taikhoan)
        {
            string msgError = "";
            string kq = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_SuaDeTai_GV",
                    "@MaDeTai",model.MaDeTai,
                    "@TenDeTai", model.TenDeTai,
                    "@MaDot", model.MaDot,
                    "@HinhThucBaoCao", model.HinhThucBaoCaoBaoVe,
                    "@TrangThai",model.TrangThai,
                    "@MaGiangVien", model.MaGiangVien,
                    "@MoTa", model.MoTa,
                    "@TaiKhoan", taikhoan
                );

                if (result != null)
                {
                    kq = result.ToString();
                }
                else
                {
                    kq = "Không có phản hồi từ server";
                }
                return kq;
            }
            catch (Exception ex)
            {
                throw new Exception("Đã xảy ra lỗi trong quá trình thêm đề tài: " + ex.Message, ex);
            }
        }



        public string DeleteDeTai(string maDeTai, string taikhoan)
        {
            string msgError = "";
            string kq = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedure(out msgError, "sp_XoaDeTai_GV",
                    "@taiKhoan", taikhoan,
                    "@MaDeTai", maDeTai);

                if (result != null)
                {
                    kq = result.ToString();
                }
                else
                {
                    kq = "Không có phản hồi từ server";
                }
                return kq;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string DangKyDeTai_SV(string MaDeTai, string MaSinhVien, string taikhoan)
        {
            string msgError = "";
            string kq = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_DangKy_DeTai_SV",
                    "@TaiKhoan", taikhoan,
                    "@MaNhom",MaSinhVien,
                    "@MaDeTai",MaDeTai
                );

                if (result != null)
                {
                    kq = result.ToString();
                }
                else
                {
                    kq = "Không có phản hồi từ server";
                }
                return kq;
            }
            catch (Exception ex)
            {
                throw new Exception("Đã xảy ra lỗi trong quá trình thêm đề tài: " + ex.Message, ex);
            }
        }





        public string GiangVienXacNhanDeTai(D_GiangVien_XacnhanDeTai model, string taikhoan)
        {
            string msgError = "";
            string kq = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "GiangVien_XacNhanSVDangKyDeTai",
                    "@MaDeTai", model.MaDeTai,
                    "@MaNhom", model.maNhom,
                    "@TaiKhoan", taikhoan
                );

                if (result != null)
                {
                    kq = result.ToString();
                }
                else
                {
                    kq = "Không có phản hồi từ server";
                }
                return kq;
            }
            catch (Exception ex)
            {
                throw new Exception("Đã xảy ra lỗi trong quá trình thêm đề tài: " + ex.Message, ex);
            }
        }


        public string GiangVienTuChoiDeTai(D_GiangVien_XacnhanDeTai model, string taikhoan)
        {
            string msgError = "";
            string kq = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_TuChoi_DeTai",
                    "@MaDeTai", model.MaDeTai,
                    "@MaNhom", model.maNhom,
                    "@LyDoTuChoi",model.LyDoTuChoi,
                    "@TaiKhoan", taikhoan
                );

                if (result != null)
                {
                    kq = result.ToString();
                }
                else
                {
                    kq = "Không có phản hồi từ server";
                }
                return kq;
            }
            catch (Exception ex)
            {
                throw new Exception("Đã xảy ra lỗi trong quá trình thêm đề tài: " + ex.Message, ex);
            }
        }

        public List<V_GiangVien_XacnhanDeTai> Get_DeTaiSinhVien_GiangVien(string MaDot)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "GET_DETAISINHVIEN_GIANGVIENXACNHAN", "@MaDot", MaDot);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<V_GiangVien_XacnhanDeTai>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string TBMXacNhanDeTai(D_GiangVien_XacnhanDeTai model, string taikhoan)
        {
            string msgError = "";
            string kq = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "TBM_XacNhanSVDangKyDeTai",
                    "@MaDeTai", model.MaDeTai,
                    "@MaNhom", model.maNhom,
                    "@TaiKhoan", taikhoan
                );

                if (result != null)
                {
                    kq = result.ToString();
                }
                else
                {
                    kq = "Không có phản hồi từ server";
                }
                return kq;
            }
            catch (Exception ex)
            {
                throw new Exception("Đã xảy ra lỗi trong quá trình thêm đề tài: " + ex.Message, ex);
            }
        }

        public string TBMTuChoiDeTai(D_GiangVien_XacnhanDeTai model, string taikhoan)
        {
            string msgError = "";
            string kq = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "TBM_TuChoi_DeTai",
                    "@MaDeTai", model.MaDeTai,
                    "@MaNhom", model.maNhom,
                    "@LyDoTuChoi", model.LyDoTuChoi,
                    "@TaiKhoan", taikhoan
                );

                if (result != null)
                {
                    kq = result.ToString();
                }
                else
                {
                    kq = "Không có phản hồi từ server";
                }
                return kq;
            }
            catch (Exception ex)
            {
                throw new Exception("Đã xảy ra lỗi trong quá trình thêm đề tài: " + ex.Message, ex);
            }
        }

        public List<V_TBM_XacnhanDeTai> Get_DeTaiSinhVien_TBM(string? MaDot,string?MaGiangVien,string?MaLop)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "GET_DETAIGIANGVIEN_TBMXACNHAN",
                    "@MaDot", MaDot,
                    "@MaGiangVien",MaGiangVien,
                    "@MaLop",MaLop);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<V_TBM_XacnhanDeTai>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
