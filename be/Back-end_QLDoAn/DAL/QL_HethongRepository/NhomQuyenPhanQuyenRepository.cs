using DAL.InterFace.QL_HeThong;
using DTO.QL_HeThong;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.QL_HethongRepository
{
    public class NhomQuyenPhanQuyenRepository:INhomQuyenPhanQuyenRepository
    {
        private IDatabaseHelper _dbHelper;

        public NhomQuyenPhanQuyenRepository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }
        public List<NhomQuyenPhanQuyen_DTO> GETPHANQUYENBYTAIKHOAN(string taikhoan)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "GETPHANQUYENBYTAIKHOAN",
                    "@taiKhoan",taikhoan);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<NhomQuyenPhanQuyen_DTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public string Create(NhomQuyenPhanQuyen_DTO model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "themnhomquyen_phanquyen",
                    "@maNhomQuyen",model.maNhomQuyen,
                    "@maQuyen",model.maQuyen
                );

                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError);
                }

                return Convert.ToString(result);
            }
            catch (Exception ex)
            {
                throw new Exception("Đã xảy ra lỗi trong quá trình thêm quyền: " + ex.Message, ex);
            }
        }
        public bool Delete(NhomQuyenPhanQuyen_DTO model)
        {
            string msgError = "";
            bool kq;
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedure(out msgError, "xoanhomquyen_phanquyen",
                     "@maNhomQuyen", model.maNhomQuyen,
                    "@maQuyen", model.maQuyen);

                if (Convert.ToInt32(result) > 0)
                {
                    kq = true;
                }
                else
                {
                    kq = false;
                }
                return kq;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
    }
}
