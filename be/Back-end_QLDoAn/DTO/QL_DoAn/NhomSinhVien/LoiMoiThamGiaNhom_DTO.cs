namespace DTO.QL_DoAn.NhomSinhVien
{
    public class LoiMoiThamGiaNhom_DTO
    {
        public int MaLoiMoi {  get; set; }
        public string maNhom {  get; set; }
        public string tenNhom {  get; set; }
        public string maNguoiMoi {  get; set; }
        public string TenNguoiMoi { get; set; }
        public DateTime ngayMoi { get; set; }

    }
    public class GuiLoiMoi_DTO
    {
        public string maNhom {  set; get; }
        public string maSinhVienMoi {  set; get; }
        public string maNguoiMoi {  set; get; }
    }

    public class XuLyLoiMoi_DTO
    {
        public int MaLoiMoi { set; get; }
        public string MaSinhVien { set; get; }
        public int TraLoi { set; get; }
    }
}
