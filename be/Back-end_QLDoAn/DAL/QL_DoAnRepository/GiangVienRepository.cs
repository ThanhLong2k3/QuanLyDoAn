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
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "GetAllGiangVien");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<GiangVienDTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public string Create(D_GiangVienDTO model, string taikhoan)
        {
            string msgError = "";
            string kq = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "ThemGiangVien",
                   "@taiKhoan", taikhoan,
                    "@maGiangVien",model.maGiangVien,
                   "@tenGiangVien",model.tenGiangVien,
                   "@IDBoMon", model.IDBoMon,
                   "@IDChucVu", model.IDChucVu,
                   "@IDHocVi", model?.IDHocVi,
                   "@IDHocHam", model?.IDHocHam,
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


        public string Update(D_GiangVienDTO model,string taiKhoan)
        {
            string msgError = "";
            string kq = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "SuaGiangVien",
                   "@taiKhoan", taiKhoan,
                    "@maGiangVien", model.maGiangVien,
                   "@tenGiangVien", model.tenGiangVien,
                   "@IDBoMon", model.IDBoMon,
                   "@IDChucVu", model.IDChucVu,
                   "@IDHocVi", model.IDHocVi,
                   "@IDHocHam", model.IDHocHam,
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
            string kq="";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedure(out msgError, "XoaGiangVien",
                    "@taiKhoan", taikhoan,
                    "@maGiangVien", ma);

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
