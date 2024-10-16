using BLL.InterFace.QL_DoAn;
using DAL.InterFace.QL_DoAn;
using DAL.InterFace.QL_HeThong;
using DTO.QL_DoAn;
using DTO.QL_HeThong;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.QL_NguoiDung
{
    public class Lop_BLL:ILop_BLL
    {
        private ILopRepository _res;
        public Lop_BLL(ILopRepository res)
        {
            _res = res;
        }
        public List<LopDTO> GetAll()
        {
            return _res.GetAll();
        }
        public string Create(LopDTO model,string taikhoan)
        {
            return _res.Create(model, taikhoan);
        }
        public string Update(LopDTO model,string taikhoan)
        {
            return _res.Update(model, taikhoan);
        }
        public string Delete(string ma,string taikhoan)
        {
            return _res.Delete(ma, taikhoan);
        }

    }
}
