USE QL_DoAn;
GO
--=====================================================QUẢN LÝ DANH MỤC============================

CREATE TABLE TrinhDo(
	maHocHam_HocVi VARCHAR(20) PRIMARY KEY,
	tenHocHam_HocVi NVARCHAR(20) NOT NULL,
	kyHieu VARCHAR(20),
	moTa NVARCHAR(50),
	soLuongHuongDan int not Null,
	hocHam_HocVi int not null  --0: học hàm , 1 : học vị
)
CREATE TABLE ChucVu(
	maChucVu VARCHAR(50) PRIMARY KEY,
	tenChucVu NVARCHAR(50) NOT NULL,
	moTa NVARCHAR(50)
)
CREATE TABLE Khoa(
	maKhoa VARCHAR(20) PRIMARY KEY,
	tenKhoa NVARCHAR(50) NOT NULL
)
CREATE TABLE BoMon(
	maBoMon VARCHAR(50) PRIMARY KEY,
	tenBoMon NVARCHAR(50) NOT NULL,
	tenKhoa NVARCHAR(50) 
)

--===============================PROCEDURE

--GET ALL
GO
CREATE PROCEDURE GetAllTrinhDo_HocHam
AS
BEGIN
    SELECT * FROM TrinhDo WHERE hocHam_HocVi=0;
END;
GO
CREATE PROCEDURE GetAllTrinhDo_HocVi
AS
BEGIN
    SELECT * FROM TrinhDo WHERE hocHam_HocVi=1;
END;

GO
CREATE PROCEDURE GetAllChucVu
AS
BEGIN
    SELECT * FROM ChucVu;
END;
GO
CREATE PROCEDURE GetAllKhoa
AS
BEGIN
    SELECT * FROM Khoa;
END;
GO
CREATE PROCEDURE GetAllBoMon
AS
BEGIN
    SELECT * FROM BoMon;
END;
-- =====================================================THÊM ====================

GO

CREATE PROCEDURE InsertTrinhDo
    @maHocHam_HocVi VARCHAR(20),
    @tenHocHam_HocVi NVARCHAR(20),
    @kyHieu VARCHAR(20),
    @moTa NVARCHAR(50),
    @soLuongHuongDan INT,
    @hocHam_HocVi int  -- 0: Học hàm, 1: Học vị
AS
BEGIN
    IF EXISTS (SELECT 1 FROM TrinhDo WHERE maHocHam_HocVi = @maHocHam_HocVi)
    BEGIN
        SELECT N'Mã học hàm/học vị đã tồn tại!' AS ThongBao;
    END
    ELSE
    BEGIN
        INSERT INTO TrinhDo (maHocHam_HocVi, tenHocHam_HocVi, kyHieu, moTa, soLuongHuongDan, hocHam_HocVi)
        VALUES (@maHocHam_HocVi, @tenHocHam_HocVi, @kyHieu, @moTa, @soLuongHuongDan, @hocHam_HocVi);
        
        SELECT N'Thêm học hàm/học vị thành công!' AS ThongBao;
    END
END;

GO
CREATE PROCEDURE InsertChucVu
    @maChucVu VARCHAR(50),      -- Mã chức vụ
    @tenChucVu NVARCHAR(50),    -- Tên chức vụ
    @moTa NVARCHAR(50)          -- Mô tả chức vụ
AS
BEGIN
    IF EXISTS (SELECT 1 FROM ChucVu WHERE maChucVu = @maChucVu)
    BEGIN
        SELECT N'Mã chức vụ đã tồn tại!' AS ThongBao;
    END
    ELSE
    BEGIN
        INSERT INTO ChucVu (maChucVu, tenChucVu, moTa)
        VALUES (@maChucVu, @tenChucVu, @moTa);
        
        SELECT N'Thêm chức vụ thành công!' AS ThongBao;
    END
END;


GO
CREATE PROCEDURE InsertKhoa
    @maKhoa VARCHAR(20),      -- Mã khoa
    @tenKhoa NVARCHAR(50)     -- Tên khoa
AS
BEGIN
    IF EXISTS (SELECT 1 FROM Khoa WHERE maKhoa = @maKhoa)
    BEGIN
        SELECT N'Mã khoa đã tồn tại!' AS ThongBao;
    END
    ELSE
    BEGIN
        INSERT INTO Khoa (maKhoa, tenKhoa)
        VALUES (@maKhoa, @tenKhoa);
        
        SELECT N'Thêm khoa thành công!' AS ThongBao;
    END
END;

GO
CREATE PROCEDURE InsertBoMon
    @maBoMon VARCHAR(50),      -- Mã bộ môn
    @tenBoMon NVARCHAR(50),    -- Tên bộ môn
    @tenKhoa NVARCHAR(50)      -- Tên khoa liên kết (dùng tên khoa thay vì mã khoa)
AS
BEGIN
    IF EXISTS (SELECT 1 FROM BoMon WHERE maBoMon = @maBoMon)
    BEGIN
        SELECT N'Mã bộ môn đã tồn tại!' AS ThongBao;
    END
    ELSE
    BEGIN
        INSERT INTO BoMon (maBoMon, tenBoMon, tenKhoa)
        VALUES (@maBoMon, @tenBoMon, @tenKhoa);
        
        SELECT N'Thêm bộ môn thành công!' AS ThongBao;
    END
END;
--=======================================================HÀM SỬA============

GO
CREATE PROCEDURE UpdateChucVu
    @maChucVu VARCHAR(50),      -- Mã chức vụ
    @tenChucVu NVARCHAR(50),    -- Tên chức vụ
    @moTa NVARCHAR(50)          -- Mô tả chức vụ
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM ChucVu WHERE maChucVu = @maChucVu)
    BEGIN
        SELECT N'Mã chức vụ không tồn tại!' AS ThongBao;
    END
    ELSE
    BEGIN
        UPDATE ChucVu
        SET tenChucVu = @tenChucVu,
            moTa = @moTa
        WHERE maChucVu = @maChucVu;
        
        SELECT N'Cập nhật chức vụ thành công!' AS ThongBao;
    END
END;

GO
CREATE PROCEDURE UpdateKhoa
    @maKhoa VARCHAR(20),      -- Mã khoa
    @tenKhoa NVARCHAR(50)     -- Tên khoa
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Khoa WHERE maKhoa = @maKhoa)
    BEGIN
        SELECT N'Mã khoa không tồn tại!' AS ThongBao;
    END
    ELSE
    BEGIN
        UPDATE Khoa
        SET tenKhoa = @tenKhoa
        WHERE maKhoa = @maKhoa;
        
        SELECT N'Cập nhật khoa thành công!' AS ThongBao;
    END
END;

GO
CREATE PROCEDURE UpdateBoMon
    @maBoMon VARCHAR(50),      -- Mã bộ môn
    @tenBoMon NVARCHAR(50),    -- Tên bộ môn
    @tenKhoa NVARCHAR(50)      -- Tên khoa liên kết (dùng tên khoa thay vì mã khoa)
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM BoMon WHERE maBoMon = @maBoMon)
    BEGIN
        SELECT N'Mã bộ môn không tồn tại!' AS ThongBao;
    END
    ELSE
    BEGIN
        UPDATE BoMon
        SET tenBoMon = @tenBoMon,
            tenKhoa = @tenKhoa
        WHERE maBoMon = @maBoMon;
        
        SELECT N'Cập nhật bộ môn thành công!' AS ThongBao;
    END
END;
GO


CREATE PROCEDURE UpdateTrinhDo
    @maHocHam_HocVi VARCHAR(20),          -- Mã học hàm/học vị
    @tenHocHam_HocVi NVARCHAR(20),        -- Tên học hàm/học vị
    @kyHieu VARCHAR(20),                  -- Ký hiệu (viết tắt)
    @moTa NVARCHAR(50),                   -- Mô tả
    @soLuongHuongDan INT,                 -- Số lượng hướng dẫn
    @hocHam_HocVi int                     -- 0: Học hàm, 1: Học vị
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM TrinhDo WHERE maHocHam_HocVi = @maHocHam_HocVi)
    BEGIN
        SELECT N'Mã học hàm/học vị không tồn tại!' AS ThongBao;
    END
    ELSE
    BEGIN
        UPDATE TrinhDo
        SET tenHocHam_HocVi = @tenHocHam_HocVi,
            kyHieu = @kyHieu,
            moTa = @moTa,
            soLuongHuongDan = @soLuongHuongDan,
            hocHam_HocVi = @hocHam_HocVi
        WHERE maHocHam_HocVi = @maHocHam_HocVi;
        
        SELECT N'Cập nhật học hàm/học vị thành công!' AS ThongBao;
    END
END;

--===================================================================HÀM XÓA

GO
CREATE PROCEDURE DeleteChucVu
    @maChucVu VARCHAR(50)      -- Mã chức vụ
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM ChucVu WHERE maChucVu = @maChucVu)
    BEGIN
        SELECT N'Mã chức vụ không tồn tại!' AS ThongBao;
    END
    ELSE
    BEGIN
        DELETE FROM ChucVu WHERE maChucVu = @maChucVu;
        
        SELECT N'Xóa chức vụ thành công!' AS ThongBao;
    END
END;


GO
CREATE PROCEDURE DeleteKhoa
    @maKhoa VARCHAR(20)      -- Mã khoa
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Khoa WHERE maKhoa = @maKhoa)
    BEGIN
        SELECT N'Mã khoa không tồn tại!' AS ThongBao;
    END
    ELSE
    BEGIN
        DELETE FROM Khoa WHERE maKhoa = @maKhoa;
        
        SELECT N'Xóa khoa thành công!' AS ThongBao;
    END
END;


GO
CREATE PROCEDURE DeleteBoMon
    @maBoMon VARCHAR(50)      -- Mã bộ môn
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM BoMon WHERE maBoMon = @maBoMon)
    BEGIN
        SELECT N'Mã bộ môn không tồn tại!' AS ThongBao;
    END
    ELSE
    BEGIN
        DELETE FROM BoMon WHERE maBoMon = @maBoMon;
        
        SELECT N'Xóa bộ môn thành công!' AS ThongBao;
    END
END;

GO
CREATE PROCEDURE DeleteTrinhDo
    @maHocHam_HocVi VARCHAR(20)      -- Mã học hàm/học vị
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM TrinhDo WHERE maHocHam_HocVi = @maHocHam_HocVi)
    BEGIN
        SELECT N'Mã học hàm/học vị không tồn tại!' AS ThongBao;
    END
    ELSE
    BEGIN
        DELETE FROM TrinhDo WHERE maHocHam_HocVi = @maHocHam_HocVi;
        
        SELECT N'Xóa học hàm/học vị thành công!' AS ThongBao;
    END
END;
