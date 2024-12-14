using BLL.InterFace.QL_DoAn;
using DAL.InterFace.QL_DoAn;
using DTO.QL_DoAn;

namespace BLL.QL_NguoiDung
{
    public class QL_DeTai_BLL : IQL_DeTai_BLL
    {
        private IQuanLyDeTaiRepository  _res;
        public QL_DeTai_BLL(IQuanLyDeTaiRepository res)
        {
            _res = res;
        }
        public string Create(QL_DeTaiDTO model, string taikhoan)
        {
            return _res.Create(model, taikhoan);
        }

        public string Delete(int maDeTai, string taikhoan)
        {
            return _res.Delete(maDeTai, taikhoan);
        }

        public List<QL_DeTaiDTO> GetAll()
        {
            return _res.GetAll();
        }

        public string Update(QL_DeTaiDTO model, string taikhoan)
        {
            return _res.Update(model, taikhoan);
        }
    }
}
