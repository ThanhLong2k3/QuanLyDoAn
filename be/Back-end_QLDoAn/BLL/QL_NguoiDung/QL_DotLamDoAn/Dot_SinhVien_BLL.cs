using BLL.InterFace.QL_DoAn.DotLamDoAn_DLL;
using DAL.InterFace.QL_DoAn.IDotLamDoAnRepository;
using DTO.QL_DoAn.DotLamDoAn_DTO;

namespace BLL.QL_NguoiDung.QL_DotLamDoAn
{
    public class Dot_SinhVien_BLL:IDot_SinhVien_BLL
    {
        private IDot_SinhVienRepository _res;
        public Dot_SinhVien_BLL(IDot_SinhVienRepository res)
        {
            _res = res;
        }
        public v_Dot_DETAI GET_MADOT_TAIKHOAN(string taikhoan)
        {
            return _res.GET_MADOT_TAIKHOAN(taikhoan);
        }

        public List<V_Dot_SinhVienDTO> GetAll_SinhVien()
        {
            return _res.GetAll_SinhVien();
        }
        public List<V_Dot_SinhVienDTO> Get_SinhVien_MaDot(string id)
        {
            return _res.Get_SinhVien_MaDot(id);
        }
        public string Create(D_Dot_SinhVien model)
        {
            return _res.Create(model);
        }
     
        public string Delete(string maDot, string maSinhVien)
        {
            return _res.Delete(maDot,maSinhVien);
        }
    }
}
