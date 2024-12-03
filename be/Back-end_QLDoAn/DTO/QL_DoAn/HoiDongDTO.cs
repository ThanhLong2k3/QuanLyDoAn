using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.QL_DoAn
{
    public class HoiDongDTO
    {
        public string maHoiDong { get; set; }
        public string tenHoiDong { get; set; }
        public string maDot { get; set; }
        public string thuocLop { get; set; }// danh sách lớp cách nhau bởi dấu phẩy
        public string phong { get; set; }
        public DateTime? ngayDuKien { get; set; }
    }

}
