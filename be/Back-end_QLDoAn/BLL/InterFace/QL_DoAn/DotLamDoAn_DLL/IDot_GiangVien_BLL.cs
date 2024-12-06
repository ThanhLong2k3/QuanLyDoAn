using DTO.QL_DoAn.DotLamDoAn_DTO;

namespace BLL.InterFace.QL_DoAn.DotLamDoAn_DLL
{
    public partial interface IDot_GiangVien_BLL
    {
        public List<V_Dot_GiangVienDTO> GetGiangVien_HD();

        public List<V_Dot_GiangVienDTO> GetGiangVien_MaDot(string maDot);
        string Create(D_Dot_GiangVienDTO model);
        string Update(D_Dot_GiangVienDTO model);
        string Delete(string madot, string magiangvien);
    }
}
