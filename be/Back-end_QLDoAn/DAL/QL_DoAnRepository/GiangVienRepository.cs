using DAL.InterFace.QL_DoAn;
using DTO.QL_DoAn;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.QL_DoAnRepository
{
    public class GiangVienRepository:IGiangVienReposirooty
    {
        private IDatabaseHelper _dbHelper;

        public GiangVienRepository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public List<GiangVienDTO> GetAll()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "GetAllNguoiDung");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<GiangVienDTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public string Create(GiangVienDTO model, string taikhoan)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "ThemGiangVien",
                   "@taiKhoan", taikhoan,
                    "@maGiangVien",model.maGiangVien,
                   "@tenGiangVien",model.tenGiangVien,
                   "@tenBoMon",model.tenBoMon,
                   "@chucVu",model.chucVu,
                   "@tenHocVi",model.tenHocVi,
                   "@tenHocHam",model.tenHocHam,
                   "@sdt",model.sDT,
                   "@email",model.email
                );

                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError);
                }

                return Convert.ToString(result);
            }
            catch (Exception ex)
            {
                throw new Exception("Đã xảy ra lỗi trong quá trình thêm lớp: " + ex.Message, ex);
            }
        }


        public bool Update(GiangVienDTO model,string taiKhoan)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "SuaGiangVien",
                    "@taiKhoan", taiKhoan,
                    "@maGiangVien", model.maGiangVien,
                   "@tenGiangVien", model.tenGiangVien,
                   "@tenBoMon", model.tenBoMon,
                   "@chucVu", model.chucVu,
                   "@tenHocVi", model.tenHocVi,
                   "@tenHocHam", model.tenHocHam,
                   "@sdt", model.sDT,
                   "@email", model.email
                );

                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError);
                }

                if (result != null && !string.IsNullOrEmpty(result.ToString()))
                {
                    return true;
                }

                return false;
            }
            catch (Exception ex)
            {
                throw new Exception("Đã xảy ra lỗi trong quá trình cập nhật người dùng: " + ex.Message, ex);
            }
        }
        public bool Delete(string ma, string taikhoan)
        {
            string msgError = "";
            bool kq;
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedure(out msgError, "XoaGiangVien",
                    "@taiKhoan", taikhoan,
                    "@maGiangVien", ma);

                if (result != null && result.ToString().Contains("thành công"))
                {
                    kq = true;
                }
                else
                {
                    kq = false;
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
