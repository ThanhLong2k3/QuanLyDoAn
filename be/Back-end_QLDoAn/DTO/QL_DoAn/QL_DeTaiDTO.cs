namespace DTO.QL_DoAn
{
    public class QL_DeTaiDTO
    {
        public int MaDeTai {  get; set; }
        public string TenDeTai {  set; get; }
        public string NamHocApDung { get; set; }
        public string maSinhVien {  get; set; }
        public string maGiangVien { get; set; }
        public bool TrangThai {  get; set; }
        public string maDot {  get; set; }
        public string HinhThucBaoCaoBaoVe {  get; set; }
        public string MoTa {  get; set; }

    }
    public class V_DeTaiDTO
    {
        public string maSinhVien { set; get; }
        public string tenSinhVien { get; set; }
        public string maGiangVien { set; get; }
        public string tenGiangVien { get; set; }
        public string maLop { get; set; }
        public int maDeTai { get; set; }
        public string tenDeTai { get; set; }
        public bool trangThai { set; get; }
    }

}
