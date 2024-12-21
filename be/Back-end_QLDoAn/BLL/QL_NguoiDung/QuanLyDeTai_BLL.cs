using BLL.InterFace.QL_DoAn;
using DAL.InterFace.QL_DoAn;
using DTO.QL_DoAn;

namespace BLL.QL_NguoiDung
{
    public class QuanLyDeTai_BLL:IQuanLyDeTai_BLL
    {
        private IQuanLyDeTai_Repository _res;
        public QuanLyDeTai_BLL(IQuanLyDeTai_Repository res)
        {
            _res = res;
        }
        public List<V_QL_DETAI_GV> GET_DETAI_MADOT(string? maDot, string? tenDeTai)
        {
            return _res.GET_DETAI_MADOT(maDot, tenDeTai);
        }
        public string Create_GV(QL_DeTai_DTO model, string taikhoan)
        {
            return _res.Create_GV(model, taikhoan);
        }
        public string Create_SV(QL_DeTai_DTO model, string taikhoan)
        {
            return _res.Create_SV(model, taikhoan);
        }
        public List<V_QL_DETAI_SinhVien> GET_DETAI_MADOT_SinhVien(string maDot)
        {
            return _res.GET_DETAI_MADOT_SinhVien(maDot);
        }

        public string DangKyDeTai_SV(string MaDeTai, string MaSinhVien, string taikhoan)
        {
            return _res.DangKyDeTai_SV(MaDeTai, MaSinhVien, taikhoan);
        }
        public string updateDeTai(QL_DeTai_DTO model, string taikhoan)
        {
            return _res.updateDeTai(model, taikhoan);
        }
        public string DeleteDeTai(string maDeTai, string taikhoan)
        {
            return _res.DeleteDeTai(maDeTai,taikhoan);
        }
    }
}
