using DTO.QL_DanhMuc;
using DAL.InterFace.QL_DanhMuc;
using BLL.InterFace.QL_DanhMuc;

namespace BLL.QL_DanhMuc
{
    public class ChucVu_BLL : IChucVu_BLL
    {
        private IChucVuRepository _chucVuRepository;

        public ChucVu_BLL(IChucVuRepository chucVuRepository)
        {
            _chucVuRepository = chucVuRepository;
        }

        public List<ChucVuDTO> GetAllChucVu()
        {
            return _chucVuRepository.GetAllChucVu();
        }

        public ChucVuDTO GetChucVuById(string maChucVu)
        {
            return _chucVuRepository.GetChucVuById(maChucVu);
        }

        public string AddChucVu(ChucVuDTO chucVu)
        {
            return _chucVuRepository.AddChucVu(chucVu);
        }

        public string UpdateChucVu(ChucVuDTO chucVu)
        {
            return _chucVuRepository.UpdateChucVu(chucVu);
        }

        public string DeleteChucVu(string maChucVu)
        {
            return _chucVuRepository.DeleteChucVu(maChucVu);
        }

        
    }
}
