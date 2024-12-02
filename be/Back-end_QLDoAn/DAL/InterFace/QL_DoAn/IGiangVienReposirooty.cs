using DTO.QL_DoAn;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.InterFace.QL_DoAn
{
   public partial interface IGiangVienReposirooty
    {
        public List<GiangVienDTO> GetAll();
        string Create(D_GiangVienDTO model,string taikhoan);
        string Update(D_GiangVienDTO model,string taikhoan);
        string Delete(string malop,string taikhoan);
    }
}
