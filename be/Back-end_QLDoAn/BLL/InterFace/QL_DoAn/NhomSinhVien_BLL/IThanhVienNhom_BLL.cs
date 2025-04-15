using DTO.QL_DoAn.NhomSinhVien;

namespace BLL.InterFace.QL_DoAn.NhomSinhVien_BLL
{
    public partial interface IThanhVienNhom_BLL
    {
        string Delete(ThanhVienNhomDTO model, string maTruongNhom);
        string Create(ThanhVienNhomDTO model, string maTruongNhom);
        List<Get_ThanhVienNhom_DTO> get_ThanhVien_Id(string Id);
    }
}
