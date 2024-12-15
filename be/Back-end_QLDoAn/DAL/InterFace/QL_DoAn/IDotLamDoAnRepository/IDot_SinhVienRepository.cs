using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO.QL_DoAn.DotLamDoAn_DTO;

namespace DAL.InterFace.QL_DoAn.IDotLamDoAnRepository
{
    public partial interface IDot_SinhVienRepository
    {
        public v_Dot_DETAI GET_MADOT_TAIKHOAN(string tk);
        public List<V_Dot_SinhVienDTO> GetAll_SinhVien();
        public List<V_Dot_SinhVienDTO> Get_SinhVien_MaDot(string maDot);
        string Create(D_Dot_SinhVien model);
        string Delete(string maDot,string maSinhVien);

    }
}
