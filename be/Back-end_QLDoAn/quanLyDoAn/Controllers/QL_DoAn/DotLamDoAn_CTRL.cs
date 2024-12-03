using BLL.InterFace.QL_DoAn;
using DTO.QL_DoAn;
using Microsoft.AspNetCore.Mvc;

namespace quanLyDoAn.Controllers.QL_DoAn
{
    [Route("api/[controller]")]
    [ApiController]
    public class DotLamDoAn_CTRL : Controller
    {
        private IDotLamDoAn_BLL _DotLamDoAm_BLL;
        public DotLamDoAn_CTRL(IDotLamDoAn_BLL DotLamDoAmBLL)
        {
            _DotLamDoAm_BLL = DotLamDoAmBLL;
        }
        [Route("getall")]
        [HttpGet]
        public List<DotLamDoAnDTO> Getall()
        {
            return _DotLamDoAm_BLL.GetAll();
        }

        [Route("create-DotLamDoAn")]
        [HttpPost]
        public IActionResult CreateItem([FromBody] DotLamDoAnDTO model, string taikhoan)
        {   
            string result = _DotLamDoAm_BLL.Create(model, taikhoan);
            return Ok(result);
        }
        [Route("update-DotLamDoAn")]
        [HttpPost]
        public IActionResult UpdateItem([FromBody] DotLamDoAnDTO model, string taikhoan)
        {
            string result = _DotLamDoAm_BLL.Update(model, taikhoan);
            return Ok(result);
        }
        [Route("delete-DotLamDoAn")]
        [HttpDelete]
        public IActionResult DeleteItem(string ma, string taikhoan)
        {
            string result = _DotLamDoAm_BLL.Delete(ma, taikhoan);
            return Ok(result);
        }

    }
}
