using BLL.InterFace.QL_DoAn.DotLamDoAn_DLL;
using DAL.InterFace.QL_DoAn.IDotLamDoAnRepository;
using DTO.QL_DoAn.DotLamDoAn_DTO;

namespace BLL.QL_NguoiDung.QL_DotLamDoAn
{
    public class Dot_GiangVien_BLL : IDot_GiangVien_BLL
    {
        private IDot_GiangVienReponsitory _res;
        public Dot_GiangVien_BLL(IDot_GiangVienReponsitory res)
        {
            _res = res;
        }

        public List<V_Dot_GiangVienDTO> GetGiangVien_HD()
        {
            return _res.GetGiangVien_HD();
        }
        public List<V_Dot_GiangVienDTO> GetGiangVien_MaDot(string id)
        {
            return _res.GetGiangVien_MaDot(id);
        }
        public string Create(D_Dot_GiangVienDTO model)
        {
            return _res.Create(model);
        }
        public string Update(D_Dot_GiangVienDTO model)
        {
            return _res.Update(model);
        }
        public string Delete(string maDot, string taikhoan)
        {
            return _res.Delete(maDot, taikhoan);
        }
    }
}
