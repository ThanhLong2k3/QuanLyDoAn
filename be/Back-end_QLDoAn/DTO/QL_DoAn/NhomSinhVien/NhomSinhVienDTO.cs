using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
        public int soThanhVien { get; set; }
    }
}
