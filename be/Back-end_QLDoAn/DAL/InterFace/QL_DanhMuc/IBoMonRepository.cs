using DTO.QL_DanhMuc;

namespace DAL.InterFace.QL_DanhMuc
{
    public interface IBoMonRepository
    {
        List<BoMonDTO> GetAllBoMon();
        BoMonDTO GetBoMonById(string maBoMon);
        string AddBoMon(D_BoMonDTO boMon);
        string UpdateBoMon(D_BoMonDTO boMon);
        string DeleteBoMon(string maBoMon);
    }

}
