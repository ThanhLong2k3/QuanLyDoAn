using System.Reflection;
using DAL.InterFace.QL_DoAn.INhomSinhVienRepository;
using DTO.QL_DoAn.HoiDong_DTO;
using DTO.QL_DoAn.NhomSinhVien;

namespace DAL.QL_DoAnRepository.NhomSinhVienRepository
{
    public class NhomSinhVienRepository:INhom_Sinh_VienRepository
    {

            private IDatabaseHelper _dbHelper;

            public NhomSinhVienRepository(IDatabaseHelper dbHelper)
            {
                _dbHelper = dbHelper;
            }
        public List<V_NhomSinhVien_DTO> getNhombymaSinhVien(string? masinhvien, int? isTruongNhom, string? maDot, string? maGiangVien)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_LayNhomTheoSinhVien",
                    "@maSinhVien",masinhvien,
                    "@isTruongNhom", isTruongNhom,
                    "@maDot",maDot,
                    "maGiangVien",maGiangVien);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<V_NhomSinhVien_DTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public string Create(NhomSinhVienDTO model)
            {
                string msgError = "";
                string kq = "";
                try
                {
                    var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_TaoNhomSinhVien",
                        "@maNhom",model.maNhom,
                        "@tenNhom",model.tenNhom,
                        "@maSinhVienTruong",model.maSinhVienTruong
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

        public string Delete(string manhom, string maTruongNhom)
        {
            string msgError = "";
            string kq = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedure(out msgError, "sp_XoaNhomCungNeuLaTruongNhom",
                    "@maNhom", manhom,
                    "@maSinhVien", maTruongNhom
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
