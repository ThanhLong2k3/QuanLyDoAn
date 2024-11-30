using DAL.InterFace.QL_DanhMuc;
using DTO.QL_DanhMuc;

namespace DAL.QL_DanhMuc
{
    public class KhoaRepository : IKhoaRepository
    {
        private IDatabaseHelper _dbHelper;

        public KhoaRepository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        // Lấy tất cả các khoa
        public List<KhoaDTO> GetAllKhoa()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "GetAllKhoa");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<KhoaDTO>().ToList();
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi lấy danh sách Khoa: " + ex.Message, ex);
            }
        }

        // Lấy khoa theo mã khoa
        public KhoaDTO GetKhoaById(string maKhoa)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "GetKhoaById", "@maKhoa", maKhoa);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);

                return dt.ConvertTo<KhoaDTO>().FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi lấy Khoa theo mã: " + ex.Message, ex);
            }
        }

        // Thêm khoa mới
        public string AddKhoa(KhoaDTO khoa)
        {
            string msgError = "";
            string kq;
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "InsertKhoa",
                    "@maKhoa", khoa.maKhoa,
                    "@tenKhoa", khoa.tenKhoa
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
                throw new Exception("Đã xảy ra lỗi trong quá trình thêm Khoa: " + ex.Message, ex);
            }
        }

        // Cập nhật khoa
        public string UpdateKhoa(KhoaDTO khoa)
        {
            string msgError = "";
            string kq;
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "UpdateKhoa",
                    "@maKhoa", khoa.maKhoa,
                    "@tenKhoa", khoa.tenKhoa
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
                throw new Exception("Đã xảy ra lỗi trong quá trình cập nhật Khoa: " + ex.Message, ex);
            }
        }

        // Xóa khoa
        public string DeleteKhoa(string maKhoa)
        {
            string msgError = "";
            string kq;
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedure(out msgError, "DeleteKhoa", "@maKhoa", maKhoa);

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
                throw new Exception("Đã xảy ra lỗi trong quá trình xóa Khoa: " + ex.Message, ex);
            }
        }
    }
}
