using DTO.QL_HeThong;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.InterFace
{
    public partial interface INguoiDung_BLL
    {
        public List<nguoiDung_DTO> GetAll();
        List< nguoiDung_DTO> GetDatabyID(string tk);
        string Create(nguoiDung_DTO model);
        bool Update(nguoiDung_DTO model);
        bool Delete(string tk);
    }
}
