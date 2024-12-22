using BLL.InterFace.QL_DoAn;
using BLL.InterFace.QL_HeThong;
using BLL.QL_HeThong;
using DTO.QL_DoAn;
using DTO.QL_HeThong;
using Microsoft.AspNetCore.Mvc;

namespace quanLyDoAn.Controllers.QL_DoAn
{

    [Route("api/[controller]")]
    [ApiController]
    public class Lop_CTRL : Controller
    {
        private ILop_BLL _LopBLL;
        public Lop_CTRL(ILop_BLL LopBLL)
        {
            _LopBLL = LopBLL;
        }
        [Route("getall")]
        [HttpGet]
        public List<LopDTO> Getall()
        {
            return _LopBLL.GetAll();
        }

        [Route("create-Lop")]
        [HttpPost]
        public string CreateItem([FromBody] LopDTO model,string taikhoan)
        {
            return _LopBLL.Create(model, taikhoan);
        }
        [Route("update-Lop")]
        [HttpPost]
        public string UpdateItem([FromBody] LopDTO model, string taikhoan)
        {

            return _LopBLL.Update(model, taikhoan);
        }
        [Route("delete-Lop")]
        [HttpDelete]
        public string DeleteItem(string ma,string taikhoan)
        {
            return _LopBLL.Delete(ma, taikhoan);
        }

        [HttpGet("search")]
        public IActionResult SearchLop([FromQuery] string? tenLop, [FromQuery] string? tenChuyenNganh, [FromQuery] string? khoaHoc)
        {
                var result = _LopBLL.SearchLop(tenLop, tenChuyenNganh, khoaHoc);
                return Ok(result);
        }

    }
}
