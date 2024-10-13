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
    public class nguoiDung_BLL : INguoiDung_BLL
    {
        private INguoiDungRepository _res;
        public nguoiDung_BLL(INguoiDungRepository res)
        {
            _res = res;
        }
        public List<nguoiDung_DTO> GetAll()
        {
            return _res.GetAll();
        }
        public List<nguoiDung_DTO> GetDatabyID(string id)
        {
            return _res.GetById(id);
        }
        public string Create(nguoiDung_DTO model)
        {
            return _res.Create(model);
        }
        public bool Update(nguoiDung_DTO model)
        {
            return _res.Update(model);
        }
        public int DangNhap(DangNhapDTO model)
        {
            return _res.DangNhap(model);
        }

    }
}
