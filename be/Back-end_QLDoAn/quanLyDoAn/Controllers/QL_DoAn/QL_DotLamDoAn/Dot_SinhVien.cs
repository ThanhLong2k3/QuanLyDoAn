using BLL.InterFace.QL_DoAn.DotLamDoAn_DLL;
using DTO.QL_DoAn.DotLamDoAn_DTO;
using Microsoft.AspNetCore.Mvc;

namespace quanLyDoAn.Controllers.QL_DoAn.QL_DotLamDoAn
{
   
    [Route("api/[controller]")]
    [ApiController]
    public class Dot_SinhVien : Controller
    {
        private IDot_SinhVien_BLL _Dot_SinhVien_BLL;
        public Dot_SinhVien(IDot_SinhVien_BLL Dot_SinhVienBLL)
        {
            _Dot_SinhVien_BLL = Dot_SinhVienBLL;
        }

        [Route("getall_SinhVien")]
        [HttpGet]
        public List<V_Dot_SinhVienDTO> GetAll_SinhVien()
        {
            return _Dot_SinhVien_BLL.GetAll_SinhVien();
        }
        [Route("get_SinhVien_madot")]
        [HttpGet]
        public List<V_Dot_SinhVienDTO> Get_SinhVien_MaDot(string madot)
        {
            return _Dot_SinhVien_BLL.Get_SinhVien_MaDot(madot);
        }

        [Route("create-Dot_SinhVien")]
        [HttpPost]
        public IActionResult CreateItem([FromBody] D_Dot_SinhVien model)
        {
            string result = _Dot_SinhVien_BLL.Create(model);
            return Ok(result);
        }
        
        [Route("delete-Dot_SinhVien")]
        [HttpDelete]
        public IActionResult DeleteItem(string maDot, string maSinhVien)
        {
            string result = _Dot_SinhVien_BLL.Delete(maDot,maSinhVien);
            return Ok(result);
        }

    }
}
