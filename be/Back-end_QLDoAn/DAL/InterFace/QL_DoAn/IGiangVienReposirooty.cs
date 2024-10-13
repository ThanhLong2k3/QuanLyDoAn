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
        string Create(GiangVienDTO model,string taikhoan);
        bool Update(GiangVienDTO model,string taikhoan);
        bool Delete(string malop,string taikhoan);
    }
}
