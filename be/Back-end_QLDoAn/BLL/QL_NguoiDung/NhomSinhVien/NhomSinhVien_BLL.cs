using BLL.InterFace.QL_DoAn.NhomSinhVien_BLL;
using DAL.InterFace.QL_DoAn.INhomSinhVienRepository;
using DTO.QL_DoAn;
using DTO.QL_DoAn.NhomSinhVien;

namespace BLL.QL_NguoiDung.NhomSinhVien
{
    public class NhomSinhVien_BLL:INhomSinhVien_BLL
    {
        private INhom_Sinh_VienRepository _repository;
        public NhomSinhVien_BLL(INhom_Sinh_VienRepository repository)
        {
            _repository = repository;
        }
        public List<V_NhomSinhVien_DTO> getNhombymaSinhVien(string? masinhvien, int? isTruongNhom, string? maDot, string? maGiangVien)
        {
            return _repository.getNhombymaSinhVien(masinhvien, isTruongNhom,maDot,maGiangVien);
        }
        public string Create(NhomSinhVienDTO model)
        {
            return _repository.Create(model);
        }

        public string Delete(string manhom, string maTruongNhom)
        {
           return _repository.Delete(manhom, maTruongNhom);
        }
    }
}
