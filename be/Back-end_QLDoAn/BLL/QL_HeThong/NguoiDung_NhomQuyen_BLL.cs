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
    public class NguoiDung_NhomQuyen_BLL : INguoiDung_NhomQuyen_BLL
    {
        private InguoiDung_nhomQuyenRepository _res;
        public NguoiDung_NhomQuyen_BLL(InguoiDung_nhomQuyenRepository res)
        {
            _res = res;
        }
        public List<NguoiDung_NhomQuyen_DTO> GetByMaNhomQuyen(string ma)
        {
            return _res.GetByMaNhomQuyen(ma);
        }
        public string Create(NguoiDungNhomQuyen_DTO model)
        {
            return _res.Create(model);
        }

        public bool Delete(NguoiDungNhomQuyen_DTO model)
        {
            return _res.Delete(model);
        }

    }

}
