using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BLL.InterFace.QL_DanhMuc;
using DAL.InterFace.QL_DanhMuc;
using DTO.QL_DanhMuc;

namespace BLL.QL_DanhMuc
{
    public class HocHam_BLL:IHocHam_BLL
    {
        private IHocHamReponsitory _repository;

        public HocHam_BLL(IHocHamReponsitory repository)
        {
            _repository = repository;
        }

        public List<HocHamDTO> GetAllHocHam()
        {
            return _repository.GetAllHocHam();
        }



        public string AddHocHam(HocHamDTO HocHam)
        {
            return _repository.AddHocHam(HocHam);
        }

        public string UpdateHocHam(HocHamDTO HocHam)
        {
            return _repository.UpdateHocHam(HocHam);
        }

        public string DeleteHocHam(string maHocHam_HocHam)
        {
            return _repository.DeleteHocHam(maHocHam_HocHam);
        }
    }
}
