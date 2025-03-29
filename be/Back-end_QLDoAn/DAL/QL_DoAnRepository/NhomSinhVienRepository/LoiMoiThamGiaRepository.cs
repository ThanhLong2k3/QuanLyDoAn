using DAL.InterFace.QL_DoAn.INhomSinhVienRepository;
using DTO.QL_DoAn.NhomSinhVien;

namespace DAL.QL_DoAnRepository.NhomSinhVienRepository
{
    public class LoiMoiThamGiaRepository: ILoiMoiThamGiaNhomRepository
    {
        private IDatabaseHelper _dbHelper;

        public LoiMoiThamGiaRepository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public List<LoiMoiThamGiaNhom_DTO> LayLoiMoiChoXacNhan(string masinhvien)
        {

            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_LayLoiMoiChoXacNhan", "@maSinhVien", masinhvien);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<LoiMoiThamGiaNhom_DTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public string GuiLoiMoi(GuiLoiMoi_DTO model)
        {
            string msgError = "";
            string kq = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_GuiLoiMoiThamGiaNhom",
                    "@maNhom", model.maNhom,
                    "@maSinhVienMoi", model.maSinhVienMoi,
                    "@maNguoiMoi", model.maNguoiMoi
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
                throw new Exception("Đã xảy ra lỗi trong quá trình gửi lời mời: " + ex.Message, ex);
            }
        }

        public string XuLyLoiMoi(XuLyLoiMoi_DTO model)
        {
            string msgError = "";
            string kq = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_XuLyLoiMoiThamGia",
                    " @idLoiMoi", model.MaLoiMoi,
                    "@maSinhVien", model.MaSinhVien,
                    "@chapNhan", model.TraLoi
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
                throw new Exception("Đã xảy ra lỗi trong quá trình trình gửi lời mời: " + ex.Message, ex);
            }
        }
    }
}
