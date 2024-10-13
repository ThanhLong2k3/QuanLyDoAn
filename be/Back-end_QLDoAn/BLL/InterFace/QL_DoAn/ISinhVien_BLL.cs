using DTO.QL_DoAn;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.InterFace.QL_DoAn
{
    public partial interface ISinhVien_BLL
    {
        public List<SinhVienDTO> GetAll();
        string Create(SinhVienDTO model, string taikhoan);
        bool Update(SinhVienDTO model, string taikhoan);
        bool Delete(string ma, string taikhoan);
    }
}
