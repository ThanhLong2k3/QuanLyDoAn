using DAL.InterFace.QL_HeThong;
using DTO.QL_HeThong;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.QL_HethongRepository
{
    public class nguoiDungRepository : INguoiDungRepository
    {
        private IDatabaseHelper _dbHelper;

        public nguoiDungRepository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public List<nguoiDung_DTO> GetAll()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "GetAllNguoiDung");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<nguoiDung_DTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<nguoiDung_DTO> GetById(string taikhoan)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "GetNguoiDungByTaiKhoan", "@taikhoan", taikhoan);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<nguoiDung_DTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string Create(nguoiDung_DTO model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "ThemNguoiDung",
                    "@taiKhoan", model.taiKhoan,
                    "@hoTen", model.hoTen,
                    "@ngaySinh", model.ngaySinh,
                    "@gioiTinh", model.gioiTinh,
                    "@email", model.email,
                    "@moTa", model.moTa
                );

                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError);
                }

                return Convert.ToString(result);
            }
            catch (Exception ex)
            {
                throw new Exception("Đã xảy ra lỗi trong quá trình thêm người dùng: " + ex.Message, ex);
            }
        }


        public bool Update(nguoiDung_DTO model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "SuaNguoiDung",
                    "@taiKhoan", model.taiKhoan,
                    "@matKhau", model.matKhau,
                    "@hoTen", model.hoTen,
                    "@ngaySinh", model.ngaySinh,
                    "@gioiTinh", model.gioiTinh,
                    "@email", model.email,
                    "@moTa", model.moTa,
                    "@trangThai", model.TrangThai
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

        public int DangNhap(DangNhapDTO model)
        {
            string msgError = "";
            try
            {
                // Gọi stored procedure và nhận giá trị trả về là DataTable
                var result = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "dangnhap",
                    "@taiKhoan", model.taiKhoan,
                    "@matKhau", model.matKhau);

                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);

                if (result != null && result.Rows.Count > 0)
                {
                    return Convert.ToInt32(result.Rows[0]["Role"]);
                }
                else
                {
                    return 0; 
                }
            }
            catch (Exception ex)
            {
                throw ex; 
            }
        }




    }
}
