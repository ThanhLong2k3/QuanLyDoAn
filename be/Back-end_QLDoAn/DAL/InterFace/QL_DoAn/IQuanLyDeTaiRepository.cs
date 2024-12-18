using DTO.QL_DoAn;

namespace DAL.InterFace.QL_DoAn
{
    public interface IQuanLyDeTaiRepository
    {
        public List<V_DeTaiDTO> Search_DeTai(string? maDot, string? maGiangVien,string? maLop); 
        public List<QL_DeTaiDTO> GetAll();
        string Create(QL_DeTaiDTO model, string taikhoan);
        string Update(QL_DeTaiDTO model, string taikhoan);
        string Delete(int maDeTai, string taikhoan);
    }
}
