using Microsoft.AspNetCore.Mvc;

namespace Back_end_QLDoAn.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class nguoiDungCTRL : Controller
    {
        private INguoiDung_BLL _nguoiDung_BLL;
    }
}
