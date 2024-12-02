using DTO.QL_DanhMuc;

namespace DAL.InterFace.QL_DanhMuc
{
    public interface  IHocHamReponsitory
    {
        List<HocHamDTO> GetAllHocHam();
        string AddHocHam(HocHamDTO HocHam);
        string UpdateHocHam(HocHamDTO HocHam);
        string DeleteHocHam(string maHocHam_HocHam);
    }
}
