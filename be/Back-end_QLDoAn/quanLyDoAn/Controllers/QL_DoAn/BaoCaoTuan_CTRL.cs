using BLL.InterFace.QL_DoAn;
using DTO.QL_DoAn;
using Microsoft.AspNetCore.Mvc;

namespace quanLyDoAn.Controllers.QL_DoAn
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaoCaoTuan_CTRL : ControllerBase
    {

        private IBaoCaoTuan_BLL _BaoCaoBLL;
        public BaoCaoTuan_CTRL(IBaoCaoTuan_BLL BaoCaoBLL)
        {
            _BaoCaoBLL = BaoCaoBLL;
        }

        [Route("getall_MaDeTai")]
        [HttpGet]
        public List<BaoCaoTuanDTO> Getall(string Id)
        {
            return _BaoCaoBLL.GetBaoCaoTuan_MaDeTai(Id);
        }

        [Route("create-BaoCao")]
        [HttpPost]
        public string CreateItem([FromBody] BaoCaoTuanDTO model)
        {
            return _BaoCaoBLL.Create(model);
        }
        [Route("update-BaoCao")]
        [HttpPost]
        public string UpdateItem([FromBody] BaoCaoTuanDTO model)
        {
            return _BaoCaoBLL.Update(model);
        }
    }
}
