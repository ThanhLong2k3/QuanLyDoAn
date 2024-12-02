using DTO.QL_DanhMuc;

namespace BLL.InterFace.QL_DanhMuc
{
    public partial interface IHocVi_BLL
    {
        List<HocViDTO> GetAllHocVi();
        string AddHocVi(HocViDTO HocVi);
        string UpdateHocVi(HocViDTO HocVi);
        string DeleteHocVi(string maHocHam_HocVi);
    }
}
