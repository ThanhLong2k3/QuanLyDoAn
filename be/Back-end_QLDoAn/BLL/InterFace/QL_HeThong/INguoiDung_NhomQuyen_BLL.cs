using DTO.QL_HeThong;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.InterFace.QL_HeThong
{
    public partial interface INguoiDung_NhomQuyen_BLL
    {
        public List<NguoiDung_NhomQuyen_DTO> GetByMaNhomQuyen(string ma);
        string Create(NguoiDungNhomQuyen_DTO model);
        bool Delete(NguoiDungNhomQuyen_DTO model);
    }
}
