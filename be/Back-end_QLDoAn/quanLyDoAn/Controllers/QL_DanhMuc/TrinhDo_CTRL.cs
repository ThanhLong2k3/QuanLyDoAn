using BLL.InterFace.QL_DanhMuc;
using DTO.QL_DanhMuc;
using Microsoft.AspNetCore.Mvc;

namespace quanLyDoAn.Controllers.QL_DanhMuc
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrinhDo_CTRL : Controller
    {
        private ITrinhDo_BLL _TrinhDoBLL;

        public TrinhDo_CTRL(ITrinhDo_BLL TrinhDoBLL)
        {
            _TrinhDoBLL = TrinhDoBLL;
        }

        // API để lấy tất cả trình độ học hàm
        [Route("getall-HocHam")]
        [HttpGet]
        public List<TrinhDoDTO> GetAllHocHam()
        {
            return _TrinhDoBLL.GetAllTrinhDo_HocHam(); // Trả về danh sách trình độ học hàm
        }

        // API để lấy tất cả trình độ học vị
        [Route("getall-HocVi")]
        [HttpGet]
        public List<TrinhDoDTO> GetAllHocVi()
        {
            return _TrinhDoBLL.GetAllTrinhDo_HocVi(); // Trả về danh sách trình độ học vị
        }

        // API để tạo mới trình độ
        [Route("create-TrinhDo")]
        [HttpPost]
        public string CreateItem([FromBody] TrinhDoDTO model)
        {
            string result = _TrinhDoBLL.AddTrinhDo(model); // Thêm mới trình độ
            return result; // Trả về kết quả thêm trình độ (thành công hoặc thất bại)
        }

        // API để cập nhật trình độ
        [Route("update-TrinhDo")]
        [HttpPost]
        public string UpdateItem([FromBody] TrinhDoDTO model)
        {
            string result = _TrinhDoBLL.UpdateTrinhDo(model); // Cập nhật trình độ
            return result; // Trả về kết quả cập nhật trình độ (thành công hoặc thất bại)
        }

        // API để xóa trình độ
        [Route("delete-TrinhDo")]
        [HttpDelete]
        public string DeleteItem(string maTrinhDo)
        {
            string result = _TrinhDoBLL.DeleteTrinhDo(maTrinhDo); // Xóa trình độ
            return result; // Trả về kết quả xóa trình độ (thành công hoặc thất bại)
        }
    }
}
