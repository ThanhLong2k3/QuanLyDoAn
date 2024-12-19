using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.QL_DoAn
{
    public class SinhVienDTO
    {
        public string maSinhVien { get; set; }
        public string tenSinhVien { get; set; }
        public string maLop { get; set; }
        public DateTime ngaySinh { get; set; }
        public string gioiTinh { get; set; }
        public string sDT { get; set; }

        public string email { get; set; }
    }
    public class V_SinhVienDTO
    {
        public string maSinhVien { get; set; }
        public string tenSinhVien { get; set; }
        public string maLop { get; set; }
        public DateTime ngaySinh { get; set; }
        public int MaTrangThai { get; set; }
        public string gioiTinh { get; set; }
        public string sDT { get; set; }

        public string email { get; set; }
    }

}
