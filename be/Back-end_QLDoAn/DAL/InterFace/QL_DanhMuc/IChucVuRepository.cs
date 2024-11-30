using DTO.QL_DanhMuc;

namespace DAL.InterFace.QL_DanhMuc
{
    public interface IChucVuRepository
    {
        List<ChucVuDTO> GetAllChucVu();
        ChucVuDTO GetChucVuById(string maChucVu);
        string AddChucVu(ChucVuDTO chucVu);
        string UpdateChucVu(ChucVuDTO chucVu);
        string DeleteChucVu(string maChucVu);
    }

}
