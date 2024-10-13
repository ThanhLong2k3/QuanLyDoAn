using DTO.QL_HeThong;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.InterFace.QL_HeThong
{
    public partial interface INhomQuyen_BLL
    {
        public List<nhomQuyen_DTO> GetAll();
        string Create(nhomQuyen_DTO model);
        bool Update(nhomQuyen_DTO model);
        bool Delete(string ma);

    }
}
