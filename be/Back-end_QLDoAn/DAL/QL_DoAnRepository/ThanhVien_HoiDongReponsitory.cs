using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.InterFace.QL_DoAn;
using DTO.QL_DoAn;

namespace DAL.QL_DoAnRepository
{
    public class ThanhVien_HoiDongReponsitory:IThem_ThanhVien_HoiDong
    {
        private IDatabaseHelper _dbHelper;

        public ThanhVien_HoiDongReponsitory(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }
        public string Create(ThanhVien_HoiDongDTO model, string taikhoan)
        {
            string msgError = "";
            string kq = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "Them_ThanhVien_HoiDong",
                   "@taiKhoan", taikhoan,
                   "@maHoiDong",model.maHoiDong,
                   "@maThanhVien",model.maThanhVien,
                   "@loaiThanhVien",model.loaiThanhVien
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
        public string Delete(ThanhVien_HoiDongDTO model, string taikhoan)
        {
            string msgError = "";
            string kq = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedure(out msgError, "Xoa_ThanhVien_HoiDong",
                        "@taiKhoan", taikhoan,
                   "@maHoiDong", model.maHoiDong,
                   "@maThanhVien", model.maThanhVien,
                   "@loaiThanhVien", model.loaiThanhVien
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
                throw ex;
            }
        }

    }
}
