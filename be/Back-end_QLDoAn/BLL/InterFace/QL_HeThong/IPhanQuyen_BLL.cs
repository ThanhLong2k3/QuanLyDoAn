using DTO.QL_HeThong;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.InterFace.QL_HeThong
{
    public partial interface IPhanQuyen_BLL
    {
        public List<phanQuyen_DTO> GetAll();
        public List<phanQuyen_DTO> GetByMaNhomQuyen(string ma);

    }
}
