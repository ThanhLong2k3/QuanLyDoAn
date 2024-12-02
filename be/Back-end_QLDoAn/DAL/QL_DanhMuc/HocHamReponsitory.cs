using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.InterFace.QL_DanhMuc;
using DTO.QL_DanhMuc;

namespace DAL.QL_DanhMuc
{
    public class HocHamReponsitory:IHocHamReponsitory
    {
        private IDatabaseHelper _dbHelper;

        public HocHamReponsitory(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        // Lấy tất cả các Học hàm
        public List<HocHamDTO> GetAllHocHam()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "GetAllTrinhDo_HocHam");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<HocHamDTO>().ToList();
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi lấy danh sách Học hàm: " + ex.Message, ex);
            }
        }
        public List<HocHamDTO> GetAllHocHam_HocHam()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "GetAllHocHam_HocHam");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<HocHamDTO>().ToList();
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi lấy danh sách Học hàm: " + ex.Message, ex);
            }

        }


        public string AddHocHam(HocHamDTO HocHam)
        {
            string msgError = "";
            string kq;
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "InsertHocHam",
                    "@maHocHam", HocHam.maHocHam,
                    "@tenHocHam", HocHam.tenHocHam,
                    "@kyHieu", HocHam.kyHieu,
                    "@moTa", HocHam.moTa,
                    "@soLuongHuongDan", HocHam.soLuongHuongDan

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
                throw new Exception("Đã xảy ra lỗi trong quá trình thêm Học hàm: " + ex.Message, ex);
            }
        }

        // Cập nhật Học hàm
        public string UpdateHocHam(HocHamDTO HocHam)
        {
            string msgError = "";
            string kq;
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "UpdateHocHam",
                    "@maHocHam", HocHam.maHocHam,
                    "@tenHocHam", HocHam.tenHocHam,
                    "@kyHieu", HocHam.kyHieu,
                    "@moTa", HocHam.moTa,
                    "@soLuongHuongDan", HocHam.soLuongHuongDan

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
                throw new Exception("Đã xảy ra lỗi trong quá trình cập nhật Học hàm: " + ex.Message, ex);
            }
        }

        // Xóa Học hàm
        public string DeleteHocHam(string maHocHam)
        {
            string msgError = "";
            string kq;
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedure(out msgError, "DeleteHocHam", "@maHocHam", maHocHam);

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
                throw new Exception("Đã xảy ra lỗi trong quá trình xóa Học hàm: " + ex.Message, ex);
            }
        }
    }
}
