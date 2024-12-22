namespace DTO.QL_DoAn
{
    public class GiangVienDTO
    {
        public string maGiangVien { get; set; }
        public string tenGiangVien { get; set; }
        public string tenBoMon { get; set; }
        public string tenChucVu { get; set; }
        public string? tenHocVi { get; set; }
        public string ?tenHocHam { get; set; }
        public string gioiTinh { get; set; }
        public DateTime ngaySinh { get; set; }
        public string sDT { get; set; }
        public string email { get; set; }
        public string IDBoMon { get; set; }
        public string IDChucVu { get; set; }
        public string? IDHocVi { get; set; }
        public string? IDHocHam { get; set; }
    }
    public class D_GiangVienDTO
    {
        public string maGiangVien { get; set; }
        public string tenGiangVien { get; set; }
        public string IDBoMon { get; set; }
        public string IDChucVu { get; set; }
        public string? IDHocVi { get; set; }
        public string? IDHocHam { get; set; }
        public string gioiTinh { get; set; }
        public DateTime ngaySinh { get; set; }
        public string sDT { get; set; }
        public string email { get; set; }
    }

}
