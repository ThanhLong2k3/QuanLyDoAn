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
    public class nhomQuyen_BLL : INhomQuyen_BLL
    {


        private INhomQuyenRepository _res;
        public nhomQuyen_BLL(INhomQuyenRepository res)
        {
            _res = res;
        }
        public List<nhomQuyen_DTO> GetAll()
        {
            return _res.GetAll();
        }
        public List<nhomQuyen_DTO> GetNhomQuyen_TaiKhoan(string tk)
        {
            return _res.GetNhomQuyen_TaiKhoan(tk);
        }
        public string Create(nhomQuyen_DTO model)
        {
            return _res.Create(model);
        }
        public bool Update(nhomQuyen_DTO model)
        {
            return _res.Update(model);
        }
        public bool Delete(string ma)
        {
            return _res.Delete(ma);
        }

    }
}
