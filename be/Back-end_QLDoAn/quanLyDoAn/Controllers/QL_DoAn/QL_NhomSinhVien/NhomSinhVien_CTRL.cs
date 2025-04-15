using BLL.InterFace.QL_DoAn.NhomSinhVien_BLL;
using BLL.QL_NguoiDung.NhomSinhVien;
using DTO.QL_DoAn;
using DTO.QL_DoAn.NhomSinhVien;
using Microsoft.AspNetCore.Mvc;

namespace quanLyDoAn.Controllers.QL_DoAn.QL_NhomSinhVien
{
    [Route("api/[controller]")]
    [ApiController]
    public class NhomSinhVien_CTRL : Controller
    {
        private INhomSinhVien_BLL _NhomSinhVien_BLL;
        public NhomSinhVien_CTRL(INhomSinhVien_BLL nhomSinhVien_BLL)
        {
            _NhomSinhVien_BLL = nhomSinhVien_BLL;
        }
        [Route("get_By_masinhvien")]
        [HttpGet]
        public List< V_NhomSinhVien_DTO> getNhombymaSinhVien(string? taikhoan, int? isTruongNhom, string? maDot, string ? maGiangVien)
        {
            return _NhomSinhVien_BLL.getNhombymaSinhVien(taikhoan, isTruongNhom, maDot,maGiangVien);
        }

        [Route("create-NhomSinhVien")]
        [HttpPost]
        public IActionResult CreateItem([FromBody] NhomSinhVienDTO model)
        {
            string result = _NhomSinhVien_BLL.Create(model);
            return Ok(result);
        }

        [Route("delete-NhomSinhVien")]
        [HttpDelete]
        public IActionResult DeleteItem(string manhom, string matruongnhom)
        {
            string result = _NhomSinhVien_BLL.Delete(manhom, matruongnhom);
            return Ok(result);
        }
    }
}
