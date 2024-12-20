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

        public List<QL_DeTai_DTO> Search_DeTai(string? maDot, string? maGiangVien, string? maLop)
        {
            return _res.Search_DeTai(maDot, maGiangVien, maLop);
        }
        public string Create_GV(QL_DeTai_DTO model, string taikhoan)
        {
            return _res.Create_GV(model, taikhoan);
        }
        public string Create_SV(QL_DeTai_DTO model, string taikhoan)
        {
            return _res.Create_SV(model, taikhoan);
        }

        public string Delete(int maDeTai, string taikhoan)
        {
            return _res.Delete(maDeTai, taikhoan);
        }

        public List<QL_DeTai_DTO> GetAll()
        {
            return _res.GetAll();
        }

        public string Update(QL_DeTai_DTO model, string taikhoan)
        {
            return _res.Update(model, taikhoan);
        }
    }
}
