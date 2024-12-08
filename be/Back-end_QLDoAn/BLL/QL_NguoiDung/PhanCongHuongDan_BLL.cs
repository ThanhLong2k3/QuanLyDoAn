using BLL.InterFace.QL_DoAn;
using DAL.InterFace.QL_DoAn;
using DTO.QL_DoAn;

namespace BLL.QL_NguoiDung
{
    public class PhanCongHuongDan_BLL:IPhanCongHuongDan_BLL
    {
        private IPhanCongHuongDanRepository _res;
        public PhanCongHuongDan_BLL(IPhanCongHuongDanRepository res)
        {
            _res = res;
        }
        public List<V_PhanCongHuongDan> GetAll_PhanCong_MaDot(string madot)
        {
            return _res.GetAll_PhanCong_MaDot(madot);
        }
        public string Create(D_PhanCongHuongDanDTO model, string taikhoan)
        {
            return _res.Create(model, taikhoan);
        }
        public string Update(D_PhanCongHuongDanDTO model, string taikhoan)
        {
            return _res.Update(model, taikhoan);
        }
      
    }
}
