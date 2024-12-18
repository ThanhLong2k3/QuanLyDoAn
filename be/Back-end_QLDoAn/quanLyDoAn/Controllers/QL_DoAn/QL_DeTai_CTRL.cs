using BLL.InterFace.QL_DoAn;
using DTO.QL_DoAn;
using Microsoft.AspNetCore.Mvc;

namespace quanLyDoAn.Controllers.QL_DoAn
{
    [Route("api/[controller]")]
    [ApiController]
    public class QL_DeTai_CTRL : Controller
    {
        private IQL_DeTai_BLL _DeTaiBLL;
        public QL_DeTai_CTRL(IQL_DeTai_BLL DeTaiBLL)
        {
            _DeTaiBLL = DeTaiBLL;
        }
        [Route("Search_DeTai")]
        [HttpGet]
        public List<V_DeTaiDTO> Search_DeTai(string? maDot,string? maGiangVien,string? maLop)
        {
            return _DeTaiBLL.Search_DeTai(maDot,maGiangVien,maLop);
        }

        [Route("getall")]
        [HttpGet]
        public List<QL_DeTaiDTO> Getall()
        {
            return _DeTaiBLL.GetAll();
        }

        [Route("create-DeTai")]
        [HttpPost]
        public IActionResult CreateItem([FromBody] QL_DeTaiDTO model, string taikhoan)
        {
            string result = _DeTaiBLL.Create(model, taikhoan);
            return Ok(result);
        }
        [Route("update-DeTai")]
        [HttpPost]
        public IActionResult UpdateItem([FromBody] QL_DeTaiDTO model, string taikhoan)
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
