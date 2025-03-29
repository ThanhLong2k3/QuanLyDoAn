using DTO.QL_DoAn.DotLamDoAn_DTO;
using DTO.QL_DoAn.NhomSinhVien;

namespace DAL.InterFace.QL_DoAn.INhomSinhVienRepository
{
    public partial interface INhom_Sinh_VienRepository
    {
        public List<V_NhomSinhVien_DTO> getNhombymaSinhVien(string masinhvien);
        string Create(NhomSinhVienDTO model);
    }
}
