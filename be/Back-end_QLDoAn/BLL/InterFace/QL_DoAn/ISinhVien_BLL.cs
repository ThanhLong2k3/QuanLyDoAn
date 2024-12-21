using DTO.QL_DoAn;

namespace BLL.InterFace.QL_DoAn
{
    public partial interface ISinhVien_BLL
    {
        string Update_SinhVien(Up_SV_SINHVIENDTO model);
        V_SinhVienDTO GET_SINHVIEN_ID(string taikhoan);
        public List<V_SinhVienDTO> GetAll();
        string Create(SinhVienDTO model, string taikhoan);
        string Update(SinhVienDTO model, string taikhoan);
        string Delete(string ma, string taikhoan);
    }
}
