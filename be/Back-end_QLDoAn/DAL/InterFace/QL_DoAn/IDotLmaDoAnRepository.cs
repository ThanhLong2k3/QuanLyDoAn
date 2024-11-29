using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO.QL_DoAn;

namespace DAL.InterFace.QL_DoAn
{
    public partial interface IDotLmaDoAnRepository
    {
        public List<DotLamDoAnDTO> GetAll();
        string Create(DotLamDoAnDTO model, string taikhoan);
        string Update(DotLamDoAnDTO model, string taikhoan);
        string Delete(string malop, string taikhoan);
    }
}
