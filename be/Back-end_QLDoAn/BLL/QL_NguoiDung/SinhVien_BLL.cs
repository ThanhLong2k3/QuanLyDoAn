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
    public class SinhVien_BLL:ISinhVien_BLL
    {
        private ISinhVienRepository _res;
        public SinhVien_BLL(ISinhVienRepository res)
        {
            _res = res;
        }
        public List<SinhVienDTO> GetAll()
        {
            return _res.GetAll();
        }
        public string Create(SinhVienDTO model, string taikhoan)
        {
            return _res.Create(model,taikhoan);
        }
        public bool Update(SinhVienDTO model, string taikhoan)
        {
            return _res.Update(model, taikhoan);
        }
        public bool Delete(string ma,string taikhoan)
        {
            return _res.Delete(ma, taikhoan);
        }

    }
}
