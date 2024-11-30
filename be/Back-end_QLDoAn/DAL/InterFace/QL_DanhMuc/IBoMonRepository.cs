using DTO.QL_DanhMuc;

namespace DAL.InterFace.QL_DanhMuc
{
    public interface IBoMonRepository
    {
        List<BoMonDTO> GetAllBoMon();
        BoMonDTO GetBoMonById(string maBoMon);
        string AddBoMon(BoMonDTO boMon);
        string UpdateBoMon(BoMonDTO boMon);
        string DeleteBoMon(string maBoMon);
    }

}
