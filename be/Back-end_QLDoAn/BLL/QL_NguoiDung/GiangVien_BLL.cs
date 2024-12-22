using BLL.InterFace.QL_DoAn;
using DAL.InterFace.QL_DoAn;
using DTO.QL_DoAn;

namespace BLL.QL_NguoiDung
{
    public class GiangVien_BLL:IGiangVien_BLL
    {
        private IGiangVienReposirooty _res;
        public GiangVien_BLL(IGiangVienReposirooty res)
        {
            _res = res;
        }
        public List<GiangVienDTO> GetAll()
        {
            return _res.GetAll();
        }
        public string Create(D_GiangVienDTO model,string taikhoan)
        {
            return _res.Create(model, taikhoan);
        }
        public string Update(D_GiangVienDTO model,string taikhoan)
        {
            return _res.Update(model, taikhoan);
        }
        public string Delete(string ma,string taikhoan)
        {
            return _res.Delete(ma, taikhoan);
        }

        public List<GiangVienDTO> SearchGiangVien(string? tenGiangVien, string? maBoMon, string? maChucVu)
        {
            return _res.SearchGiangVien(tenGiangVien, maBoMon, maChucVu);
        }
    }
}
