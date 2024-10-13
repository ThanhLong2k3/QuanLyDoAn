using Microsoft.AspNetCore.Mvc;
using DTO.QL_HeThong;
using BLL.InterFace.QL_HeThong;
namespace quanLyDoAn.Controllers.QL_HeThong
{

    [Route("api/[controller]")]
    [ApiController]
    public class nguoiDung_CTRL : Controller
    {
        private INguoiDung_BLL _nguoiDungBLL;
        public nguoiDung_CTRL(INguoiDung_BLL nguoiDung_BLL)
        {
            _nguoiDungBLL = nguoiDung_BLL;
        }
        [Route("getall")]
        [HttpGet]
        public List<nguoiDung_DTO> Getall()
        {
            return _nguoiDungBLL.GetAll();
        }

        [Route("get-by-taikhoan/{id}")]
        [HttpGet]
        public List<nguoiDung_DTO> GetDatabyID(string id)
        {
            return _nguoiDungBLL.GetDatabyID(id);
        }
        [Route("create-nguoiDung")]
        [HttpPost]
        public nguoiDung_DTO CreateItem([FromBody] nguoiDung_DTO model)
        {
            _nguoiDungBLL.Create(model);
            return model;
        }
        [Route("update-nguoiDung")]
        [HttpPost]
        public nguoiDung_DTO UpdateItem([FromBody] nguoiDung_DTO model)
        {
            _nguoiDungBLL.Update(model);
            return model;
        }
        [Route("dangnhap-nguoiDung")]
        [HttpPost]
        public DangNhapDTO DangNhap([FromBody] DangNhapDTO model)
        {
            _nguoiDungBLL.DangNhap(model);
            return model;
        }

    }
}
