using DAL.InterFace.QL_DoAn;
using DTO.QL_DoAn;

namespace DAL.QL_DoAnRepository
{
    public class PhanCongHuongDanRepository: IPhanCongHuongDanRepository
    {
        private IDatabaseHelper _dbHelper;

        public PhanCongHuongDanRepository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public List<V_PhanCongHuongDan> GetAll_PhanCong_MaDot(string maDot)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "GET_PHANCONG_MADOT","@MaDot",maDot);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<V_PhanCongHuongDan>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public string Create(D_PhanCongHuongDanDTO model, string taikhoan)
        {
            string msgError = "";
            string kq = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_ThemPhanCongHuongDan",
                   "@taiKhoan", taikhoan,
                    "@maDot",model.maDot,
                    "@maSinhVien",model.maSinhVien,
                    "@maGiangVien",model.maGiangVien
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


        public string Update(D_PhanCongHuongDanDTO model, string taiKhoan)
        {
            string msgError = "";
            string kq = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_SuaGiaoVienHuongDan",
                  "@taiKhoan", taiKhoan,
                    "@maDot", model.maDot,
                    "@maSinhVien", model.maSinhVien,
                    "@maGiangVien", model.maGiangVien
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
                throw new Exception("Đã xảy ra lỗi trong quá trình cập nhật người dùng: " + ex.Message, ex);
            }
        }
        

    }
}
