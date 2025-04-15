namespace DTO.QL_DoAn.NhomSinhVien
{
    public class ThanhVienNhomDTO
    {
        public string maNhom { get; set; }
        public string maSinhVien { get; set; }

    }

    public class Get_ThanhVienNhom_DTO
    {
        public string maNhom { get; set; }
        public string maSinhVien {  set; get; }
        public string vaiTro { get; set; }
        public string tenSinhVien { get; set;}

    }
}
