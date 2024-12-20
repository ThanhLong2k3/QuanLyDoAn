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
        public List<QL_DeTai_DTO> Search_DeTai(string? maDot, string? maGiangVien, string? maLop)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "Srearch_DeTai_TenDot_MaGiangVien_MaLop",
                   "@MaDot", maDot,
                   "@MaGiangVien", maGiangVien,
                   "@MaLop", maLop);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<QL_DeTai_DTO>().ToList();
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
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_ThemDeTai_SV",
                    "@TenDeTai", model.TenDeTai,
                    "@MaDot", model.maDot,
                    "@MaSinhVien", model.maSinhVien,
                    "@MaGiangVien", model.maGiangVien,
                    "@TrangThai", model.TrangThai,
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
                    "@MaDot", model.maDot,
                    "@MaGiangVien", model.maGiangVien,
                    "@TrangThai", model.TrangThai,
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

        public string Delete(int maDeTai, string taikhoan)
        {
            string msgError = "";
            string kq = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedure(out msgError, "sp_XoaDeTai",
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

        public List<QL_DeTai_DTO> GetAll()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "GetAllGiangVien");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<QL_DeTai_DTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string Update(QL_DeTai_DTO model, string taikhoan)
        {
            string msgError = "";
            string kq = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_SuaDeTai",
                    "@TenDeTai", model.TenDeTai,
                    "@MaDot", model.maDot,
                    "@MaSinhVien", model.maSinhVien,
                    "@TrangThai", model.TrangThai,
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
    }
}
