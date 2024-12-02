using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO.QL_DanhMuc;

namespace BLL.InterFace.QL_DanhMuc
{
    public interface IHocHam_BLL
    {
        List<HocHamDTO> GetAllHocHam();
        string AddHocHam(HocHamDTO HocHam);
        string UpdateHocHam(HocHamDTO HocHam);
        string DeleteHocHam(string maHocHam_HocHam);
    }
}
