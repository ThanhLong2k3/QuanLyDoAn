using DTO.QL_DoAn.NhomSinhVien;

namespace BLL.InterFace.QL_DoAn.NhomSinhVien_BLL
{
    public partial interface ILoiMoiThamGiaNhom_BLL
    {
        public List<LoiMoiThamGiaNhom_DTO> LayLoiMoiChoXacNhan(string masinhvien);
        string GuiLoiMoi(GuiLoiMoi_DTO model);
        string XuLyLoiMoi(XuLyLoiMoi_DTO model);
    }
}
