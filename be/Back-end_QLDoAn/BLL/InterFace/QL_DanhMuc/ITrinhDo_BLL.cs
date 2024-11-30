using DTO.QL_DanhMuc;

namespace BLL.InterFace.QL_DanhMuc
{
    public partial interface ITrinhDo_BLL
    {
        List<TrinhDoDTO> GetAllTrinhDo_HocHam();
        List<TrinhDoDTO> GetAllTrinhDo_HocVi();
        string AddTrinhDo(TrinhDoDTO trinhDo);
        string UpdateTrinhDo(TrinhDoDTO trinhDo);
        string DeleteTrinhDo(string maHocHam_HocVi);
    }
}
