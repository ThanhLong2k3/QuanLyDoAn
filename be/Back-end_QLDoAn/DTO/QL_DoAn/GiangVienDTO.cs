using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.QL_DoAn
{
    public class GiangVienDTO
    {
        public string maGiangVien { get; set; }
        public string tenGiangVien { get; set; }
        public string tenBoMon { get; set; }
        public string chucVu { get; set; }
        public string? tenHocVi { get; set; }
        public string ?tenHocHam { get; set; }
        public string gioiTinh { get; set; }
        public DateTime ngaySinh { get; set; }
        public string sDT { get; set; }
        public string email { get; set; }
    }

}
