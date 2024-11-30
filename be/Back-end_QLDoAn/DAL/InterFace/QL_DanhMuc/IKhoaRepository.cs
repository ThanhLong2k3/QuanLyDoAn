using DTO.QL_DanhMuc;

namespace DAL.InterFace.QL_DanhMuc
{
    public interface IKhoaRepository
    {
        List<KhoaDTO> GetAllKhoa();
        KhoaDTO GetKhoaById(string maKhoa);
        string AddKhoa(KhoaDTO khoa);
        string UpdateKhoa(KhoaDTO khoa);
        string DeleteKhoa(string maKhoa);
    }

}
