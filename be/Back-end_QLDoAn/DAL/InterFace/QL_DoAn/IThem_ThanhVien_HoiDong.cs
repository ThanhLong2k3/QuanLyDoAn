using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO.QL_DoAn;

namespace DAL.InterFace.QL_DoAn
{
    public partial interface IThem_ThanhVien_HoiDong
    {
        string Create(ThanhVien_HoiDongDTO model, string taikhoan);
        string Delete(ThanhVien_HoiDongDTO model, string taikhoan);
    }
}
