using BLL.InterFace.QL_HeThong;
using DTO.QL_HeThong;
using Microsoft.AspNetCore.Mvc;

namespace quanLyDoAn.Controllers.QL_HeThong
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhanQuyen_CTRL : Controller
    {
        private IPhanQuyen_BLL _PhanQuyenBLL;
        public PhanQuyen_CTRL(IPhanQuyen_BLL phanQuyenBLL)
        {
            _PhanQuyenBLL = phanQuyenBLL;
        }
        [Route("getall")]
        [HttpGet]
        public List<phanQuyen_DTO> Getall()
        {
            return _PhanQuyenBLL.GetAll();
        }
        [Route("get_phanquyen_manhomquyen")]
        [HttpGet]
        public List<phanQuyen_DTO> GetByMaNhomQuyen(string ma)
        {
            return _PhanQuyenBLL.GetByMaNhomQuyen(ma);
        }

    }
}
