using BLL.InterFace.QL_HeThong;
using BLL.QL_HeThong;
using DTO.QL_HeThong;
using Microsoft.AspNetCore.Mvc;

namespace quanLyDoAn.Controllers.QL_HeThong
{
    [Route("api/[controller]")]
    [ApiController]
    public class nhomQuyen_PhanQuyen_CTRL : Controller
    {
        private InhomQuyen_PhanQuyen_BLL _Nhomquyen_PhanQuyenBLL;
        public nhomQuyen_PhanQuyen_CTRL(InhomQuyen_PhanQuyen_BLL nguoiDung_BLL)
        {
            _Nhomquyen_PhanQuyenBLL = nguoiDung_BLL;
        }
        [Route("getquyen_taikhoan")]
        [HttpGet]
        public List<NhomQuyenPhanQuyen_DTO> GETPHANQUYENBYTAIKHOAN(string taikhoan)
        {
            return _Nhomquyen_PhanQuyenBLL.GETPHANQUYENBYTAIKHOAN(taikhoan);
        }


        [Route("create-nhomquyen_phanquyen")]
        [HttpPost]
        public NhomQuyenPhanQuyen_DTO CreateItem([FromBody] NhomQuyenPhanQuyen_DTO model)
        {
            _Nhomquyen_PhanQuyenBLL.Create(model);
            return model;
        }
        [Route("delete-nhomquyen_phanquyen")]
        [HttpDelete]
        public IActionResult DeleteItem(NhomQuyenPhanQuyen_DTO ma)
        {
            _Nhomquyen_PhanQuyenBLL.Delete(ma);
            return Ok(ma);
        }
    }
}
