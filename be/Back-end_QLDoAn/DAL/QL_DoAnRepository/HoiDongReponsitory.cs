using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.InterFace.QL_DoAn;
using DTO.QL_DoAn;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace DAL.QL_DoAnRepository
{
    public class HoiDongReponsitory:IHoiDongReponsitory
    {
        private IDatabaseHelper _dbHelper;

        public HoiDongReponsitory(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public List<HoiDongDTO> GetAll()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "GetAll_HoiDong");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<HoiDongDTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public string Create(HoiDongDTO model, string taikhoan)
        {
            string msgError = "";
            string kq = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "Them_HoiDong",
                   "@taiKhoan", taikhoan,
                    "@maHoiDong",model.maHoiDong,
                    "@tenHoiDong",model.tenHoiDong,
                    "@maDot", model.maDot,
                    "@thuocLop",model.thuocLop,
                    "@phong",model.phong,
                    "@ngayDuKien",model.ngayDuKien
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


        public string Update(HoiDongDTO model, string taikhoan)
        {
            string msgError = "";
            string kq = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "Sua_HoiDong",
                     "@taiKhoan", taikhoan,
                    "@maHoiDong", model.maHoiDong,
                    "@tenHoiDong", model.tenHoiDong,
                    "@maDot", model.maDot,
                    "@thuocLop", model.thuocLop,
                    "@phong", model.phong,
                    "@ngayDuKien", model.ngayDuKien
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
                var result = _dbHelper.ExecuteScalarSProcedure(out msgError, "Xoa_HoiDong",
                    "@taiKhoan", taikhoan,
                    "@maHoiDong", ma);

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
