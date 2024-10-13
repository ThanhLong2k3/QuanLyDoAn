using DTO.QL_HeThong;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.InterFace.QL_HeThong
{
    public partial interface InguoiDung_nhomQuyenRepository
    {
        public List<NguoiDung_NhomQuyen_DTO> GetByMaNhomQuyen(string manhomquyen);
        string Create(NguoiDungNhomQuyen_DTO model);
        bool Delete(NguoiDungNhomQuyen_DTO model);
    }
}
