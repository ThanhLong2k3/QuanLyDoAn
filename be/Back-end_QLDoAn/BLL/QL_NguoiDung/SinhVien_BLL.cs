using BLL.InterFace.QL_DoAn;
using DAL.InterFace.QL_DoAn;
using DTO.QL_DoAn;

namespace BLL.QL_NguoiDung
{
    public class SinhVien_BLL:ISinhVien_BLL
    {
        private ISinhVienRepository _res;
        public SinhVien_BLL(ISinhVienRepository res)
        {
            _res = res;
        }
        public V_SinhVienDTO GET_SINHVIEN_ID(string taikhoan)
        {
            return _res.GET_SINHVIEN_ID(taikhoan);
        }
        public List<V_SinhVienDTO> GetAll()
        {
            return _res.GetAll();
        }
        public string Create(SinhVienDTO model, string taikhoan)
        {
            return _res.Create(model,taikhoan);
        }
        public string Update_SinhVien(Up_SV_SINHVIENDTO model)
        {
            return _res.Update_SinhVien(model);
        }
        public string Update(SinhVienDTO model, string taikhoan)
        {
            return _res.Update(model, taikhoan);
        }
        public string Delete(string ma,string taikhoan)
        {
            return _res.Delete(ma, taikhoan);
        }

        public List<V_SinhVienDTO> Search_sv(string? masinhvien, string? maLop, int? matrangthai, string? tensinhvien)
        {
            return _res.Search_sv(masinhvien, maLop, matrangthai, tensinhvien);
        }
    }
}
