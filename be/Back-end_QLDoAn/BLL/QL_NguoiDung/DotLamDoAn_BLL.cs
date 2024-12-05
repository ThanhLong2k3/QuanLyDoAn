using BLL.InterFace.QL_DoAn;
using DAL.InterFace.QL_DoAn;
using DTO.QL_DoAn;

namespace BLL.QL_NguoiDung
{
    public class DotLamDoAn_BLL : IDotLamDoAn_BLL
    {
        private IDotLmaDoAnRepository _res;
        public DotLamDoAn_BLL(IDotLmaDoAnRepository res)
        {
            _res = res;
        }
        public List<DotLamDoAnDTO> GetAll()
        {
            return _res.GetAll();
        }
        public List<DotLamDoAnDTO> GetBYID()
        {
            return _res.GetBYID();
        }
        public string Create(DotLamDoAnDTO model,string tk)
        {
            return _res.Create(model,tk);
        }
        public string Update(DotLamDoAnDTO model, string taikhoan)
        {
            return _res.Update(model, taikhoan);
        }
        public string Delete(string maDot, string taikhoan)
        {
            return _res.Delete(maDot, taikhoan);
        }

    }
}
