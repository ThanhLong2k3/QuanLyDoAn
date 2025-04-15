using BLL.InterFace.QL_DoAn.NhomSinhVien_BLL;
using DAL.InterFace.QL_DoAn.INhomSinhVienRepository;
using DTO.QL_DoAn.NhomSinhVien;

namespace BLL.QL_NguoiDung.NhomSinhVien
{
    public class ThanhVienNhom_BLL:IThanhVienNhom_BLL
    {
        private IThanhVienNhomRepository _repository;
        public ThanhVienNhom_BLL(IThanhVienNhomRepository repository)
        {
            _repository = repository;
        }

        public string Create(ThanhVienNhomDTO model, string matruongnhom)
        {
            return _repository.Create(model, matruongnhom);
        }
        public string Delete(ThanhVienNhomDTO model, string matruongnhom)
        {
            return _repository.Delete(model, matruongnhom);
        }

        public List<Get_ThanhVienNhom_DTO> get_ThanhVien_Id(string Id)
        {
            return _repository.get_ThanhVien_Id(Id);
        }
    }
}
