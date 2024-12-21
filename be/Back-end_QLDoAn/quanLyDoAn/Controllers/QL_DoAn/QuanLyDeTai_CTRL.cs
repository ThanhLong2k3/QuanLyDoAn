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
    }
}
