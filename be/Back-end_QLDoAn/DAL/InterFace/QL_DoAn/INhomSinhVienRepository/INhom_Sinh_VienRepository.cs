using DTO.QL_DoAn.NhomSinhVien;

namespace DAL.InterFace.QL_DoAn.INhomSinhVienRepository
{
    public partial interface INhom_Sinh_VienRepository
    {
        public List<V_NhomSinhVien_DTO> getNhombymaSinhVien(string? masinhvien, int ?isTruongNhom, string? maDot, string? maGiangVien);
        string Create(NhomSinhVienDTO model);
        string Delete(string manhom, string maTruongNhom);
    }
}
