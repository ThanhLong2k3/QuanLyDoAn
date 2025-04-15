using DAL.InterFace.QL_DoAn.INhomSinhVienRepository;
using DTO.QL_DoAn.DotLamDoAn_DTO;
using DTO.QL_DoAn.HoiDong_DTO;
using DTO.QL_DoAn.NhomSinhVien;

namespace DAL.QL_DoAnRepository.NhomSinhVienRepository
{
    public class ThanhVienNhomRepository:IThanhVienNhomRepository
    {
        private IDatabaseHelper _dbHelper;

        public ThanhVienNhomRepository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }


        public string Create(ThanhVienNhomDTO model, string matruongnhom)
        {
            string msgError = "";
            string kq = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_ThemThanhVienNhom",
                  "@maNhom",model.maNhom,
                  "@maSinhVien",model.maSinhVien,
                  "@maTruongNhom",matruongnhom
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

        public string Delete(ThanhVienNhomDTO model, string maTruongNhom)
        {
            string msgError = "";
            string kq = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedure(out msgError, "sp_XoaThanhVienNhom",
                    "@maNhom", model.maNhom,
                    "@maSinhVienCanXoa", model.maSinhVien,
                    "@maTruongNhom", maTruongNhom
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

        public List<Get_ThanhVienNhom_DTO> get_ThanhVien_Id(string Id)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "get_member_id", "@Id_group", Id);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<Get_ThanhVienNhom_DTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
