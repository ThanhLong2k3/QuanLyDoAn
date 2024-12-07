using BLL.InterFace.QL_DoAn;
using DTO.QL_DoAn;
using Microsoft.AspNetCore.Mvc;

namespace quanLyDoAn.Controllers.QL_DoAn.QL_HoiDong
{
    [Route("api/[controller]")]
    [ApiController]
    public class HoiDong_CTRL : Controller
    {
        private IHoiDong_BLL _HoiDong_BLL;
        public HoiDong_CTRL(IHoiDong_BLL HoiDongBLL)
        {
            _HoiDong_BLL = HoiDongBLL;
        }
        [Route("getall")]
        [HttpGet]
        public List<HoiDongDTO> Getall()
        {
            return _HoiDong_BLL.GetAll();
        }

        [Route("create-HoiDong")]
        [HttpPost]
        public IActionResult CreateItem([FromBody] HoiDongDTO model, string taikhoan)
        {
            string result = _HoiDong_BLL.Create(model, taikhoan);
            return Ok(result);
        }
        [Route("update-HoiDong")]
        [HttpPost]
        public IActionResult UpdateItem([FromBody] HoiDongDTO model, string taikhoan)
        {
            string result = _HoiDong_BLL.Update(model, taikhoan);
            return Ok(result);
        }
        [Route("delete-HoiDong")]
        [HttpDelete]
        public IActionResult DeleteItem(string ma, string taikhoan)
        {
            string result = _HoiDong_BLL.Delete(ma, taikhoan);
            return Ok(result);
        }

    }
}
