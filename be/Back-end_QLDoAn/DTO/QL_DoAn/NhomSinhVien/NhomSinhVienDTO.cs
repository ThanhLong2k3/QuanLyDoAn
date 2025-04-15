namespace DTO.QL_DoAn.NhomSinhVien
{
    public class NhomSinhVienDTO
    {
        public string maNhom { get; set; }
        public string tenNhom { get; set; }
        public string maSinhVienTruong { get; set; }
    }

    public class V_NhomSinhVien_DTO
    {
        public string maNhom { get; set; }
        public string tenNhom { get; set; }
        public string TenDeTai { get; set; }
        public string MaDeTai { get; set; }
        public string tenGiangVien {  get; set; }
        public int maTrangThai {  get; set; }
        public string ngayBatDau {  get; set; }
        public string maDot {  get; set; }
        public string tenDot {  get; set; }
        public bool choPhepGiangVienBaoCaoKhacTuanHienTai {  get; set; }
        public int soThanhVien { get; set; }
        public string maSinhVienTruong { get; set; }
        public string trangThai {  get; set; }
        public string tenTruongNhom {  get; set; }
        public DateTime ngayTao { get; set; }
    }
}
