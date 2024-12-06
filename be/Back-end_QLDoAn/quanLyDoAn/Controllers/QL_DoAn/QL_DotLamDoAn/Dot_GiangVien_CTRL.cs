using BLL.InterFace.QL_DoAn.DotLamDoAn_DLL;
using DTO.QL_DoAn.DotLamDoAn_DTO;
using Microsoft.AspNetCore.Mvc;

namespace quanLyDoAn.Controllers.QL_DoAn.QL_DotLamDoAn
{
    [Route("api/[controller]")]
    [ApiController]
    public class Dot_GiangVien_CTRL : Controller
    {
        private IDot_GiangVien_BLL _Dot_GiangVien_BLL;
        public Dot_GiangVien_CTRL(IDot_GiangVien_BLL Dot_GiangVienBLL)
        {
            _Dot_GiangVien_BLL = Dot_GiangVienBLL;
        }

        [Route("getallgv")]
        [HttpGet]
        public List<V_Dot_GiangVienDTO> GetGiangVien_HD()
        {
            return _Dot_GiangVien_BLL.GetGiangVien_HD();
        }
        [Route("getallgv_madot")]
        [HttpGet]
        public List<V_Dot_GiangVienDTO> GetGiangVien_MaDot(string madot)
        {
            return _Dot_GiangVien_BLL.GetGiangVien_MaDot(madot);
        }

        [Route("create-Dot_GiangVien")]
        [HttpPost]
        public IActionResult CreateItem([FromBody] D_Dot_GiangVienDTO model)
        {
            string result = _Dot_GiangVien_BLL.Create(model);
            return Ok(result);
        }
        [Route("update-Dot_GiangVien")]
        [HttpPost]
        public IActionResult UpdateItem([FromBody] D_Dot_GiangVienDTO model)
        {
            string result = _Dot_GiangVien_BLL.Update(model);
            return Ok(result);
        }
        [Route("delete-Dot_GiangVien")]
        [HttpDelete]
        public IActionResult DeleteItem(string maDot, string maGiangVien)
        {
            string result = _Dot_GiangVien_BLL.Delete(maDot, maGiangVien);
            return Ok(result);
        }

    }
}
