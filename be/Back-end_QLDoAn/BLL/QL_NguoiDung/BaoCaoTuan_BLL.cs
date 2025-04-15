using BLL.InterFace.QL_DoAn;
using DAL.InterFace.QL_DoAn;
using DTO.QL_DoAn;

namespace BLL.QL_NguoiDung
{
    public class BaoCaoTuan_BLL : IBaoCaoTuan_BLL
    {
        private IBaoCaoTuanReponsitory _res;
        public BaoCaoTuan_BLL(IBaoCaoTuanReponsitory res)
        {
            _res = res;
        }
        public string Create(BaoCaoTuanDTO model)
        {
            return _res.Create(model);
        }

        public List<BaoCaoTuanDTO> GetBaoCaoTuan_MaDeTai(string ID)
        {
            return _res.GetBaoCaoTuan_MaDeTai(ID);
        }

        public string Update(BaoCaoTuanDTO model)
        {
           return _res.Update(model);
        }
    }
}
