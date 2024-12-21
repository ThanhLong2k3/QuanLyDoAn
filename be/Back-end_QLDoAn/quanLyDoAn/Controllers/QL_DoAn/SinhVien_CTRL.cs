using BLL.InterFace.QL_DoAn;
using DTO.QL_DoAn;
using Microsoft.AspNetCore.Mvc;

namespace quanLyDoAn.Controllers.QL_DoAn
{

    [Route("api/[controller]")]
    [ApiController]
    public class SinhVien_CTRL : Controller
    {
        private ISinhVien_BLL _SinhVienBLL;
        public SinhVien_CTRL(ISinhVien_BLL SinhVienBLL)
        {
            _SinhVienBLL = SinhVienBLL;
        }


        [Route("get_By_Id")]
        [HttpGet]
        public V_SinhVienDTO GET_SINHVIEN_ID(string taikhoan)
        {
            return _SinhVienBLL.GET_SINHVIEN_ID(taikhoan);
        }


        [Route("getall")]
        [HttpGet]
        public List<V_SinhVienDTO> Getall()
        {
            return _SinhVienBLL.GetAll();
        }

        [Route("create-SinhVien")]
        [HttpPost]
        public string CreateItem([FromBody] SinhVienDTO model,string taikhoan)
        {
            return _SinhVienBLL.Create(model, taikhoan); ;
        }
        [Route("update-SinhVien")]
        [HttpPost]
        public string UpdateItem([FromBody] SinhVienDTO model,string taikhoan)
        {
            return _SinhVienBLL.Update(model, taikhoan); 
        }
        [Route("delete-SinhVien")]
        [HttpDelete]
        public string DeleteItem(string ma, string taikhoan)
        {
            return _SinhVienBLL.Delete(ma, taikhoan);
        }


        [Route("update-SinhVien_SinhVien")]
        [HttpPost]
        public string Update([FromBody] Up_SV_SINHVIENDTO model)
        {
            return _SinhVienBLL.Update_SinhVien(model);
        }

    }
}
