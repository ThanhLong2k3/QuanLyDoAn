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
        public GiangVienDTO CreateItem([FromBody] GiangVienDTO model,string taikhoan)
        {
            _GiangVienBLL.Create(model,taikhoan);
            return model;
        }
        [Route("update-GiangVien")]
        [HttpPost]
        public GiangVienDTO UpdateItem([FromBody] GiangVienDTO model,string taikhoan)
        {
            _GiangVienBLL.Update(model, taikhoan);
            return model;
        }
        [Route("delete-GiangVien")]
        [HttpDelete]
        public IActionResult DeleteItem(string ma,string taikhoan)
        {
            _GiangVienBLL.Delete(ma, taikhoan);
            return Ok(ma);
        }

    }
}
