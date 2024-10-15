using DAL.InterFace.QL_HeThong;
using DTO.QL_HeThong;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.QL_HethongRepository
{
    public class phanQuyenRepository : IPhanQuyenRepository
    {
        private IDatabaseHelper _dbHelper;

        public phanQuyenRepository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public List<phanQuyen_DTO> GetAll()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "getallquyen");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<phanQuyen_DTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<phanQuyen_DTO> GetByMaNhomQuyen(string ma)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "getphanquyenbymanhomquyen",
                    "@maNhomQuyen",ma);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<phanQuyen_DTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



    }
}
