using DTO.QL_DoAn;

namespace BLL.InterFace.QL_DoAn
{
    public interface IQuanLyDeTai_BLL
    {
        public List<V_QL_DETAI_SinhVien> GET_DETAI_MADOT_SinhVien(string maDot);
        public List<V_QL_DETAI_GV> GET_DETAI_MADOT(string? maDot, string? tenDeTai);
        string updateDeTai(QL_DeTai_DTO model, string taikhoan);
        string Create_SV(QL_DeTai_DTO model, string taikhoan);
        string DangKyDeTai_SV(string MaDeTai, string MaSinhVien, string taikhoan);
        string Create_GV(QL_DeTai_DTO model, string taikhoan);
        string DeleteDeTai(string maDeTai, string taikhoan);


        string GiangVienXacNhanDeTai(D_GiangVien_XacnhanDeTai model, string taikhoan);
        string GiangVienTuChoiDeTai(D_GiangVien_XacnhanDeTai model, string taikhoan);
        List<V_GiangVien_XacnhanDeTai> Get_DeTaiSinhVien_GiangVien(string MaDot);


        string TBMXacNhanDeTai(D_GiangVien_XacnhanDeTai model, string taikhoan);
        string TBMTuChoiDeTai(D_GiangVien_XacnhanDeTai model, string taikhoan);

        List<V_TBM_XacnhanDeTai> Get_DeTaiSinhVien_TBM(string? MaDot, string? MaGiangVien, string? MaLop);

    }
}
