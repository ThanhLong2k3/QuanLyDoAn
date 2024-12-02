using DTO.QL_DanhMuc;

namespace DAL.InterFace.QL_DanhMuc
{
    public interface IHocViRepository
    {
        List<HocViDTO> GetAllHocVi_HocVi();
        string AddHocVi(HocViDTO HocVi);
        string UpdateHocVi(HocViDTO HocVi);
        string DeleteHocVi(string maHocHam_HocVi);
    }

}
