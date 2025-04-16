using DTO.QL_DoAn.DotLamDoAn_DTO;

namespace BLL.InterFace.QL_DoAn.DotLamDoAn_DLL
{
    public partial interface IDot_SinhVien_BLL
    {
        public  List<v_Dot_DETAI> GET_MADOT_TAIKHOAN(string taikhoan);

        public List<V_Dot_SinhVienDTO> GetAll_SinhVien();
        public List<V_Dot_SinhVienDTO> Get_SinhVien_MaDot(string maDot);
        string Create(D_Dot_SinhVien model);
        string Delete(string maDot, string maSinhVien);

    }
}
