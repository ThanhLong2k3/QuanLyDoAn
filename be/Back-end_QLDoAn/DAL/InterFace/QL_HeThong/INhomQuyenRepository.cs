using DTO.QL_HeThong;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.InterFace.QL_HeThong
{
    public partial interface INhomQuyenRepository
    {
        public List<nhomQuyen_DTO> GetAll();
        public List<nhomQuyen_DTO> GetById(int id);
        int Create(nhomQuyen_DTO model);
        bool Update(nhomQuyen_DTO model);
        bool Delete(int id);
    }
}
