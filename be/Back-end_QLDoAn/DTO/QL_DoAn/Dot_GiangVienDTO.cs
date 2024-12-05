using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.QL_DoAn
{
    public class Dot_GiangVienDTO
    {
        public string maDot {  get; set; }
        public string maGiangVien { get; set; }
        public int soLuongHuongDan {  get; set; }
    }
    public class V_Dot_GiangVienDTO
    {
        public string maDot { get; set; }
        public string maGiangVien { get; set; }
        public string tenGiangVien { get; set; }
        public int soLuongHuongDan { get; set; }
    }
}
