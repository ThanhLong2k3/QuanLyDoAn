using BLL.InterFace.QL_DoAn;
using DTO.QL_DoAn;
using Microsoft.AspNetCore.Mvc;

namespace quanLyDoAn.Controllers.QL_DoAn
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuanLyDeTai_CTRL : Controller
    {
        private IQuanLyDeTai_BLL _DeTaiBLL;
        public QuanLyDeTai_CTRL(IQuanLyDeTai_BLL DeTaiBLL)
        {
            _DeTaiBLL = DeTaiBLL;
        }
        [Route("Search_DeTai")]
        [HttpGet]
        public List<QL_DeTai_DTO> Search_DeTai(string? maDot, string? maGiangVien, string? maLop)
        {
            return _DeTaiBLL.Search_DeTai(maDot, maGiangVien, maLop);
        }

        [Route("getall")]
        [HttpGet]
        public List<QL_DeTai_DTO> Getall()
        {
            return _DeTaiBLL.GetAll();
        }

        [Route("create-DeTai-GV")]
        [HttpPost]
        public IActionResult CreateItem([FromBody] QL_DeTai_DTO model, string taikhoan)
        {
            string result = _DeTaiBLL.Create_GV(model, taikhoan);
            return Ok(result);
        }

        [Route("create-DeTai-SV")]
        [HttpPost]
        public IActionResult Create_SV([FromBody] QL_DeTai_DTO model, string taikhoan)
        {
            string result = _DeTaiBLL.Create_SV(model, taikhoan);
            return Ok(result);
        }
        [Route("update-DeTai")]
        [HttpPost]
        public IActionResult UpdateItem([FromBody] QL_DeTai_DTO model, string taikhoan)
        {
            string result = _DeTaiBLL.Update(model, taikhoan);
            return Ok(result);
        }
        [Route("delete-DeTai")]
        [HttpDelete]
        public IActionResult DeleteItem(int ma, string taikhoan)
        {
            string result = _DeTaiBLL.Delete(ma, taikhoan);
            return Ok(result);
        }

    }
}
