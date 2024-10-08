using DAL.InterFace.QL_HeThong;
using DTO.QL_HeThong;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
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
                    "@taiKhoan", model.TaiKhoan,
                    "@hoTen", model.HoTen,
                    "@ngaySinh", model.NgaySinh,
                    "@email", model.Email,
                    "@moTa", model.MoTa
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
                    "@taiKhoan", model.TaiKhoan,
                    "@matKhau", model.MatKhau,
                    "@hoTen", model.HoTen,
                    "@ngaySinh", model.NgaySinh,
                    "@email", model.Email,
                    "@moTa", model.MoTa,
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


        public bool Delete(string tk)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedure(out msgError, "XoaNguoiDung", "@taiKhoan", tk);
                if (Convert.ToInt32(result) > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
