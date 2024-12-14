using DAL.InterFace.QL_DoAn.IDotLamDoAnRepository;
using DTO.QL_DoAn.DotLamDoAn_DTO;

namespace DAL.QL_DoAnRepository.QL_DotLamDoAnRepository
{
    public class Dot_SinhVienRepository:IDot_SinhVienRepository
    {
        private IDatabaseHelper _dbHelper;

        public Dot_SinhVienRepository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }
        public string GET_MADOT_TAIKHOAN(string taikhoan)
        {
            string msgError = "";
            string kq;
            try
            {
                var dt = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "GET_DOT_TaiKhoan", "@TaiKhoan", taikhoan);
                if (dt != null)
                {
                    kq = dt.ToString();
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
        public List<V_Dot_SinhVienDTO> Get_SinhVien_MaDot(string madot)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "GET_SinhVien_MaDot", "@MaDot", madot);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<V_Dot_SinhVienDTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<V_Dot_SinhVienDTO> GetAll_SinhVien()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "GET_SinhVien");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<V_Dot_SinhVienDTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string Create(D_Dot_SinhVien model)
        {
            string msgError = "";
            string kq = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "Them_DotSinhVien",
                    "@maDot", model.maDot,
                    "@maSinhVien", model.maSinhVien
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
                throw new Exception("Đã xảy ra lỗi trong quá trình thêm lớp: " + ex.Message, ex);
            }
        }


        public string Delete(string maDot, string maSinhVien)
        {
            string msgError = "";
            string kq = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedure(out msgError, "Xoa_DotSinhVien",
                 "@maDot", maDot,
                    "@maSinhVien", maSinhVien);

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
    }
}
