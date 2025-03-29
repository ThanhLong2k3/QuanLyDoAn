using DTO.QL_DoAn.NhomSinhVien;

namespace DAL.InterFace.QL_DoAn.INhomSinhVienRepository
{
    public partial interface IThanhVienNhomRepository
    {
        List<Get_ThanhVienNhom_DTO> get_ThanhVien_Id(string Id);
        string Delete(ThanhVienNhomDTO model, string maTruongNhom);
        string Create(ThanhVienNhomDTO model, string maTruongNhom);
    }
}
