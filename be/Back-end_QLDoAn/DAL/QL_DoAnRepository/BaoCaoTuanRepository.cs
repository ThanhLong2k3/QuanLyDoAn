using DAL.InterFace.QL_DoAn;
using DTO.QL_DoAn;

namespace DAL.QL_DoAnRepository
{
    public class BaoCaoTuanRepository : IBaoCaoTuanReponsitory
    {
        private IDatabaseHelper _dbHelper;

        public BaoCaoTuanRepository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }
        public string Create(BaoCaoTuanDTO model)
        {
            string msgError = "";
            string kq;
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_ThemBaoCaoTuan",
                   "@MaDeTai",model.MaDeTai,
                   "@SoTuan",model.SoTuan,
                   "@TuNgay",model?.TuNgay,
                   "@DenNgay",model?.DenNgay,
                   "@CongViec",model?.CongViec,
                   "@NoiDungThucHien",model?.NoiDungThucHien,
                   "@KetQuaDatDuoc",model?.KetQuaDatDuoc,
                   "@NoiDungBaoCao",model?.NoiDungBaoCao,
                   "@DuongDanBaoCao",model?.DuongDanBaoCao,
                   "@NhanXetCuaGiangVien",model.NhanXetCuaGiangVien,
                   "@Diem",model.Diem
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

        public List<BaoCaoTuanDTO> GetBaoCaoTuan_MaDeTai(string ID)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "GET_BAOCAO_MADETAI", "@MaDeTai", ID);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<BaoCaoTuanDTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string Update(BaoCaoTuanDTO model)
        {
            string msgError = "";
            string kq;
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_SuaBaoCaoTuan",
                    "@MaBaoCao",model?.MaBaoCao,
                   "@MaDeTai", model.MaDeTai,
                   "@SoTuan", model.SoTuan,
                   "@TuNgay", model?.TuNgay,
                   "@DenNgay", model?.DenNgay,
                   "@CongViec", model?.CongViec,
                   "@NoiDungThucHien", model?.NoiDungThucHien,
                   "@KetQuaDatDuoc", model?.KetQuaDatDuoc,
                   "@NoiDungBaoCao", model?.NoiDungBaoCao,
                   "@DuongDanBaoCao", model?.DuongDanBaoCao,
                   "@NhanXetCuaGiangVien", model.NhanXetCuaGiangVien,
                   "@Diem", model.Diem
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
    }
}
