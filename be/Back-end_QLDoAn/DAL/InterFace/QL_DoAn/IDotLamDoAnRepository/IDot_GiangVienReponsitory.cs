using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO.QL_DoAn.DotLamDoAn_DTO;

namespace DAL.InterFace.QL_DoAn.IDotLamDoAnRepository
{
    public partial interface IDot_GiangVienReponsitory
    {
        public List<V_Dot_GiangVienDTO> GetGiangVien_HD();
        public List<V_Dot_GiangVienDTO> GetGiangVien_MaDot(string maDot);
        string Create(D_Dot_GiangVienDTO model);
        string Update(D_Dot_GiangVienDTO model);
        string Delete(string madot, string magiangvien);
    }
}
