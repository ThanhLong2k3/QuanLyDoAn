using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BLL.InterFace.QL_DoAn.NhomSinhVien_BLL;
using DAL.InterFace.QL_DoAn.INhomSinhVienRepository;
using DTO.QL_DoAn.NhomSinhVien;

namespace BLL.QL_NguoiDung.NhomSinhVien
{
    public class LoiMoiThamGiaNhom_BLL:ILoiMoiThamGiaNhom_BLL
    {
        private ILoiMoiThamGiaNhomRepository _repository;
        public LoiMoiThamGiaNhom_BLL(ILoiMoiThamGiaNhomRepository repository)
        {
            _repository = repository;
        }

        public string GuiLoiMoi(GuiLoiMoi_DTO model)
        {
           return _repository.GuiLoiMoi(model);
        }

        public List<LoiMoiThamGiaNhom_DTO> LayLoiMoiChoXacNhan(string masinhvien)
        {
            return _repository.LayLoiMoiChoXacNhan(masinhvien);
        }

        public string XuLyLoiMoi(XuLyLoiMoi_DTO model)
        {
            return _repository.XuLyLoiMoi(model);
        }
    }
}
