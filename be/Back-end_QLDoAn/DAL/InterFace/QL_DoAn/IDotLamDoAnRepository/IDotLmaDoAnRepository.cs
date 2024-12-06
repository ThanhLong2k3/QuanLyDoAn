using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO.QL_DoAn.DotLamDoAn_DTO;

namespace DAL.InterFace.QL_DoAn.IDotLamDoAnRepository
{
    public partial interface IDotLmaDoAnRepository
    {
        public List<DotLamDoAnDTO> GetAll();
        public List<DotLamDoAnDTO> GetBYID();

        string Create(DotLamDoAnDTO model, string taikhoan);
        string Update(DotLamDoAnDTO model, string taikhoan);
        string Delete(string madot, string taikhoan);
    }
}
