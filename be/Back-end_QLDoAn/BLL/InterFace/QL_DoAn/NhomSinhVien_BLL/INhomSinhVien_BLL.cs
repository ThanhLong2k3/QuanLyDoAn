using DTO.QL_DoAn.NhomSinhVien;

namespace BLL.InterFace.QL_DoAn.NhomSinhVien_BLL
{
    public partial interface INhomSinhVien_BLL
    {
        public List<V_NhomSinhVien_DTO> getNhombymaSinhVien(string? masinhvien, int? isTruongNhom, string? maDot, string ? maGiangVien);
        string Create(NhomSinhVienDTO model);
        string Delete(string manhom, string maTruongNhom);
    }
}
