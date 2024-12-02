using DAL.InterFace.QL_DanhMuc;
using DTO.QL_DanhMuc;

namespace DAL.QL_DanhMuc
{
        public class HocViRepository : IHocViRepository
        {
            private IDatabaseHelper _dbHelper;

            public HocViRepository(IDatabaseHelper dbHelper)
            {
                _dbHelper = dbHelper;
            }

            // Lấy tất cả các trình độ
            public List<HocViDTO> GetAllHocVi_HocHam()
            {
                string msgError = "";
                try
                {
                    var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "GetAllHocVi_HocHam");
                    if (!string.IsNullOrEmpty(msgError))
                        throw new Exception(msgError);
                    return dt.ConvertTo<HocViDTO>().ToList();
                }
                catch (Exception ex)
                {
                    throw new Exception("Lỗi khi lấy danh sách Trình Độ: " + ex.Message, ex);
                }
            }
        public List<HocViDTO> GetAllHocVi_HocVi()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "GetAllTrinhDo_HocVi");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<HocViDTO>().ToList();
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi lấy danh sách Trình Độ: " + ex.Message, ex);
            }

        }

       
            public string AddHocVi(HocViDTO HocVi)
            {
                string msgError = "";
            string kq;
                try
                {
                    var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "InsertHocVi",
                        "@maHocVi", HocVi.maHocVi,
                        "@tenHocVi", HocVi.tenHocVi,
                        "@kyHieu", HocVi.kyHieu,
                        "@moTa", HocVi.moTa,
                        "@soLuongHuongDan", HocVi.soLuongHuongDan
                        
                    );

                if (result != null)
                {
                    kq = result.ToString();
                }
                else
                {
                    kq = "Không có phản hồi từ server";
                }
                return kq;
            }
                catch (Exception ex)
                {
                    throw new Exception("Đã xảy ra lỗi trong quá trình thêm Trình Độ: " + ex.Message, ex);
                }
            }

            // Cập nhật trình độ
            public string  UpdateHocVi(HocViDTO HocVi)
            {
                string msgError = "";
            string kq;
                try
                {
                    var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "UpdateHocVi",
                        "@maHocVi", HocVi.maHocVi,
                        "@tenHocVi", HocVi.tenHocVi,
                        "@kyHieu", HocVi.kyHieu,
                        "@moTa", HocVi.moTa,
                        "@soLuongHuongDan", HocVi.soLuongHuongDan
                        
                    );

                if (result != null)
                {
                    kq = result.ToString();
                }
                else
                {
                    kq = "Không có phản hồi từ server";
                }
                return kq;
            }
                catch (Exception ex)
                {
                    throw new Exception("Đã xảy ra lỗi trong quá trình cập nhật Trình Độ: " + ex.Message, ex);
                }
            }

            // Xóa trình độ
            public string DeleteHocVi(string maHocVi)
            {
                string msgError = "";
            string kq;
                try
                {
                    var result = _dbHelper.ExecuteScalarSProcedure(out msgError, "DeleteHocVi", "@maHocVi", maHocVi);

                if (result != null)
                {
                    kq = result.ToString();
                }
                else
                {
                    kq = "Không có phản hồi từ server";
                }
                return kq;
            }
                catch (Exception ex)
                {
                    throw new Exception("Đã xảy ra lỗi trong quá trình xóa Trình Độ: " + ex.Message, ex);
                }
            }
        }
    }



