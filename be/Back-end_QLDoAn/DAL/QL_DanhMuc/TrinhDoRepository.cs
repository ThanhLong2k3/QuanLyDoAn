using DAL.InterFace.QL_DanhMuc;
using DTO.QL_DanhMuc;

namespace DAL.QL_DanhMuc
{
        public class TrinhDoRepository : ITrinhDoRepository
        {
            private IDatabaseHelper _dbHelper;

            public TrinhDoRepository(IDatabaseHelper dbHelper)
            {
                _dbHelper = dbHelper;
            }

            // Lấy tất cả các trình độ
            public List<TrinhDoDTO> GetAllTrinhDo_HocHam()
            {
                string msgError = "";
                try
                {
                    var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "GetAllTrinhDo_HocHam");
                    if (!string.IsNullOrEmpty(msgError))
                        throw new Exception(msgError);
                    return dt.ConvertTo<TrinhDoDTO>().ToList();
                }
                catch (Exception ex)
                {
                    throw new Exception("Lỗi khi lấy danh sách Trình Độ: " + ex.Message, ex);
                }
            }
        public List<TrinhDoDTO> GetAllTrinhDo_HocVi()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "GetAllTrinhDo_HocVi");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<TrinhDoDTO>().ToList();
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi lấy danh sách Trình Độ: " + ex.Message, ex);
            }

        }

       
            public string AddTrinhDo(TrinhDoDTO trinhDo)
            {
                string msgError = "";
            string kq;
                try
                {
                    var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "InsertTrinhDo",
                        "@maHocHam_HocVi", trinhDo.maHocHam_HocVi,
                        "@tenHocHam_HocVi", trinhDo.tenHocHam_HocVi,
                        "@kyHieu", trinhDo.kyHieu,
                        "@moTa", trinhDo.moTa,
                        "@soLuongHuongDan", trinhDo.soLuongHuongDan,
                        "@hocHam_HocVi", trinhDo.hocHam_HocVi
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
            public string  UpdateTrinhDo(TrinhDoDTO trinhDo)
            {
                string msgError = "";
            string kq;
                try
                {
                    var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "UpdateTrinhDo",
                        "@maHocHam_HocVi", trinhDo.maHocHam_HocVi,
                        "@tenHocHam_HocVi", trinhDo.tenHocHam_HocVi,
                        "@kyHieu", trinhDo.kyHieu,
                        "@moTa", trinhDo.moTa,
                        "@soLuongHuongDan", trinhDo.soLuongHuongDan,
                        "@hocHam_HocVi", trinhDo.hocHam_HocVi
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
            public string DeleteTrinhDo(string maHocHam_HocVi)
            {
                string msgError = "";
            string kq;
                try
                {
                    var result = _dbHelper.ExecuteScalarSProcedure(out msgError, "DeleteTrinhDo", "@maHocHam_HocVi", maHocHam_HocVi);

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



