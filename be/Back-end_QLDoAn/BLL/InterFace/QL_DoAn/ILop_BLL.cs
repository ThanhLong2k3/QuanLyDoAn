using DTO.QL_DoAn;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.InterFace.QL_DoAn
{
    public partial interface ILop_BLL
    {
        public List<LopDTO> GetAll();
        string Create(LopDTO model, string taikhoan);
        string Update(LopDTO model, string taikhoan);
        string Delete(string ma, string taikhoan);
    }
}
