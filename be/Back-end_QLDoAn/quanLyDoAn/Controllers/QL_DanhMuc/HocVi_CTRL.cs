using BLL.InterFace.QL_DanhMuc;
using DTO.QL_DanhMuc;
using Microsoft.AspNetCore.Mvc;

namespace quanLyDoAn.Controllers.QL_DanhMuc
{
    [Route("api/[controller]")]
    [ApiController]
    public class HocVi_CTRL : Controller
    {
        private IHocVi_BLL _HocViBLL;

        public HocVi_CTRL(IHocVi_BLL HocViBLL)
        {
            _HocViBLL = HocViBLL;
        }

        

        [Route("getall-HocVi")]
        [HttpGet]
        public List<HocViDTO> GetAllHocVi()
        {
            return _HocViBLL.GetAllHocVi(); 
        }

        [Route("create-HocVi")]
        [HttpPost]
        public string CreateItem([FromBody] HocViDTO model)
        {
            string result = _HocViBLL.AddHocVi(model); 
            return result; 
        }

        [Route("update-HocVi")]
        [HttpPost]
        public string UpdateItem([FromBody] HocViDTO model)
        {
            string result = _HocViBLL.UpdateHocVi(model); 
            return result; 
        }

        [Route("delete-HocVi")]
        [HttpDelete]
        public string DeleteItem(string maHocVi)
        {
            string result = _HocViBLL.DeleteHocVi(maHocVi);
            return result; 
        }
    }
}
