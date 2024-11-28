using DAL.InterFace.QL_HeThong;
using DTO.QL_HeThong;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.QL_HethongRepository
{
    public class nhomQuyenRepository : INhomQuyenRepository
    {
        private IDatabaseHelper _dbHelper;

        public nhomQuyenRepository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public List<nhomQuyen_DTO> GetAll()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "Getallnhomquyen");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<nhomQuyen_DTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<nhomQuyen_DTO> GetNhomQuyen_TaiKhoan(string taikhoan)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "GETNHOMQUYEN_TAIKHOAN","@TaiKhoan",taikhoan);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<nhomQuyen_DTO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public string Create(nhomQuyen_DTO model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "Them_NhomQuyen",
                    "@maNhomQuyen", model.maNhomQuyen,
                    "@tenNhomQuyen", model.tenNhomQuyen,
                    "@loai", model.loai,
                    "@moTa", model.moTa
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


        public bool Update(nhomQuyen_DTO model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "Sua_NhomQuyen",
                     "@maNhomQuyen", model.maNhomQuyen,
                    "@tenNhomQuyen", model.tenNhomQuyen,
                    "@loai", model.loai,
                    "@moTa", model.moTa
                );

                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError);
                }

                if (result != null && !string.IsNullOrEmpty(result.ToString()))
                {
                    return true;
                }

                return false;
            }
            catch (Exception ex)
            {
                throw new Exception("Đã xảy ra lỗi trong quá trình cập nhật người dùng: " + ex.Message, ex);
            }
        }
        public bool Delete(string ma)
        {
            string msgError = "";
            bool kq;
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedure(out msgError, "Xoa_NhomQuyen",
                     "@maNhomQuyen", ma);

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
