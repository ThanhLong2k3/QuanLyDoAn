using BLL.InterFace.QL_HeThong;
using DAL.InterFace.QL_HeThong;
using DTO.QL_HeThong;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.QL_HeThong
{
    public class nhomQuyen_PhanQuyen_BLL: InhomQuyen_PhanQuyen_BLL
    {
        private INhomQuyenPhanQuyenRepository _res;
        public nhomQuyen_PhanQuyen_BLL(INhomQuyenPhanQuyenRepository res)
        {
            _res = res;
        }
        public List<NhomQuyenPhanQuyen_DTO> GETPHANQUYENBYTAIKHOAN(string taiKhoan)
        {
            return _res.GETPHANQUYENBYTAIKHOAN(taiKhoan);
        }
        public string Create(NhomQuyenPhanQuyen_DTO model)
        {
            return _res.Create(model);
        }
      
        public bool Delete(NhomQuyenPhanQuyen_DTO ma)
        {
            return _res.Delete(ma);
        }
    }
}
