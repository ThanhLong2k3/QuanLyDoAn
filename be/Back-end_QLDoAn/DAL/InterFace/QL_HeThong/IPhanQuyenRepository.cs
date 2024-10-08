using DTO.QL_HeThong;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.InterFace.QL_HeThong
{
    public partial interface IPhanQuyenRepository
    {
        public List<phanQuyen_DTO> GetAll();
        public List<phanQuyen_DTO> GetById(int id);
        int Create(phanQuyen_DTO model);
        bool Update(phanQuyen_DTO model);
        bool Delete(int id);
    }
}
