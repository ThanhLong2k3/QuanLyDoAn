using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BLL.InterFace.QL_DoAn;
using DAL.InterFace.QL_DoAn.IHoiDongRepository;
using DTO.QL_DoAn.HoiDong_DTO;

namespace BLL.QL_NguoiDung
{
    public class HoiDong_BLL: IHoiDong_BLL
    {
        private IHoiDongReponsitory _res;
        public HoiDong_BLL(IHoiDongReponsitory res)
        {
            _res = res;
        }
        public List<HoiDongDTO> GetAll()
        {
            return _res.GetAll();
        }

        public string Create(HoiDongDTO model, string tk)
        {
            return _res.Create(model, tk);
        }
        public string Update(HoiDongDTO model, string taikhoan)
        {
            return _res.Update(model, taikhoan);
        }
        public string Delete(string maDot, string taikhoan)
        {
            return _res.Delete(maDot, taikhoan);
        }
    }
}
