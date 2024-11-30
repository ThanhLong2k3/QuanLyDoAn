using DAL.InterFace.QL_DanhMuc;
using DTO.QL_DanhMuc;

namespace DAL.QL_DanhMucRepository
{
    public class BoMonRepository : IBoMonRepository
    {
        private IDatabaseHelper _dbHelper;

        public BoMonRepository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        // Lấy tất cả bộ môn
        public List<BoMonDTO> GetAllBoMon()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "GetAllBoMon");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<BoMonDTO>().ToList();
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi lấy danh sách bộ môn: " + ex.Message, ex);
            }
        }

        // Lấy bộ môn theo mã bộ môn
        public BoMonDTO GetBoMonById(string maBoMon)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "GetBoMonById", "@maBoMon", maBoMon);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);

                return dt.ConvertTo<BoMonDTO>().FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi lấy bộ môn theo mã: " + ex.Message, ex);
            }
        }

        // Thêm bộ môn mới
        public string AddBoMon(BoMonDTO boMon)
        {
            string msgError = "";
            string kq;
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "InsertBoMon",
                    "@maBoMon", boMon.maBoMon,
                    "@tenBoMon", boMon.tenBoMon,
                    "@tenKhoa", boMon.tenKhoa
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
                throw new Exception("Đã xảy ra lỗi trong quá trình thêm bộ môn: " + ex.Message, ex);
            }
        }

        // Cập nhật bộ môn
        public string UpdateBoMon(BoMonDTO boMon)
        {
            string msgError = "";
            string kq;
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "UpdateBoMon",
                    "@maBoMon", boMon.maBoMon,
                    "@tenBoMon", boMon.tenBoMon,
                    "@tenKhoa", boMon.tenKhoa
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
                throw new Exception("Đã xảy ra lỗi trong quá trình cập nhật bộ môn: " + ex.Message, ex);
            }
        }

        // Xóa bộ môn
        public string DeleteBoMon(string maBoMon)
        {
            string msgError = "";
            string kq;
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedure(out msgError, "DeleteBoMon", "@maBoMon", maBoMon);

                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);

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
                throw new Exception("Đã xảy ra lỗi trong quá trình xóa bộ môn: " + ex.Message, ex);
            }
        }
    }
}
