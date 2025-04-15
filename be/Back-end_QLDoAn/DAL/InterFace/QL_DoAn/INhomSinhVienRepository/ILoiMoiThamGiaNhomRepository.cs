using DTO.QL_DoAn.NhomSinhVien;

namespace DAL.InterFace.QL_DoAn.INhomSinhVienRepository
{
    public partial interface ILoiMoiThamGiaNhomRepository
    {
        public List<LoiMoiThamGiaNhom_DTO> LayLoiMoiChoXacNhan(string masinhvien);
        string GuiLoiMoi(GuiLoiMoi_DTO model);
        string XuLyLoiMoi(XuLyLoiMoi_DTO model);
    }
}
