using BLL.InterFace.QL_DoAn.DotLamDoAn_DLL;
using DAL.InterFace.QL_DoAn.IDotLamDoAnRepository;
using DTO.QL_DoAn.DotLamDoAn_DTO;

namespace BLL.QL_NguoiDung.QL_DotLamDoAn
{
    public class DotLamDoAn_BLL : IDotLamDoAn_BLL
    {
        private IDotLmaDoAnRepository _res;
        public DotLamDoAn_BLL(IDotLmaDoAnRepository res)
        {
            _res = res;
        }
        public List<DotLamDoAnDTO> Get_Dot_TK(string tk)
        {
            return _res.Get_Dot_TK(tk);
        }
        public List<DotLamDoAnDTO> GetAll()
        {
            return _res.GetAll();
        }
        public List<DotLamDoAnDTO> GetBYID()
        {
            return _res.GetBYID();
        }
        public string Create(DotLamDoAnDTO model, string tk)
        {
            return _res.Create(model, tk);
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
