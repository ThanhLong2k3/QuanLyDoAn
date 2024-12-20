using DTO.QL_DoAn;

namespace DAL.InterFace.QL_DoAn
{
    public interface IQuanLyDeTai_Repository
    {
        public List<QL_DeTai_DTO> Search_DeTai(string? maDot, string? maGiangVien, string? maLop);
        public List<QL_DeTai_DTO> GetAll();
        string Create_SV(QL_DeTai_DTO model, string taikhoan);
        string Create_GV(QL_DeTai_DTO model, string taikhoan);
        string Update(QL_DeTai_DTO model, string taikhoan);
        string Delete(int maDeTai, string taikhoan);
    }
}
