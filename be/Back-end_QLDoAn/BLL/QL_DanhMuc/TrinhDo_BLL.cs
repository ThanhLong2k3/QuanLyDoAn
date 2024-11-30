using BLL.InterFace.QL_DanhMuc;
using DAL.InterFace.QL_DanhMuc;
using DTO.QL_DanhMuc;

namespace BLL.QL_DanhMuc
{
    public class TrinhDo_BLL : ITrinhDo_BLL
    {
        private ITrinhDoRepository _repository;

        public TrinhDo_BLL(ITrinhDoRepository repository)
        {
            _repository = repository;
        }

        public List<TrinhDoDTO> GetAllTrinhDo_HocHam()
        {
            return _repository.GetAllTrinhDo_HocHam();
        }

        public List<TrinhDoDTO> GetAllTrinhDo_HocVi()
        {
            return _repository.GetAllTrinhDo_HocVi();
        }

        public string AddTrinhDo(TrinhDoDTO trinhDo)
        {
            return _repository.AddTrinhDo(trinhDo);
        }

        public string UpdateTrinhDo(TrinhDoDTO trinhDo)
        {
            return _repository.UpdateTrinhDo(trinhDo);
        }

        public string DeleteTrinhDo(string maHocHam_HocVi)
        {
            return _repository.DeleteTrinhDo(maHocHam_HocVi);
        }
    }
}
