using DTO.QL_HeThong;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.InterFace.QL_HeThong
{
    public partial interface  INhomQuyenPhanQuyenRepository
    {
        public List<NhomQuyenPhanQuyen_DTO> GetAll();
        public List<NhomQuyenPhanQuyen_DTO> GetById(int manquyen, int maquyen);
        int Create(NhomQuyenPhanQuyen_DTO model);
        bool Update(NhomQuyenPhanQuyen_DTO model);
        bool Delete(int manquyen, int maquyen);
    }
}
