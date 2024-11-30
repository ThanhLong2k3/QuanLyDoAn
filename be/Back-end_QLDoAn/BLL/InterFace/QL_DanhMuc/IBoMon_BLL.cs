using DTO.QL_DanhMuc;

namespace BLL.InterFace.QL_DanhMuc
{
    public partial interface IBoMon_BLL
    {
        List<BoMonDTO> GetAllBoMon();
        BoMonDTO GetBoMonById(string maBoMon);
        string AddBoMon(BoMonDTO boMon);
        string UpdateBoMon(BoMonDTO boMon);
        string DeleteBoMon(string maBoMon);
    }
}
