using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO.QL_DoAn.HoiDong_DTO;

namespace BLL.InterFace.QL_DoAn
{
    public partial interface IHoiDong_BLL
    {
        public List<HoiDongDTO> GetAll();
        string Create(HoiDongDTO model, string taikhoan);
        string Update(HoiDongDTO model, string taikhoan);
        string Delete(string malop, string taikhoan);
    }
}
