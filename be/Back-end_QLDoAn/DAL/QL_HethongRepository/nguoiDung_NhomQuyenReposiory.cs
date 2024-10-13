using DAL.InterFace.QL_HeThong;
using DTO.QL_HeThong;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.QL_HethongRepository
{
    public class nguoiDung_NhomQuyenReposiory : InguoiDung_nhomQuyenRepository
    {
        private IDatabaseHelper _dbHelper;

        public nguoiDung_NhomQuyenReposiory(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }
        public List<NguoiDung_NhomQuyen_DTO> GetByMaNhomQuyen(string ma)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "getallnguoidung_nhomquyen", "@maNhomQuyen", ma);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<NguoiDung_NhomQuyen_DTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public string Create(NguoiDungNhomQuyen_DTO model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "addNguoiDung_NhomQuyen",
                    "@taiKhoan", model.taiKhoan,
                    "@maNhomQuyen", model.maNhomQuyen
                );

                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError);
                }

                return Convert.ToString(result);
            }
            catch (Exception ex)
            {
                throw new Exception("Đã xảy ra lỗi trong quá trình thêm nhóm quyền: " + ex.Message, ex);
            }
        }



        public bool Delete(NguoiDungNhomQuyen_DTO model)
        {
            string msgError = "";
            bool kq;
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedure(out msgError, "delNguoiDung_NhomQuyen",
                     "@taiKhoan", model.taiKhoan,
                     "@maNhomQuyen", model.maNhomQuyen);

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
