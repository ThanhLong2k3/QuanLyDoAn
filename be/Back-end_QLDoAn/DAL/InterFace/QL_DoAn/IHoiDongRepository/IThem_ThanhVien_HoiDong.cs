using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO.QL_DoAn.HoiDong_DTO;

namespace DAL.InterFace.QL_DoAn.IHoiDongRepository
{
    public partial interface IThem_ThanhVien_HoiDong
    {
        string Create(ThanhVien_HoiDongDTO model, string taikhoan);
        string Delete(ThanhVien_HoiDongDTO model, string taikhoan);
    }
}
