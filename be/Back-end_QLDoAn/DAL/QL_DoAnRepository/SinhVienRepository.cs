using DAL.InterFace.QL_DoAn;
using DTO.QL_DoAn;

namespace DAL.QL_DoAnRepository
{
    public class SinhVienRepository:ISinhVienRepository
    {
        private IDatabaseHelper _dbHelper;

        public SinhVienRepository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public List<SinhVienDTO> GetAll()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "GetAllSinhVien");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<SinhVienDTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public string Create(SinhVienDTO model, string taikhoan)
        {
            string msgError = "";
            string kq;
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "ThemSinhVien",
                   "@taiKhoan", taikhoan,
                    "@maSinhVien",model.maSinhVien,
                   "@tenSinhVien",model.tenSinhVien,
                   "@maLop",model.maLop,
                   "@ngaySinh",model.ngaySinh,
                   "@gioiTinh",model.gioiTinh,
                   "@sdt",model.sDT,
                   "@email",model.email
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


        public string Update(SinhVienDTO model, string taikhoan)
        {
            string msgError = "";
            string kq;
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "SuaSinhVien",
                   "@taiKhoan", taikhoan,
                    "@maSinhVien", model.maSinhVien,
                   "@tenSinhVien", model.tenSinhVien,
                   "@maLop", model.maLop,
                   "@ngaySinh", model.ngaySinh,
                   "@gioiTinh", model.gioiTinh,
                   "@sdt", model.sDT,
                   "@email", model.email
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
            string kq;
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedure(out msgError, "XoaSinhVien",
                    "@taiKhoan", taikhoan,
                    "@maSinhVien", ma);

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
