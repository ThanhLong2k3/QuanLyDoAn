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
                    "@MaSinhVien", model.MaSinhVien,
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
                    "@MaSinhVien",MaSinhVien,
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
    }
}
