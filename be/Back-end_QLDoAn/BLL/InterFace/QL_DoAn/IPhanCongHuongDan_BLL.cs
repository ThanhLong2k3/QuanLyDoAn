using DTO.QL_DoAn;

namespace BLL.InterFace.QL_DoAn
{
    public partial interface IPhanCongHuongDan_BLL
    {
        public List<D_PhanCongHuongDanDTO> GetAll_PhanCong_MaDot(string maDot);
        public string Create(D_PhanCongHuongDanDTO dto, string TaiKhoan);
        public string Update(D_PhanCongHuongDanDTO dto, string TaiKhoan);
    }
}
