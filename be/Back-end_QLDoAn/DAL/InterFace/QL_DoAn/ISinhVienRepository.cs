using DTO.QL_DoAn;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.InterFace.QL_DoAn
{
    public partial interface ISinhVienRepository
    {
        public List<V_SinhVienDTO> GetAll();
        string Create(SinhVienDTO model, string taikhoan);
        string Update(SinhVienDTO model, string taikhoan);
        string Delete(string malop, string taikhoan);
    }
}
