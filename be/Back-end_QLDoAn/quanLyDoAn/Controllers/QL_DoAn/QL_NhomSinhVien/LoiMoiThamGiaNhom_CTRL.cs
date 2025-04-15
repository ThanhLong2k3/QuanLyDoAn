using BLL.InterFace.QL_DoAn.NhomSinhVien_BLL;
using BLL.QL_NguoiDung.NhomSinhVien;
using DTO.QL_DoAn.NhomSinhVien;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace quanLyDoAn.Controllers.QL_DoAn.QL_NhomSinhVien
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoiMoiThamGiaNhom_CTRL : ControllerBase
    {
        private ILoiMoiThamGiaNhom_BLL _loiMoiThamGiaNhom_BLL;
        public LoiMoiThamGiaNhom_CTRL(ILoiMoiThamGiaNhom_BLL loiMoiThamGiaNhom_BLL)
        {
            _loiMoiThamGiaNhom_BLL = loiMoiThamGiaNhom_BLL;
        }

        [Route("get_By_masinhvien")]
        [HttpGet]
        public List<LoiMoiThamGiaNhom_DTO> getLoiMoibymaSinhVien(string taikhoan)
        {
            return _loiMoiThamGiaNhom_BLL.LayLoiMoiChoXacNhan(taikhoan);
        }

        [Route("GuiLoiMoi")]
        [HttpPost]
        public IActionResult CreateItem([FromBody] GuiLoiMoi_DTO model)
        {
            string result = _loiMoiThamGiaNhom_BLL.GuiLoiMoi(model);
            return Ok(result);
        }

        [Route("XuLyLoiMoi")]
        [HttpPost]
        public IActionResult CreateItem([FromBody] XuLyLoiMoi_DTO model)
        {
            string result = _loiMoiThamGiaNhom_BLL.XuLyLoiMoi(model);
            return Ok(result);
        }
    }
}
