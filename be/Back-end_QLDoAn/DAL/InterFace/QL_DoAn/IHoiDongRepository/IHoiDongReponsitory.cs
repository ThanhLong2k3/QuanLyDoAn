using DTO.QL_DoAn.HoiDong_DTO;

namespace DAL.InterFace.QL_DoAn.IHoiDongRepository
{
    public partial interface IHoiDongReponsitory
    {
        public List<HoiDongDTO> GetAll();
        string Create(HoiDongDTO model, string taikhoan);
        string Update(HoiDongDTO model, string taikhoan);
        string Delete(string malop, string taikhoan);
    }
}
