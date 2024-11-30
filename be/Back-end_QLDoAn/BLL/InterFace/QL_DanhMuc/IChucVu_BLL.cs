using DTO.QL_DanhMuc;

namespace BLL.InterFace.QL_DanhMuc
{
    public partial interface IChucVu_BLL
    {
        List<ChucVuDTO> GetAllChucVu();
        ChucVuDTO GetChucVuById(string maChucVu);
        string AddChucVu(ChucVuDTO chucVu);
        string UpdateChucVu(ChucVuDTO chucVu);
        string DeleteChucVu(string maChucVu);
    }
}
