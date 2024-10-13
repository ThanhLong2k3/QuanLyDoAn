using DTO.QL_HeThong;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.InterFace.QL_HeThong
{
    public partial interface INguoiDungRepository
    {
        public List<nguoiDung_DTO> GetAll();
        public List<nguoiDung_DTO> GetById(string tk);
        string Create(nguoiDung_DTO model);
        bool Update(nguoiDung_DTO model);
        int DangNhap(DangNhapDTO model);
    }
}
