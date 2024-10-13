using BLL.InterFace.QL_DoAn;
using DTO.QL_DoAn;
using Microsoft.AspNetCore.Mvc;

namespace quanLyDoAn.Controllers.QL_DoAn
{

    [Route("api/[controller]")]
    [ApiController]
    public class SinhVien_CTRL : Controller
    {
        private ISinhVien_BLL _SinhVienBLL;
        public SinhVien_CTRL(ISinhVien_BLL SinhVienBLL)
        {
            _SinhVienBLL = SinhVienBLL;
        }
        [Route("getall")]
        [HttpGet]
        public List<SinhVienDTO> Getall()
        {
            return _SinhVienBLL.GetAll();
        }

        [Route("create-SinhVien")]
        [HttpPost]
        public SinhVienDTO CreateItem([FromBody] SinhVienDTO model,string taikhoan)
        {
            _SinhVienBLL.Create(model, taikhoan);
            return model;
        }
        [Route("update-SinhVien")]
        [HttpPost]
        public SinhVienDTO UpdateItem([FromBody] SinhVienDTO model,string taikhoan)
        {
            _SinhVienBLL.Update(model, taikhoan);
            return model;
        }
        [Route("delete-SinhVien")]
        [HttpDelete]
        public IActionResult DeleteItem(string ma, string taikhoan)
        {
            _SinhVienBLL.Delete(ma, taikhoan);
            return Ok(ma);
        }

    }
}
