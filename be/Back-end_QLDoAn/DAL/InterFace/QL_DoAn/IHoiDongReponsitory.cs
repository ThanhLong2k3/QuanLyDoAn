using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO.QL_DoAn;

namespace DAL.InterFace.QL_DoAn
{
    public partial interface IHoiDongReponsitory
    {
        public List<HoiDongDTO> GetAll();
        string Create(HoiDongDTO model, string taikhoan);
        string Update(HoiDongDTO model, string taikhoan);
        string Delete(string malop, string taikhoan);
    }
}
