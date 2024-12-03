using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO.QL_DoAn;

namespace BLL.InterFace.QL_DoAn
{
    public partial interface IDotLamDoAn_BLL
    {
        public List<DotLamDoAnDTO> GetAll();
        public List<DotLamDoAnDTO> GetBYID();
        string Create(DotLamDoAnDTO model, string taikhoan);
        string Update(DotLamDoAnDTO model, string taikhoan);
        string Delete(string malop, string taikhoan);
    }
}
