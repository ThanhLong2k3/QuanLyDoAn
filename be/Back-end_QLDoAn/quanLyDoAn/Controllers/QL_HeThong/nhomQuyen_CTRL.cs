using BLL.InterFace.QL_HeThong;
using DTO.QL_HeThong;
using Microsoft.AspNetCore.Mvc;

namespace quanLyDoAn.Controllers.QL_HeThong
{
    [Route("api/[controller]")]
    [ApiController]
    public class nhomQuyen_CTRL : Controller
    {
        private INhomQuyen_BLL _nhomQuyenBLL;
        public nhomQuyen_CTRL(INhomQuyen_BLL nhomQuyen_BLL)
        {
            _nhomQuyenBLL = nhomQuyen_BLL;
        }
        [Route("getall")]
        [HttpGet]
        public List<nhomQuyen_DTO> Getall()
        {
            return _nhomQuyenBLL.GetAll();
        }

        [Route("getnhomquyen_taikhoan")]
        [HttpGet]
        public List<nhomQuyen_DTO> GetNhomQuyen_TaiKhoan(string tk)
        {
            return _nhomQuyenBLL.GetNhomQuyen_TaiKhoan(tk);
        }
        [Route("create-nhomQuyen")]
        [HttpPost]
        public nhomQuyen_DTO CreateItem([FromBody] nhomQuyen_DTO model)
        {
            _nhomQuyenBLL.Create(model);
            return model;
        }
        [Route("update-nhomQuyen")]
        [HttpPost]
        public nhomQuyen_DTO UpdateItem([FromBody] nhomQuyen_DTO model)
        {
            _nhomQuyenBLL.Update(model);
            return model;
        }
        [Route("delete-nhomQuyen")]
        [HttpDelete]
        public IActionResult DeleteItem(string ma)
        {
            _nhomQuyenBLL.Delete(ma);
            return Ok(ma);
        }

    }
}
