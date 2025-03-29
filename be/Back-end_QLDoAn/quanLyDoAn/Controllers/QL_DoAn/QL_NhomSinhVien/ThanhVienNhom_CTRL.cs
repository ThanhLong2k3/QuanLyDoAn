using BLL.InterFace.QL_DoAn.NhomSinhVien_BLL;
using DTO.QL_DoAn;
using DTO.QL_DoAn.DotLamDoAn_DTO;
using DTO.QL_DoAn.NhomSinhVien;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace quanLyDoAn.Controllers.QL_DoAn.QL_NhomSinhVien
{
    [Route("api/[controller]")]
    [ApiController]
    public class ThanhVienNhom_CTRL : ControllerBase
    {
        private IThanhVienNhom_BLL _thanhVienNhom_BLL;
        public ThanhVienNhom_CTRL (IThanhVienNhom_BLL thanhVienNhom_BLL)
        {
            _thanhVienNhom_BLL = thanhVienNhom_BLL;
        }

        [Route("get_By_Id")]
        [HttpGet]
        public List<Get_ThanhVienNhom_DTO> GET_SINHVIEN_ID(string taikhoan)
        {
            return _thanhVienNhom_BLL.get_ThanhVien_Id(taikhoan);
        }


        [Route("add_thanhvien_nhom")]
        [HttpPost]
        public IActionResult CreateItem([FromBody] ThanhVienNhomDTO model, string matruongnhom)
        {
            string result = _thanhVienNhom_BLL.Create(model,matruongnhom);
            return Ok(result);
        }

        [Route("delete-thanhvien_nhom")]
        [HttpDelete]
        public IActionResult DeleteItem(ThanhVienNhomDTO maDot, string matruongnhom)
        {
            string result = _thanhVienNhom_BLL.Delete(maDot, matruongnhom);
            return Ok(result);
        }
    }
}
