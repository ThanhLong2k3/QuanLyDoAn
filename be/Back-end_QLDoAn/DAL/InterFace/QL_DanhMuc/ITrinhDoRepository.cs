using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO.QL_DanhMuc;

namespace DAL.InterFace.QL_DanhMuc
{
    public interface ITrinhDoRepository
    {
        List<TrinhDoDTO> GetAllTrinhDo_HocHam();
        List<TrinhDoDTO> GetAllTrinhDo_HocVi();
        string AddTrinhDo(TrinhDoDTO trinhDo);
        string UpdateTrinhDo(TrinhDoDTO trinhDo);
        string DeleteTrinhDo(string maHocHam_HocVi);
    }

}
