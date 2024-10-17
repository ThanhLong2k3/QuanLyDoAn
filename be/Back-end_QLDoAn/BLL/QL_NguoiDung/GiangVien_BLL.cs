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
    public class GiangVien_BLL:IGiangVien_BLL
    {
        private IGiangVienReposirooty _res;
        public GiangVien_BLL(IGiangVienReposirooty res)
        {
            _res = res;
        }
        public List<GiangVienDTO> GetAll()
        {
            return _res.GetAll();
        }
        public string Create(GiangVienDTO model,string taikhoan)
        {
            return _res.Create(model, taikhoan);
        }
        public string Update(GiangVienDTO model,string taikhoan)
        {
            return _res.Update(model, taikhoan);
        }
        public string Delete(string ma,string taikhoan)
        {
            return _res.Delete(ma, taikhoan);
        }

    }
}
