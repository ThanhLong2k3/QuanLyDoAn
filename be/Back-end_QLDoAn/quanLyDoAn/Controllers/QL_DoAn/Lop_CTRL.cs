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
        public LopDTO CreateItem([FromBody] LopDTO model,string taikhoan)
        {
            _LopBLL.Create(model, taikhoan);
            return model;
        }
        [Route("update-Lop")]
        [HttpPost]
        public LopDTO UpdateItem([FromBody] LopDTO model, string taikhoan)
        {
            _LopBLL.Update(model, taikhoan);
            return model;
        }
        [Route("delete-Lop")]
        [HttpDelete]
        public IActionResult DeleteItem(string ma,string taikhoan)
        {
            _LopBLL.Delete(ma, taikhoan);
            return Ok(ma);
        }

    }
}
