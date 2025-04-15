using DTO.QL_DoAn;

namespace DAL.InterFace.QL_DoAn
{
    public partial interface IBaoCaoTuanReponsitory
    {
        List<BaoCaoTuanDTO> GetBaoCaoTuan_MaDeTai(string ID);
        string Create(BaoCaoTuanDTO model);
        string Update(BaoCaoTuanDTO model);
    }
}
