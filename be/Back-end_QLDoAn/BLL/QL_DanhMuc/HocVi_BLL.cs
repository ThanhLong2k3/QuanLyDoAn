using BLL.InterFace.QL_DanhMuc;
using DAL.InterFace.QL_DanhMuc;
using DTO.QL_DanhMuc;

namespace BLL.QL_DanhMuc
{
    public class HocVi_BLL : IHocVi_BLL
    {
        private IHocViRepository _repository;

        public HocVi_BLL(IHocViRepository repository)
        {
            _repository = repository;
        }

        public List<HocViDTO> GetAllHocVi()
        {
            return _repository.GetAllHocVi_HocVi();
        }

       

        public string AddHocVi(HocViDTO HocVi)
        {
            return _repository.AddHocVi(HocVi);
        }

        public string UpdateHocVi(HocViDTO HocVi)
        {
            return _repository.UpdateHocVi(HocVi);
        }

        public string DeleteHocVi(string maHocHam_HocVi)
        {
            return _repository.DeleteHocVi(maHocHam_HocVi);
        }
    }
}
