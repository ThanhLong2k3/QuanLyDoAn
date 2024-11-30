using BLL.InterFace.QL_DanhMuc;
using DTO.QL_DanhMuc;
using Microsoft.AspNetCore.Mvc;

namespace quanLyDoAn.Controllers.QL_DanhMuc
{
    [Route("api/[controller]")]
    [ApiController]
    public class Khoa_CTRL : Controller
    {
        private IKhoa_BLL _KhoaBLL;

        public Khoa_CTRL(IKhoa_BLL KhoaBLL)
        {
            _KhoaBLL = KhoaBLL;
        }

        // API để lấy tất cả khoa
        [Route("getall")]
        [HttpGet]
        public List<KhoaDTO> GetAll()
        {
            return _KhoaBLL.GetAllKhoa(); // Trả về danh sách tất cả các khoa
        }

        // API để lấy khoa theo ID
        [Route("getbyid")]
        [HttpGet]
        public KhoaDTO GetById(string maKhoa)
        {
            return _KhoaBLL.GetKhoaById(maKhoa); // Trả về thông tin khoa theo mã khoa
        }

        // API để tạo mới khoa
        [Route("create-Khoa")]
        [HttpPost]
        public string CreateItem([FromBody] KhoaDTO model)
        {
            string result = _KhoaBLL.AddKhoa(model); // Thêm mới khoa
            return result; // Trả về kết quả thêm khoa (thành công hoặc thất bại)
        }

        // API để cập nhật khoa
        [Route("update-Khoa")]
        [HttpPost]
        public string UpdateItem([FromBody] KhoaDTO model)
        {
            string result = _KhoaBLL.UpdateKhoa(model); // Cập nhật khoa
            return result; // Trả về kết quả cập nhật khoa (thành công hoặc thất bại)
        }

        // API để xóa khoa
        [Route("delete-Khoa")]
        [HttpDelete]
        public string DeleteItem(string maKhoa)
        {
            string result = _KhoaBLL.DeleteKhoa(maKhoa); // Xóa khoa
            return result; // Trả về kết quả xóa khoa (thành công hoặc thất bại)
        }
    }
}
