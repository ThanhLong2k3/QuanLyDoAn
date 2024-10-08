using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.QL_HeThong
{
    public class nhomQuyen_DTO
    {
        public int MaNhomQuyen { get; set; }

        public string TenNhomQuyen { get; set; }

        public string Loai { get; set; }

        public string MoTa { get; set; }

        public int? SoLuong { get; set; }
    }
}
