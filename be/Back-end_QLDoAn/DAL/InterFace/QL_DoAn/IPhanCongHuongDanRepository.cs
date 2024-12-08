using DTO.QL_DoAn;

namespace DAL.InterFace.QL_DoAn
{
    public partial interface IPhanCongHuongDanRepository
    {
        public List<V_PhanCongHuongDan> GetAll_PhanCong_MaDot(string maDot);
        public string Create (D_PhanCongHuongDanDTO dto,string TaiKhoan);
        public string Update(D_PhanCongHuongDanDTO dto,string TaiKhoan);
    }
}
