using BLL.InterFace.QL_DanhMuc;
using DTO.QL_DanhMuc;
using Microsoft.AspNetCore.Mvc;

namespace quanLyDoAn.Controllers.QL_DanhMuc
{
    [Route("api/[controller]")]
    [ApiController]
    public class HocHam_CTRL : Controller
    {
        private IHocHam_BLL _HocHamBLL;

        public HocHam_CTRL(IHocHam_BLL HocHamBLL)
        {
            _HocHamBLL = HocHamBLL;
        }



        [Route("getall-HocHam")]
        [HttpGet]
        public List<HocHamDTO> GetAllHocHam()
        {
            return _HocHamBLL.GetAllHocHam();
        }

        [Route("create-HocHam")]
        [HttpPost]
        public string CreateItem([FromBody] HocHamDTO model)
        {
            string result = _HocHamBLL.AddHocHam(model);
            return result;
        }

        [Route("update-HocHam")]
        [HttpPost]
        public string UpdateItem([FromBody] HocHamDTO model)
        {
            string result = _HocHamBLL.UpdateHocHam(model);
            return result;
        }

        [Route("delete-HocHam")]
        [HttpDelete]
        public string DeleteItem(string maHocHam)
        {
            string result = _HocHamBLL.DeleteHocHam(maHocHam);
            return result;
        }
    }
}
