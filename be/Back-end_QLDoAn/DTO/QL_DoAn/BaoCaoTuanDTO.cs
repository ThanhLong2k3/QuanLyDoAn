namespace DTO.QL_DoAn
{
    public class BaoCaoTuanDTO
    {
        public int? MaBaoCao { get; set; } 
        public string MaDeTai { get; set; } = string.Empty;
        public int SoTuan { get; set; }
        public DateTime? TuNgay { get; set; }
        public DateTime? DenNgay { get; set; }
        public string? CongViec { get; set; }
        public string? NoiDungThucHien { get; set; }
        public string? KetQuaDatDuoc { get; set; }
        public string? NoiDungBaoCao { get; set; }
        public string? DuongDanBaoCao { get; set; }
        public string? NhanXetCuaGiangVien { get; set; }
        public double? Diem { get; set; }
    }
}
