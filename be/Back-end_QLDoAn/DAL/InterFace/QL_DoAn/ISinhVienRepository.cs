using DTO.QL_DoAn;

namespace DAL.InterFace.QL_DoAn
{
    public partial interface ISinhVienRepository
    {
        V_SinhVienDTO GET_SINHVIEN_ID(string taikhoan);
        public List<V_SinhVienDTO> GetAll();
        string Create(SinhVienDTO model, string taikhoan);
        string Update(SinhVienDTO model, string taikhoan);
        string Update_SinhVien(Up_SV_SINHVIENDTO model);
        string Delete(string malop, string taikhoan);
    }
}
