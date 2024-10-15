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
    public class phanQuyen_BLL: IPhanQuyen_BLL
    {
        private IPhanQuyenRepository _res;
        public phanQuyen_BLL(IPhanQuyenRepository res)
        {
            _res = res;
        }
        public List<phanQuyen_DTO> GetAll()
        {
            return _res.GetAll();
        }
        public List<phanQuyen_DTO> GetByMaNhomQuyen(string ma)
        {
            return _res.GetByMaNhomQuyen(ma);
        }
    }
}
