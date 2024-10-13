using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.QL_HeThong
{
    public class nguoiDung_DTO
    {
        public string ?taiKhoan { get; set; }

        public string ?matKhau { get; set; }

        public string ?hoTen { get; set; }

        public DateTime ?ngaySinh { get; set; }

        public string ?gioiTinh { get; set; }
        public string ?email { get; set; }

        public string ?moTa { get; set; }

        public string ?TrangThai { get; set; }

    }

    public class DangNhapDTO
    {
        public string? taiKhoan { get; set; }
        public string? matKhau { get; set; }
    }
}
