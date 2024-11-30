using DTO.QL_DanhMuc;
using DAL.InterFace.QL_DanhMuc;
using BLL.InterFace.QL_DanhMuc;

namespace BLL.QL_DanhMuc
{
    public class Khoa_BLL : IKhoa_BLL
    {
        private IKhoaRepository _khoaRepository;

        public Khoa_BLL(IKhoaRepository khoaRepository)
        {
            _khoaRepository = khoaRepository;
        }

        public List<KhoaDTO> GetAllKhoa()
        {
            return _khoaRepository.GetAllKhoa();
        }

        public KhoaDTO GetKhoaById(string maKhoa)
        {
            return _khoaRepository.GetKhoaById(maKhoa);
        }

        public string AddKhoa(KhoaDTO khoa)
        {
            return _khoaRepository.AddKhoa(khoa);
        }

        public string UpdateKhoa(KhoaDTO khoa)
        {
            return _khoaRepository.UpdateKhoa(khoa);
        }

        public string DeleteKhoa(string maKhoa)
        {
            return _khoaRepository.DeleteKhoa(maKhoa);
        }

    }
}
