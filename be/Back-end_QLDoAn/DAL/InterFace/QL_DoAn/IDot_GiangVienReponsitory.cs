using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO.QL_DoAn;

namespace DAL.InterFace.QL_DoAn
{
    public partial interface IDot_GiangVienReponsitory
    {
        public List<Dot_GiangVienDTO> GetGiangVien_MaDot(string maDot);

        string Create(Dot_GiangVienDTO model);
        string Update(Dot_GiangVienDTO model);
        string Delete(string madot, string magiangvien);
    }
}
