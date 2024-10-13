using BLL.InterFace.QL_HeThong;
using DTO.QL_HeThong;
using Microsoft.AspNetCore.Mvc;

namespace quanLyDoAn.Controllers.QL_HeThong
{
    [Route("api/[controller]")]
    [ApiController]
    public class nguoiDung_NhomQuyen_CTRL : Controller
    {
        private INguoiDung_NhomQuyen_BLL _nguoiDung_NhomQuyenBLL;
        public nguoiDung_NhomQuyen_CTRL(INguoiDung_NhomQuyen_BLL nguoiDung_NhomQuyen_BLL)
        {
            _nguoiDung_NhomQuyenBLL = nguoiDung_NhomQuyen_BLL;
        }
        [Route("getall")]
        [HttpGet]
        public List<NguoiDung_NhomQuyen_DTO> GetByMaNhomQuyen(string ma)
        {
            return _nguoiDung_NhomQuyenBLL.GetByMaNhomQuyen(ma);
        }


        [Route("create-nguoiDung_NhomQuyen")]
        [HttpPost]
        public NguoiDungNhomQuyen_DTO CreateItem([FromBody] NguoiDungNhomQuyen_DTO model)
        {
            _nguoiDung_NhomQuyenBLL.Create(model);
            return model;
        }

        [Route("delete-nguoiDung_NhomQuyen")]
        [HttpDelete]
        public IActionResult DeleteItem(NguoiDungNhomQuyen_DTO model)
        {
            _nguoiDung_NhomQuyenBLL.Delete(model);
            return Ok(model);
        }

    }
}
