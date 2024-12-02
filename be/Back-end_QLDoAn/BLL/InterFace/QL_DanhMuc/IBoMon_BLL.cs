using DTO.QL_DanhMuc;

namespace BLL.InterFace.QL_DanhMuc
{
    public partial interface IBoMon_BLL
    {
        List<BoMonDTO> GetAllBoMon();
        BoMonDTO GetBoMonById(string maBoMon);
        string AddBoMon(D_BoMonDTO boMon);
        string UpdateBoMon(D_BoMonDTO boMon);
        string DeleteBoMon(string maBoMon);
    }
}
