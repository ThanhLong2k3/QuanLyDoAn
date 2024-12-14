using DAL.InterFace.QL_DoAn;
using DTO.QL_DoAn;

namespace DAL.QL_DoAnRepository
{
    public class QL_DeTaiRepository : IQuanLyDeTaiRepository
    {
        private IDatabaseHelper _dbHelper;

        public QL_DeTaiRepository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }
        public string Create(QL_DeTaiDTO model, string taikhoan)
        {
            string msgError = "";
            string kq = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_ThemDeTai",
                    "@TenDeTai", model.TenDeTai,
                    "@NamHocApDung", model.NamHocApDung,
                    "@MaDot", model.maDot,
                    "@HinhThucBaoCaoBaoVe",model.HinhThucBaoCaoBaoVe,
                    "@MoTa",model.MoTa,
                    "@TaiKhoan",taikhoan
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

        public List<QL_DeTaiDTO> GetAll()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "GetAllGiangVien");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<QL_DeTaiDTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string Update(QL_DeTaiDTO model, string taikhoan)
        {
            string msgError = "";
            string kq = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_SuaDeTai",
                    "@TenDeTai", model.TenDeTai,
                    "@NamHocApDung", model.NamHocApDung,
                    "@MaDot", model.maDot,
                    "@HinhThucBaoCaoBaoVe", model.HinhThucBaoCaoBaoVe,
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
