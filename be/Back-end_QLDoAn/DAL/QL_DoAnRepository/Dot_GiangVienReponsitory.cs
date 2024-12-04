using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.InterFace.QL_DoAn;
using DTO.QL_DoAn;

namespace DAL.QL_DoAnRepository
{
    public class Dot_GiangVienReponsitory : IDot_GiangVienReponsitory
    {
        private IDatabaseHelper _dbHelper;

        public Dot_GiangVienReponsitory(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public List<Dot_GiangVienDTO> GetGiangVien_MaDot(string madot)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "GET_GiangVien_MaDot","@MaDot",madot);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<Dot_GiangVienDTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        
        public string Create(Dot_GiangVienDTO model)
        {
            string msgError = "";
            string kq = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "Them_DotGiangVien",
                    "@maDot",model.maDot,
                    "@maGiangVien",model.maGiangVien,
                    "@soLuongHuongDan",model.soLuongHuongDan
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


        public string Update(Dot_GiangVienDTO model)
        {
            string msgError = "";
            string kq = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "Sua_DotGiangVien",
                   "@maDot", model.maDot,
                    "@maGiangVien", model.maGiangVien,
                    "@soLuongHuongDan", model.soLuongHuongDan
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
        public string Delete(string madot,string magv)
        {
            string msgError = "";
            string kq = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedure(out msgError, "Xoa_DotGiangVien",
                   "@maDot",madot,
                   "@maGiangVien",magv);

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
