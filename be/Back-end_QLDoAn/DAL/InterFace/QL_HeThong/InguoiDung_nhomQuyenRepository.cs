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
        public List<NguoiDungNhomQuyen_DTO> GetAll();
        public List<NguoiDungNhomQuyen_DTO> GetById(string taikhoan,int manhomquyen);
        int Create(NguoiDungNhomQuyen_DTO model);
        bool Update(NguoiDungNhomQuyen_DTO model);
        bool Delete(string taikhoan, int manhomquyen);
    }
}
