using DAL.InterFace.QL_DanhMuc;
using DTO.QL_DanhMuc;

namespace DAL.QL_DanhMuc
{
    public class ChucVuRepository : IChucVuRepository
    {
        private IDatabaseHelper _dbHelper;

        public ChucVuRepository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        // Lấy tất cả các chức vụ
        public List<ChucVuDTO> GetAllChucVu()
        {
            string msgError = "";
            
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "GetAllChucVu");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<ChucVuDTO>().ToList();
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi lấy danh sách chức vụ: " + ex.Message, ex);
            }
        }

        // Lấy chức vụ theo mã chức vụ
        public ChucVuDTO GetChucVuById(string maChucVu)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "GetChucVuById", "@maChucVu", maChucVu);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);

                return dt.ConvertTo<ChucVuDTO>().FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi lấy chức vụ theo mã: " + ex.Message, ex);
            }
        }

        // Thêm chức vụ mới
        public string AddChucVu(ChucVuDTO chucVu)
        {
            string msgError = "";
            string kq;
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "InsertChucVu",
                    "@maChucVu", chucVu.maChucVu,
                    "@tenChucVu", chucVu.tenChucVu,
                    "@moTa", chucVu.moTa
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
                throw new Exception("Đã xảy ra lỗi trong quá trình thêm chức vụ: " + ex.Message, ex);
            }
        }

        // Cập nhật chức vụ
        public string UpdateChucVu(ChucVuDTO chucVu)
        {
            string msgError = "";
            string kq;
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "UpdateChucVu",
                    "@maChucVu", chucVu.maChucVu,
                    "@tenChucVu", chucVu.tenChucVu,
                    "@moTa", chucVu.moTa
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
                throw new Exception("Đã xảy ra lỗi trong quá trình cập nhật chức vụ: " + ex.Message, ex);
            }
        }

        // Xóa chức vụ
        public string  DeleteChucVu(string maChucVu)
        {
            string msgError = "";
            string kq;
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedure(out msgError, "DeleteChucVu", "@maChucVu", maChucVu);
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
                throw new Exception("Đã xảy ra lỗi trong quá trình xóa chức vụ: " + ex.Message, ex);
            }
        }
    }
}
