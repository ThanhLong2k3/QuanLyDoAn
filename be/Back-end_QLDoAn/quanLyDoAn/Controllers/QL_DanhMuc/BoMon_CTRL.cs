using BLL.InterFace.QL_DanhMuc;
using DTO.QL_DanhMuc;
using Microsoft.AspNetCore.Mvc;

namespace quanLyDoAn.Controllers.QL_DanhMuc
{
    [Route("api/[controller]")]
    [ApiController]
    public class BoMon_CTRL : Controller
    {
        private IBoMon_BLL _BoMonBLL;

        public BoMon_CTRL(IBoMon_BLL BoMonBLL)
        {
            _BoMonBLL = BoMonBLL;
        }

        // API để lấy tất cả bộ môn
        [Route("getall")]
        [HttpGet]
        public List<BoMonDTO> GetAll()
        {
            return _BoMonBLL.GetAllBoMon(); // Trả về danh sách bộ môn
        }

        // API để tạo mới bộ môn
        [Route("create-BoMon")]
        [HttpPost]
        public string CreateItem([FromBody] D_BoMonDTO model)
        {
            string result = _BoMonBLL.AddBoMon(model); // Thêm mới bộ môn
            return result; // Trả về kết quả thêm bộ môn (thành công hoặc thất bại)
        }

        // API để cập nhật bộ môn
        [Route("update-BoMon")]
        [HttpPost]
        public string UpdateItem([FromBody] D_BoMonDTO model)
        {
            string result = _BoMonBLL.UpdateBoMon(model); // Cập nhật bộ môn
            return result; // Trả về kết quả cập nhật bộ môn (thành công hoặc thất bại)
        }

        // API để xóa bộ môn
        [Route("delete-BoMon")]
        [HttpDelete]
        public string DeleteItem(string maBoMon)
        {
            string result = _BoMonBLL.DeleteBoMon(maBoMon); // Xóa bộ môn
            return result; // Trả về kết quả xóa bộ môn (thành công hoặc thất bại)
        }
    }
}
