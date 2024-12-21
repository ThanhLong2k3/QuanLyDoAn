using BLL.InterFace.QL_DoAn.DotLamDoAn_DLL;
using DTO.QL_DoAn.DotLamDoAn_DTO;
using Microsoft.AspNetCore.Mvc;

namespace quanLyDoAn.Controllers.QL_DoAn.QL_DotLamDoAn
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

        [Route("getByTaiKhoan")]
        [HttpGet]
        public List<DotLamDoAnDTO> Get_Dot_TK(string tk)
        {
            return _DotLamDoAm_BLL.Get_Dot_TK(tk);
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
