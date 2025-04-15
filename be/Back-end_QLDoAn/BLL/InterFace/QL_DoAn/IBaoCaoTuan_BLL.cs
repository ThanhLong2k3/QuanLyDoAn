using DTO.QL_DoAn;

namespace BLL.InterFace.QL_DoAn
{
    public partial interface IBaoCaoTuan_BLL
    {
        List<BaoCaoTuanDTO> GetBaoCaoTuan_MaDeTai(string ID);
        string Create(BaoCaoTuanDTO model);
        string Update(BaoCaoTuanDTO model);
    }
}
