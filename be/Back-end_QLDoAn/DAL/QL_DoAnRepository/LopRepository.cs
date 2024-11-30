using DAL.InterFace.QL_DoAn;
using DTO.QL_DoAn;

namespace DAL.QL_DoAnRepository
{
    public class LopRepository:ILopRepository
    {

        private IDatabaseHelper _dbHelper;

        public LopRepository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public List<LopDTO> GetAll()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "GetAllLop");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<LopDTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

     
        public string Create(LopDTO model, string taikhoan)
        {
            string msgError = "";
            string kq = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "ThemLop",
                   "@taiKhoan",taikhoan,
                    "@maLop", model.maLop,
                    "@tenLop", model.tenLop,
                    "@tenChuyenNganh", model.tenChuyenNganh,
                    "@khoaHoc", model.khoaHoc
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


        public string Update(LopDTO model, string taikhoan)
        {
            string msgError = "";
            string kq = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "SuaLop",
                    "@taiKhoan", taikhoan,
                    "@maLop",model.maLop,
                    "@tenLop",model.tenLop,
                    "@tenChuyenNganh", model.tenChuyenNganh,
                    "@khoaHoc",model.khoaHoc
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
        public string Delete(string ma, string taikhoan)
        {
            string msgError = "";
            string kq = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedure(out msgError, "XoaLop",
                    "@taiKhoan", taikhoan,
                    "@maLop", ma);

                if (result != null )
                {
                    kq= result.ToString();
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
