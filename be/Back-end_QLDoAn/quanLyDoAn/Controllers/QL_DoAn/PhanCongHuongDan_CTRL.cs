using BLL.InterFace.QL_DoAn;
using DTO.QL_DoAn;
using Microsoft.AspNetCore.Mvc;

namespace quanLyDoAn.Controllers.QL_DoAn
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhanCongHuongDan_CTRL : Controller
    {
        private IPhanCongHuongDan_BLL _PhanCongBLL;
        public PhanCongHuongDan_CTRL(IPhanCongHuongDan_BLL PhanCongBLL)
        {
            _PhanCongBLL = PhanCongBLL;
        }
        [Route("GetAll_PhanCong_MaDot")]
        [HttpGet]
        public List<V_PhanCongHuongDan> GetAll_PhanCong_MaDot(string maDot)
        {
            return _PhanCongBLL.GetAll_PhanCong_MaDot(maDot);
        }

        [Route("create-PhanCongHuongDan")]
        [HttpPost]
        public IActionResult CreateItem([FromBody] D_PhanCongHuongDanDTO model, string taikhoan)
        {
            string result = _PhanCongBLL.Create(model, taikhoan);
            return Ok(result);
        }
        [Route("update-PhanCongHuongDan")]
        [HttpPost]
        public IActionResult UpdateItem([FromBody] D_PhanCongHuongDanDTO model, string taikhoan)
        {
            string result = _PhanCongBLL.Update(model, taikhoan);
            return Ok(result);
        }
    }

}
