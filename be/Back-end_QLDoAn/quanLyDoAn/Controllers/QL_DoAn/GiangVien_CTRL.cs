using BLL.InterFace.QL_DoAn;
using DTO.QL_DoAn;
using Microsoft.AspNetCore.Mvc;

namespace quanLyDoAn.Controllers.QL_DoAn
{
  
    [Route("api/[controller]")]
    [ApiController]
    public class GiangVien_CTRL : Controller
    {
        private IGiangVien_BLL _GiangVienBLL;
        public GiangVien_CTRL(IGiangVien_BLL GiangVienBLL)
        {
            _GiangVienBLL = GiangVienBLL;
        }
        [Route("getall")]
        [HttpGet]
        public List<GiangVienDTO> Getall()
        {
            return _GiangVienBLL.GetAll();
        }

        [Route("create-GiangVien")]
        [HttpPost]
        public IActionResult CreateItem([FromBody] GiangVienDTO model,string taikhoan)
        {
          string result=  _GiangVienBLL.Create(model,taikhoan);
            return Ok(result);
        }
        [Route("update-GiangVien")]
        [HttpPost]
        public IActionResult UpdateItem([FromBody] GiangVienDTO model,string taikhoan)
        {
            string result= _GiangVienBLL.Update(model, taikhoan);
            return Ok(result);
        }
        [Route("delete-GiangVien")]
        [HttpDelete]
        public IActionResult DeleteItem(string ma,string taikhoan)
        {
            string result = _GiangVienBLL.Delete(ma, taikhoan);
            return Ok(result);
        }

    }
}
