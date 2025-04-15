using DAL.InterFace.QL_DoAn.IDotLamDoAnRepository;
using DTO.QL_DoAn.DotLamDoAn_DTO;

namespace DAL.QL_DoAnRepository.QL_DotLamDoAnRepository
{
    public class DotLamDoAnRepository : IDotLmaDoAnRepository
    {
        private IDatabaseHelper _dbHelper;

        public DotLamDoAnRepository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public List<DotLamDoAnDTO> Get_Dot_TK(string tk)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "GET_DOT_TAIKHOAN_GV", "@TaiKhoan",tk);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<DotLamDoAnDTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<DotLamDoAnDTO> GetAll()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "GetAll_DotLamDoAn");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<DotLamDoAnDTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<DotLamDoAnDTO> GetBYID()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "GET_DOT_ID");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<DotLamDoAnDTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string Create(DotLamDoAnDTO model, string taikhoan)
        {
            string msgError = "";
            string kq = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "Them_DotLamDoAn",
                    "@taiKhoan", taikhoan,
                    "@maDot", model.maDot,
                    "@tenDot", model.tenDot,
                    "@ngayBatDau", model.ngayBatDau,
                    "@namApDung", model.namApDung,
                    "@dangKyDeTai", model.dangKyDeTai,
                    "@choPhepSinhVienDangKyGiangVienKhacBoMon", model.choPhepSinhVienDangKyGiangVienKhacBoMon,
                    "@choPhepSinhVienBaoCaoKhacTuanHienTai", model.choPhepSinhVienBaoCaoKhacTuanHienTai,
                    "@choPhepGiangVienBaoCaoKhacTuanHienTai", model.choPhepGiangVienBaoCaoKhacTuanHienTai,
                    "@choPhepGiangVienSuaDeTai", model.choPhepGiangVienSuaDeTai,
                    "@trangThai", model.trangThai
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


        public string Update(DotLamDoAnDTO model, string taikhoan)
        {
            string msgError = "";
            string kq = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "Sua_DotLamDoAn",
                   "@taiKhoan", taikhoan,
                    "@maDot", model.maDot,
                    "@tenDot", model.tenDot,
                    "@ngayBatDau", model.ngayBatDau,
                    "@namApDung", model.namApDung,
                    "@dangKyDeTai", model.dangKyDeTai,
                    "@choPhepSinhVienDangKyGiangVienKhacBoMon", model.choPhepSinhVienDangKyGiangVienKhacBoMon,
                    "@choPhepSinhVienBaoCaoKhacTuanHienTai", model.choPhepSinhVienBaoCaoKhacTuanHienTai,
                    "@choPhepGiangVienBaoCaoKhacTuanHienTai", model.choPhepGiangVienBaoCaoKhacTuanHienTai,
                    "@choPhepGiangVienSuaDeTai", model.choPhepGiangVienSuaDeTai,
                    "@trangThai", model.trangThai
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
                var result = _dbHelper.ExecuteScalarSProcedure(out msgError, "Xoa_DotLamDoAn",
                    "@taiKhoan", taikhoan,
                    "@maDot", ma);

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
