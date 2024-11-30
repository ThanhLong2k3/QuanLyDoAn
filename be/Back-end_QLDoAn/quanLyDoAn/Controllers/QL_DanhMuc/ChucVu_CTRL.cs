using BLL.InterFace.QL_DanhMuc;
using DTO.QL_DanhMuc;
using Microsoft.AspNetCore.Mvc;

namespace quanLyDoAn.Controllers.QL_DanhMuc
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChucVu_CTRL : Controller
    {
        private IChucVu_BLL _ChucVuBLL;

        public ChucVu_CTRL(IChucVu_BLL ChucVuBLL)
        {
            _ChucVuBLL = ChucVuBLL;
        }

        // API để lấy tất cả chức vụ
        [Route("getall")]
        [HttpGet]
        public List<ChucVuDTO> GetAll()
        {
            return _ChucVuBLL.GetAllChucVu(); // Trả về danh sách tất cả các chức vụ
        }

        // API để lấy chức vụ theo ID
        [Route("getbyid")]
        [HttpGet]
        public ChucVuDTO GetById(string maChucVu)
        {
            return _ChucVuBLL.GetChucVuById(maChucVu); // Trả về thông tin chức vụ theo mã chức vụ
        }

        // API để tạo mới chức vụ
        [Route("create-ChucVu")]
        [HttpPost]
        public string CreateItem([FromBody] ChucVuDTO model)
        {
            string result = _ChucVuBLL.AddChucVu(model); // Thêm mới chức vụ
            return result; // Trả về kết quả thêm chức vụ (thành công hoặc thất bại)
        }

        // API để cập nhật chức vụ
        [Route("update-ChucVu")]
        [HttpPost]
        public string UpdateItem([FromBody] ChucVuDTO model)
        {
            string result = _ChucVuBLL.UpdateChucVu(model); // Cập nhật chức vụ
            return result; // Trả về kết quả cập nhật chức vụ (thành công hoặc thất bại)
        }

        // API để xóa chức vụ
        [Route("delete-ChucVu")]
        [HttpDelete]
        public string DeleteItem(string maChucVu)
        {
            string result = _ChucVuBLL.DeleteChucVu(maChucVu); // Xóa chức vụ
            return result; // Trả về kết quả xóa chức vụ (thành công hoặc thất bại)
        }
    }
}
