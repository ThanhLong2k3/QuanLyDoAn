using DTO.QL_DanhMuc;

namespace BLL.InterFace.QL_DanhMuc
{
    public partial interface IKhoa_BLL
    {
        List<KhoaDTO> GetAllKhoa();
        KhoaDTO GetKhoaById(string maKhoa);
        string AddKhoa(KhoaDTO khoa);
        string UpdateKhoa(KhoaDTO khoa);
        string DeleteKhoa(string maKhoa);
    }
}
