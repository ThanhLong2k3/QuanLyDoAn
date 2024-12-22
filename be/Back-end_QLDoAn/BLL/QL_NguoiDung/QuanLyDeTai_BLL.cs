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

        public string GiangVienXacNhanDeTai(D_GiangVien_XacnhanDeTai model, string taikhoan)
        {
            return _res.GiangVienXacNhanDeTai(model, taikhoan);
        }

        public string GiangVienTuChoiDeTai(D_GiangVien_XacnhanDeTai model, string taikhoan)
        {
            return _res.GiangVienTuChoiDeTai(model, taikhoan);
        }
        public List<V_GiangVien_XacnhanDeTai> Get_DeTaiSinhVien_GiangVien(string MaDot)
        {
            return _res.Get_DeTaiSinhVien_GiangVien(MaDot);
        }

        public string TBMXacNhanDeTai(D_GiangVien_XacnhanDeTai model, string taikhoan)
        {
            return _res.TBMXacNhanDeTai(model, taikhoan);
        }

        public string TBMTuChoiDeTai(D_GiangVien_XacnhanDeTai model, string taikhoan)
        {
            return _res.TBMTuChoiDeTai(model,taikhoan);
        }

        public List<V_TBM_XacnhanDeTai> Get_DeTaiSinhVien_TBM(string? MaDot, string? MaGiangVien, string? MaLop)
        {
            return _res.Get_DeTaiSinhVien_TBM(MaDot,MaGiangVien,MaLop);
        }
    }
}
