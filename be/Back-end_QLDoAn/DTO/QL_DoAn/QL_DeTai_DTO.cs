namespace DTO.QL_DoAn
{
    public class QL_DeTai_DTO
    {
        public string MaDeTai {  get; set; }
        public string TenDeTai { set; get; }
        public string MaDot { get; set; }
        public string HinhThucBaoCaoBaoVe {  get; set; }
        public string ? MaGiangVien { get; set; }
        public string? MaSinhVien { get; set; }

        public int TrangThai { get; set; } //0: chờ giảng viên duyệt; 1:chờ trưởng bộ môn duyệt; 2:trưởng bộ môn đã duyệt
        public string? NguoiDeXuat {  get; set; }
        public string MoTa { get; set; }
    }
    public class V_QL_DETAI_GV
    {
        public string STT { get; set; }
        public string TenDeTai { get; set; }
        public string MaDot { get; set; }

        public string MaDeTai { get; set; }
        public string HinhThucBaoCaoBaoVe { get; set; }
        public string MoTa { get; set; }
        public string SinhVienDangKy {  get; set; }
        public string SinhVienDeXuat { get; set; }
    }
    public class V_QL_DETAI_SinhVien
    {
        public string MaDeTai { get; set; }
        public string TenDeTai { get; set; }
        public string maGiangVien { get; set; }
        public string tenGiangVien { get; set; }
        public string email { get; set; }
        public string MoTa { get; set; }
        public string sDT { get; set; }
        public string huongdan {  get; set; }
      
    }
}
