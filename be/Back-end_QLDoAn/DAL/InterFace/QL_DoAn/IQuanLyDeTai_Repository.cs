using DTO.QL_DoAn;

namespace DAL.InterFace.QL_DoAn
{
    public interface IQuanLyDeTai_Repository
    {
        List<V_QL_DETAI_SinhVien> GET_DETAI_MADOT_SinhVien(string maDot);

        List<V_QL_DETAI_GV> GET_DETAI_MADOT(string? maDot,string ?tenDeTai);
        string updateDeTai(QL_DeTai_DTO model, string taikhoan);
        string Create_SV(QL_DeTai_DTO model, string taikhoan);
        string DangKyDeTai_SV(string MaDeTai,string MaSinhVien, string taikhoan);

        string Create_GV(QL_DeTai_DTO model, string taikhoan);
        string DeleteDeTai(string maDeTai, string taikhoan);

    }
}
