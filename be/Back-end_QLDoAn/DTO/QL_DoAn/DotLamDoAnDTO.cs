using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.QL_DoAn
{
    public class DotLamDoAnDTO
    {
        public string maDot { get; set; }
        public string tenDot { get; set; }
        public DateTime? ngayBatDau { get; set; }
        public string namApDung { get; set; }
        public bool dangKyDeTai { get; set; }
        public bool choPhepSinhVienDangKyGiangVienKhacBoMon { get; set; }
        public bool choPhepSinhVienBaoCaoKhacTuanHienTai { get; set; }
        public bool choPhepGiangVienBaoCaoKhacTuanHienTai { get; set; }
        public bool choPhepGiangVienSuaDeTai { get; set; }
        public bool trangThai { get; set; }
    }

}
