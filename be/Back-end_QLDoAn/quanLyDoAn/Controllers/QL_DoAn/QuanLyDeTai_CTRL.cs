using BLL.InterFace.QL_DoAn;
using BLL.QL_NguoiDung;
using DTO.QL_DoAn;
using Microsoft.AspNetCore.Mvc;

namespace quanLyDoAn.Controllers.QL_DoAn
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuanLyDeTai_CTRL : Controller
    {
        private IQuanLyDeTai_BLL _DeTaiBLL;
        public QuanLyDeTai_CTRL(IQuanLyDeTai_BLL DeTaiBLL)
        {
            _DeTaiBLL = DeTaiBLL;
        }

        [Route("get_detai_madot_SV")]
        [HttpGet]
        public List<V_QL_DETAI_SinhVien> GET_DETAI_MADOT_SinhVien(string maDot)
        {
            return _DeTaiBLL.GET_DETAI_MADOT_SinhVien(maDot);
        }

        [Route("get_detai_madot")]
        [HttpGet]
        public List<V_QL_DETAI_GV> GET_DETAI_MADOT(string ? maDot,string?tenDeTai)
        {
            return _DeTaiBLL.GET_DETAI_MADOT(maDot,tenDeTai);
        }

        [Route("create-DeTai-GV")]
        [HttpPost]
        public IActionResult CreateItem([FromBody] QL_DeTai_DTO model, string taikhoan)
        {
            string result = _DeTaiBLL.Create_GV(model, taikhoan);
            return Ok(result);
        }

        [Route("DeXuatDeTai")]
        [HttpPost]
        public IActionResult Create_SV([FromBody] QL_DeTai_DTO model, string taikhoan)
        {
            string result = _DeTaiBLL.Create_SV(model, taikhoan);
            return Ok(result);
        }
        [Route("DangKyDeTai_sv")]
        [HttpPost]
        public IActionResult DangKyDeTai_SV( string MaDeTai,string MaSinhVien, string taikhoan)
        {
            string result = _DeTaiBLL.DangKyDeTai_SV(MaDeTai,MaSinhVien, taikhoan);
            return Ok(result);
        }
        [Route("UPDATE_DETAI_GV")]
        [HttpPost]
        public IActionResult UPDATE([FromBody] QL_DeTai_DTO model, string taikhoan)
        {
            string result = _DeTaiBLL.updateDeTai(model, taikhoan);
            return Ok(result);
        }

        [Route("delete-DeTai")]
        [HttpDelete]
        public IActionResult DeleteItem(string maDeTai, string taikhoan)
        {
            string result = _DeTaiBLL.DeleteDeTai(maDeTai, taikhoan);
            return Ok(result);
        }


        [Route("GiangVienXacNhanDeTai")]
        [HttpPost]
        public IActionResult Comfrim([FromBody] D_GiangVien_XacnhanDeTai model, string taikhoan)
        {
            string result = _DeTaiBLL.GiangVienXacNhanDeTai(model, taikhoan);
            return Ok(result);
        }


        [Route("GiangVienTuChoiDeTai")]
        [HttpPost]
        public IActionResult REJECT([FromBody] D_GiangVien_XacnhanDeTai model, string taikhoan)
        {
            string result = _DeTaiBLL.GiangVienTuChoiDeTai(model, taikhoan);
            return Ok(result);
        }




        [Route("get_detaisinhvien_giangvien")]
        [HttpGet]
        public List<V_GiangVien_XacnhanDeTai> GET_DETAI_SinhVien(string maDot)
        {
            return _DeTaiBLL.Get_DeTaiSinhVien_GiangVien(maDot);
        }




        [Route("TBMXacNhanDeTai")]
        [HttpPost]
        public IActionResult TBMComfrim([FromBody] D_GiangVien_XacnhanDeTai model, string taikhoan)
        {
            string result = _DeTaiBLL.TBMXacNhanDeTai(model, taikhoan);
            return Ok(result);
        }


        [Route("TBMTuChoiDeTai")]
        [HttpPost]
        public IActionResult TBMREJECT([FromBody] D_GiangVien_XacnhanDeTai model, string taikhoan)
        {
            string result = _DeTaiBLL.TBMTuChoiDeTai(model, taikhoan);
            return Ok(result);
        }




        [Route("get_detaisinhvien_TBM")]
        [HttpGet]
        public List<V_TBM_XacnhanDeTai> Get_DeTaiSinhVien_TBM(string? MaDot, string? MaGiangVien, string? MaLop)
        {
            return _DeTaiBLL.Get_DeTaiSinhVien_TBM(MaDot,MaGiangVien,MaLop);
        }
    }
}
