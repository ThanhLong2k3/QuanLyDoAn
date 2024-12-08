using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.QL_DoAn
{
    public class D_PhanCongHuongDanDTO
    {
        public string maDot {  get; set; }
        public string maSinhVien {  get; set; }
        public string maGiangVien {  get; set; }

    }
    public class V_PhanCongHuongDan
    {
        public string maSinhVien { get; set; }
        public string tenSinhVien { get; set; }
        public string tenGiangVien { get; set; }
        public string maLop { get; set; }
        public string maGiangVien { get; set; }
        public int soLuongHuongDan { get; set; }
    }
}
