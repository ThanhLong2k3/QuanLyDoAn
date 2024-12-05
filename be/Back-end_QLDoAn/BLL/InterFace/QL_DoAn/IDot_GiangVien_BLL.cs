using DTO.QL_DoAn;

namespace BLL.InterFace.QL_DoAn
{
    public partial interface IDot_GiangVien_BLL
    {
        public List<V_Dot_GiangVienDTO> GetGiangVien_HD();

        public List<V_Dot_GiangVienDTO> GetGiangVien_MaDot(string maDot);
        string Create(Dot_GiangVienDTO model);
        string Update(Dot_GiangVienDTO model);
        string Delete(string madot, string magiangvien);
    }
}
