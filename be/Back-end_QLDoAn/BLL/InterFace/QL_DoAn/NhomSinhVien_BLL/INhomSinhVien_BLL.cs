using DTO.QL_DoAn.NhomSinhVien;

namespace BLL.InterFace.QL_DoAn.NhomSinhVien_BLL
{
    public partial interface INhomSinhVien_BLL
    {
        public List<V_NhomSinhVien_DTO> getNhombymaSinhVien(string masinhvien);
        string Create(NhomSinhVienDTO model);
    }
}
