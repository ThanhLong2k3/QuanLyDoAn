using DAL.InterFace.QL_DoAn;
using DTO.QL_DoAn;
using DTO.QL_HeThong;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "ThemLop",
                   "@taiKhoan",taikhoan,
                    "@maLop", model.maLop,
                    "@tenLop", model.tenLop,
                    "@tenChuyenNghanh", model.tenChuyenNganh,
                    "@khoaHoc", model.khoaHoc
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


        public bool Update(LopDTO model, string taikhoan)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "SuaLop",
                    "@taiKhoan", taikhoan,
                    "@maLop",model.maLop,
                    "@tenLop",model.tenLop,
                    "@tenChuyenNghanh",model.tenChuyenNganh,
                    "@khoaHoc",model.khoaHoc
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
                var result = _dbHelper.ExecuteScalarSProcedure(out msgError, "XoaLop",
                    "@taiKhoan", taikhoan,
                    "@maLop", ma);

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
