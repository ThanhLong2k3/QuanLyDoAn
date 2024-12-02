using DTO.QL_DanhMuc;
using DAL.InterFace.QL_DanhMuc;
using BLL.InterFace.QL_DanhMuc;

namespace BLL.QL_DanhMuc
{
    public class BoMon_BLL : IBoMon_BLL
    {
        private IBoMonRepository _boMonRepository;

        public BoMon_BLL(IBoMonRepository boMonRepository)
        {
            _boMonRepository = boMonRepository;
        }

        public List<BoMonDTO> GetAllBoMon()
        {
            return _boMonRepository.GetAllBoMon();
        }

        public BoMonDTO GetBoMonById(string maBoMon)
        {
            return _boMonRepository.GetBoMonById(maBoMon);
        }

        public string AddBoMon(D_BoMonDTO boMon)
        {
            return _boMonRepository.AddBoMon(boMon);
        }

        public string UpdateBoMon(D_BoMonDTO boMon)
        {
            return _boMonRepository.UpdateBoMon(boMon);
        }

        public string DeleteBoMon(string maBoMon)
        {
            return _boMonRepository.DeleteBoMon(maBoMon);
        }
    }
}
