﻿CREATE DATABASE QL_DoAn;
GO
USE QL_DoAn
GO
-- TrinhDo table
CREATE TABLE HocHam(
    maHocHam VARCHAR(20) PRIMARY KEY,
    tenHocHam NVARCHAR(20) NOT NULL,
    kyHieu VARCHAR(20),
    moTa NVARCHAR(50),
    soLuongHuongDan int NOT NULL,
    IsDeleted int
)
CREATE TABLE HocVi(
    maHocVi VARCHAR(20) PRIMARY KEY,
    tenHocVi NVARCHAR(20) NOT NULL,
    kyHieu VARCHAR(20),
    moTa NVARCHAR(50),
    soLuongHuongDan int NOT NULL,
    IsDeleted int
)
-- ChucVu table
CREATE TABLE ChucVu(
    maChucVu VARCHAR(50) PRIMARY KEY,
    tenChucVu NVARCHAR(50) NOT NULL,
    moTa NVARCHAR(50),
    IsDeleted int
)

-- Khoa table
CREATE TABLE Khoa(
    maKhoa VARCHAR(20) PRIMARY KEY,
    tenKhoa NVARCHAR(50) NOT NULL,
    IsDeleted int
)

-- BoMon table
CREATE TABLE BoMon(
    maBoMon VARCHAR(50) PRIMARY KEY,
    tenBoMon NVARCHAR(50) NOT NULL,
    IDKhoa VARCHAR(20),
    IsDeleted int,
    FOREIGN KEY (IDKhoa) REFERENCES Khoa(maKhoa) ON DELETE CASCADE ON UPDATE CASCADE
)

-- lop table
CREATE TABLE lop (
    maLop VARCHAR(50) PRIMARY KEY,
    tenLop NVARCHAR(50) NOT NULL,
    tenChuyenNganh NVARCHAR(50) NOT NULL,
    khoaHoc VARCHAR(10) NOT NULL,
    IsDeleted int,
)

-- nguoiDung table
CREATE TABLE nguoiDung (
    taiKhoan NVARCHAR(50) PRIMARY KEY,
    matKhau NVARCHAR(50) NOT NULL,
    hoTen NVARCHAR(50) NOT NULL,
    ngaySinh DATE NOT NULL,
    gioiTinh NVARCHAR(20), 
    email VARCHAR(50),
    moTa NVARCHAR(50),
    TrangThai NVARCHAR(20),
    IsDeleted int
)

-- giangVien table
CREATE TABLE giangVien (
    maGiangVien NVARCHAR(50) PRIMARY KEY,
    tenGiangVien NVARCHAR(255),
    IDBoMon VARCHAR(50),
    IDChucVu VARCHAR(50),
    IDHocHam VARCHAR(20),
    IDHocVi VARCHAR(20),
    ngaySinh DATE,
    gioiTinh NVARCHAR(10),
    sDT VARCHAR(15),
    email NVARCHAR(255),
    IsDeleted int,
    FOREIGN KEY (maGiangVien) REFERENCES nguoiDung(taiKhoan) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (IDBoMon) REFERENCES BoMon(maBoMon) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (IDChucVu) REFERENCES ChucVu(maChucVu) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (IDHocHam) REFERENCES HocHam(maHocHam) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (IDHocVi) REFERENCES HocVi(maHocVi) ON DELETE CASCADE ON UPDATE CASCADE
)

-- sinhVien table
CREATE TABLE sinhVien (
    maSinhVien NVARCHAR(50) PRIMARY KEY,
    tenSinhVien NVARCHAR(255),
    maLop VARCHAR(50),
    ngaySinh DATE,
    gioiTinh NVARCHAR(10),
    sDT VARCHAR(15),
    email NVARCHAR(255),
    IsDeleted int,
    FOREIGN KEY (maLop) REFERENCES lop(maLop) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (maSinhVien) REFERENCES nguoiDung(taiKhoan) ON DELETE CASCADE ON UPDATE CASCADE
)
-- dotLamDoAn table
CREATE TABLE dotLamDoAn (
    maDot VARCHAR(50) PRIMARY KEY,
    tenDot NVARCHAR(255),
    ngayBatDau DATE,
    namApDung VARCHAR(20),
    dangKyDeTai BIT,
    choPhepSinhVienDangKyGiangVienKhacBoMon BIT,
    choPhepSinhVienBaoCaoKhacTuanHienTai BIT,
    choPhepGiangVienBaoCaoKhacTuanHienTai BIT,
    choPhepGiangVienSuaDeTai BIT,
    trangThai BIT,
    IsDeleted int
)

-- hoiDong table
CREATE TABLE hoiDong (
    maHoiDong VARCHAR(50) PRIMARY KEY,
    tenHoiDong NVARCHAR(255),
    maDot VARCHAR(50),
    thuocLop VARCHAR(50),
    phong NVARCHAR(50),
    ngayDuKien DATE,
    IsDeleted int,
    FOREIGN KEY (maDot) REFERENCES dotLamDoAn(maDot) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (thuocLop) REFERENCES lop(maLop) ON DELETE NO ACTION ON UPDATE NO ACTION
)
CREATE TABLE hoiDongLop (
    maHoiDong VARCHAR(50),
    maLop VARCHAR(50),
    PRIMARY KEY (maHoiDong, maLop),
    FOREIGN KEY (maHoiDong) REFERENCES hoiDong(maHoiDong) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (maLop) REFERENCES lop(maLop) ON DELETE CASCADE ON UPDATE CASCADE
);
-- hoiDong_GiangVien table
CREATE TABLE hoiDong_GiangVien (
    maHoiDong VARCHAR(50),
    maGiangVien NVARCHAR(50),
    nhiemVu NVARCHAR(50) NULL,
    IsDeleted int,
    PRIMARY KEY (maHoiDong, maGiangVien),
    FOREIGN KEY (maHoiDong) REFERENCES hoiDong(maHoiDong) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (maGiangVien) REFERENCES giangVien(maGiangVien) ON DELETE NO ACTION ON UPDATE NO ACTION
)

-- hoiDong_SinhVien table
CREATE TABLE hoiDong_SinhVien (
    maHoiDong VARCHAR(50),
    maSinhVien NVARCHAR(50),
    IsDeleted int,
    PRIMARY KEY (maHoiDong, maSinhVien),
    FOREIGN KEY (maHoiDong) REFERENCES hoiDong(maHoiDong) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (maSinhVien) REFERENCES sinhVien(maSinhVien) ON DELETE NO ACTION ON UPDATE NO ACTION
)

-- ========================================QUAN LY HỆ THỐNG===========================================

-- Tạo bảng nhomQuyen
CREATE TABLE nhomQuyen (
    maNhomQuyen VARCHAR(20) PRIMARY KEY,
    tenNhomQuyen NVARCHAR(50) NOT NULL,
    loai NVARCHAR(20) NOT NULL,
    moTa NVARCHAR(50),
    soLuong INT
);

-- Tạo bảng phanQuyen
CREATE TABLE phanQuyen (
    maQuyen VARCHAR(50) PRIMARY KEY,
    tenQuyen NVARCHAR(50) NOT NULL
);

-- Tạo bảng nguoiDung_nhomQuyen (bảng kết hợp)
CREATE TABLE nguoiDung_nhomQuyen (
    taiKhoan NVARCHAR(50),
    maNhomQuyen VARCHAR(20),
    PRIMARY KEY (taiKhoan, maNhomQuyen),
    FOREIGN KEY (taiKhoan) REFERENCES nguoiDung(taiKhoan) ON DELETE CASCADE,
    FOREIGN KEY (maNhomQuyen) REFERENCES nhomQuyen(maNhomQuyen) ON DELETE CASCADE
);

-- Tạo bảng nhomQuyen_phanQuyen (bảng kết hợp)
CREATE TABLE nhomQuyen_phanQuyen (
    maNhomQuyen VARCHAR(20),
    maQuyen VARCHAR(50),
    PRIMARY KEY (maNhomQuyen, maQuyen),
    FOREIGN KEY (maNhomQuyen) REFERENCES nhomQuyen(maNhomQuyen) ON DELETE CASCADE,
    FOREIGN KEY (maQuyen) REFERENCES phanQuyen(maQuyen) ON DELETE CASCADE
);
-- Thêm dữ liệu vào bảng nhomQuyen
INSERT INTO nhomQuyen (maNhomQuyen, tenNhomQuyen, loai, moTa, soLuong) VALUES
('NQ01', N'Quản trị hệ thống', N'Hệ thống', N'Quản lý người dùng', 10),
('NQ02', N'Người dùng', N'Người dùng', N'Truy cập thông thường', 100),
('ADMIN', N'Quản trị hệ thống', N'Hệ thống', N'Quản lý người dùng', 10);


-- Thêm dữ liệu vào bảng phanQuyen
INSERT INTO phanQuyen (maQuyen,tenQuyen)
VALUES
    ('ADD_LOP',N'Thêm lớp'),
    ('UP_LOP',N'Chỉnh sửa lớp'),
    ('DEL_LOP',N'Xóa lớp'),
	('ADD_SINHVIEN',N'Thêm Sinh Viên'),
	('UP_SINHVIEN',N'Sửa Sinh Viên'),
	('DEL_SINHVIEN',N'Xóa Sinh Viên'),
	('ADD_GIANGVIEN',N'Thêm Giảng Viên'),
	('UP_GIANGVIEN',N'Sửa Giảng Viên'),
	('DEL_GIANGVIEN',N'Xóa Giảng Viên'),
	('ADD_NGUOIDUNG',N'Thêm người dùng'),
	('UP_NGUOIDUNG',N'Sửa người dùng'),
	('DEL_NGUOIDUNG',N'Xóa người dùng'),
	('ADD_NHOMQUYEN','Thêm nhóm quyền'),
	('UP_NHOMQUYEN',N'Sửa nhóm quyền'),
	('DEL_NHOMQUYEN',N'Xóa nhóm quyền'),
	('ADD_DOTLAMDOAN',N'Thêm đợt làm đồ án'),
	('UP_DOTLAMDOAN',N'Sửa đợt làm đồ án'),
	('DEL_DOTLAMDOAN',N'Xóa đợt làm đồ án');


go

INSERT INTO nguoiDung (taiKhoan, matKhau, hoTen, ngaySinh, gioiTinh, email, moTa, TrangThai,IsDeleted) VALUES
('GV001', '123456', N'Trần Văn A', '1970-05-10', N'Nam', 'a.tran@example.com', N'Giảng viên', N'Đã xét duyệt',1)
GO
-- Thêm dữ liệu vào bảng nguoiDung_nhomQuyen
INSERT INTO nguoiDung_nhomQuyen (taiKhoan, maNhomQuyen) VALUES
('GV001', 'NQ01')
go

INSERT INTO nhomQuyen_phanQuyen (maNhomQuyen,maQuyen)VALUES
('NQ01','ADD_GIANGVIEN'),
('NQ01','ADD_LOP'),
('NQ01','ADD_SINHVIEN'),
('NQ01','DEL_GIANGVIEN'),
('NQ01','DEL_LOP'),
('NQ01','DEL_SINHVIEN'),
('NQ01','UP_GIANGVIEN'),
('NQ01','UP_LOP'),
('NQ01','UP_SINHVIEN'),
('NQ01','ADD_NGUOIDUNG'),
('NQ01','ADD_NHOMQUYEN'),
('NQ01','DEL_NGUOIDUNG'),
('NQ01','DEL_NHOMQUYEN'),
('NQ01','UP_NGUOIDUNG'),
('NQ01','UP_NHOMQUYEN')
GO
--========================PROCEDURE=========================

--=========================Nhomquyen_Phan quyen
create procedure themnhomquyen_phanquyen
	@maNhomQuyen nvarchar(50),
	@maQuyen nvarchar(50)
	as
		begin
			insert into nhomQuyen_phanQuyen (maNhomQuyen,maQuyen) values(@maNhomQuyen,@maQuyen);
		end;
		go
		
create procedure xoanhomquyen_phanquyen
	@maNhomQuyen nvarchar(50),
	@maQuyen nvarchar(50)
	as
		begin
			delete from nhomQuyen_phanQuyen where maNhomQuyen=@maNhomQuyen and maQuyen=@maQuyen;
			 IF @@ROWCOUNT > 0
    BEGIN
        RETURN 1; -- Trả về 1 nếu xóa thành công
    END
    ELSE
    BEGIN
        RETURN 0; -- Trả về 0 nếu không có bản ghi nào bị xóa
    END
	end;
	go
create procedure getphanquyenbymanhomquyen
	@maNhomQuyen nvarchar(50)
	as
		begin
			select*from phanQuyen inner join nhomQuyen_phanQuyen nqpq on phanQuyen.maQuyen= nqpq.maQuyen where maNhomQuyen=@maNhomQuyen;
		end;
		go
-- THÊM NGU?I DÙNG
CREATE PROCEDURE dangnhap
    @taiKhoan NVARCHAR(50),
    @matKhau NVARCHAR(50)
AS
BEGIN
    -- Kiểm tra tài khoản và mật khẩu trong bảng nguoiDung (Giảng viên)
    IF EXISTS (
        SELECT 1 
        FROM nguoiDung 
        WHERE taiKhoan = @taiKhoan AND matKhau = @matKhau AND TrangThai = N'Đã xét duyệt'
    )
    BEGIN
        SELECT 2 AS Role; -- Giảng viên
        RETURN;
    END

    -- Nếu không tìm thấy tài khoản phù hợp
    SELECT 0 AS Role; -- Đăng nhập thất bại
END;
GO
CREATE PROC GetAllNguoiDung 
AS
	BEGIN 
	SELECT*FROM nguoiDung WHERE IsDeleted=1;
	END
GO

CREATE PROCEDURE ThemNguoiDung
    @taiKhoan NVARCHAR(50),
    @hoTen NVARCHAR(50),
    @ngaySinh DATE,
	@gioiTinh nvarchar(10),
    @email VARCHAR(50),
    @moTa NVARCHAR(50)
AS
BEGIN
    -- Ki?m tra xem tài kho?n dã t?n t?i hay chua
    IF NOT EXISTS (SELECT 1 FROM nguoiDung WHERE taiKhoan = @taiKhoan)
    BEGIN
        INSERT INTO nguoiDung (taiKhoan, matKhau, hoTen, ngaySinh,gioiTinh, email, moTa, TrangThai,IsDeleted)
        VALUES (@taiKhoan, '123456', @hoTen, @ngaySinh,@gioiTinh, @email, @moTa, N'Chưa xét duyệt',1);

        SELECT N'Thêm người dùng thành công' AS ThongBao;
    END
    ELSE
    BEGIN
        SELECT N'Tài khoản đã tồn tại !' AS ThongBao;
    END
END;
GO

-- S?A NGU?I DÙNG

CREATE PROCEDURE SuaNguoiDung
    @taiKhoan NVARCHAR(50),
    @matKhau NVARCHAR(50) = NULL,  
    @hoTen NVARCHAR(50) = NULL,
    @ngaySinh DATE = NULL,
	@gioiTinh nvarchar(10)=NULL,
    @email VARCHAR(50) = NULL,
    @moTa NVARCHAR(50) = NULL,
    @trangThai NVARCHAR(20) = NULL
AS
BEGIN
    UPDATE nguoiDung
    SET 
        matKhau = COALESCE(@matKhau, matKhau),
        hoTen = COALESCE(@hoTen, hoTen),
        ngaySinh = COALESCE(@ngaySinh, ngaySinh),
		gioiTinh=COALESCE(@gioiTinh,gioiTinh),
        email = COALESCE(@email, email),
        moTa = COALESCE(@moTa, moTa),
        TrangThai = COALESCE(@trangThai, TrangThai)
    WHERE taiKhoan = @taiKhoan and IsDeleted=1;

    SELECT N'Sửa người dùng thành công' AS ThongBao;
END;
GO
CREATE PROC DEL_NGUOIDUNG
	@TaiKhoan NVARCHAR(50)
AS
BEGIN
	UPDATE nguoiDung SET IsDeleted=0 WHERE taiKhoan=@TaiKhoan;
	END;
	GO
-- L?Y T?T C? NGU?I DÙNG

CREATE PROCEDURE SuaNguoiDung
AS
BEGIN
    SELECT * FROM nguoiDung where IsDeleted=1;
END;
GO

-- GET BY TÀI KHO?N

CREATE PROCEDURE GetNguoiDungByTaiKhoan
    @taiKhoan NVARCHAR(50)
AS
BEGIN
    SELECT * FROM nguoiDung
    WHERE taiKhoan = @taiKhoan and IsDeleted =1;
END;
go

-- Thêm nhóm quyền

CREATE PROCEDURE Them_NhomQuyen
	@maNhomQuyen varchar(20),
    @tenNhomQuyen NVARCHAR(50),
    @loai NVARCHAR(20),
    @moTa NVARCHAR(50)
AS
BEGIN
    INSERT INTO nhomQuyen ( maNhomQuyen,tenNhomQuyen, loai, moTa, soLuong)
    VALUES ( @maNhomQuyen,@tenNhomQuyen, @loai, @moTa, 0);
END;
go
-- Sửa nhóm quyền
CREATE PROCEDURE Sua_NhomQuyen
    @maNhomQuyen varchar(20),
    @tenNhomQuyen NVARCHAR(50),
    @loai NVARCHAR(20),
    @moTa NVARCHAR(50)
AS
BEGIN
    UPDATE nhomQuyen
    SET tenNhomQuyen = @tenNhomQuyen,
        loai = @loai,
        moTa = @moTa
    WHERE maNhomQuyen = @maNhomQuyen;
END;
go
-- Xóa nhóm quyền
CREATE PROCEDURE Xoa_NhomQuyen
    	@maNhomQuyen varchar(20)
AS
BEGIN
    -- Xóa nhóm quyền
    DELETE FROM nhomQuyen WHERE maNhomQuyen = @maNhomQuyen;

    -- Kiểm tra xem có bản ghi nào bị xóa không
    IF @@ROWCOUNT > 0
    BEGIN
        RETURN 1; -- Trả về 1 nếu xóa thành công
    END
    ELSE
    BEGIN
        RETURN 0; -- Trả về 0 nếu không có bản ghi nào bị xóa
    END
END;
go
CREATE PROCEDURE Getallnhomquyen
as
	begin 
		SELECT nq.maNhomQuyen, nq.tenNhomQuyen, nq.loai, nq.moTa,
       (SELECT COUNT(ndnq.taiKhoan) FROM nguoiDung_nhomQuyen ndnq WHERE ndnq.maNhomQuyen = nq.maNhomQuyen) AS soLuong
FROM nhomQuyen nq;
	end ;
	go
--========================nguoidung_nhomquyen
create procedure getallnguoidung_nhomquyen
	@maNhomQuyen varchar(20)
as
	begin 
		select nd.taiKhoan,nd.hoTen,nd.moTa from nguoiDung nd inner join nguoiDung_nhomQuyen nd_nq on nd.taiKhoan =nd_nq.taiKhoan inner join  nhomQuyen nq on nd_nq.maNhomQuyen = nq.maNhomQuyen where nq.maNhomQuyen = @maNhomQuyen 
	end

	go
create procedure addNguoiDung_NhomQuyen
	@taiKhoan nvarchar(20),
	@maNhomQuyen nvarchar(50)
as 
	begin 
		insert into nguoiDung_nhomQuyen (taiKhoan,maNhomQuyen) values(@taiKhoan,@maNhomQuyen)
		
	end;
	go

	
CREATE PROCEDURE delNguoiDung_NhomQuyen
    @taiKhoan NVARCHAR(20),
    @maNhomQuyen NVARCHAR(50)
AS 
BEGIN 
    DELETE FROM nguoiDung_nhomQuyen 
    WHERE taiKhoan = @taiKhoan AND maNhomQuyen = @maNhomQuyen
    
    IF @@ROWCOUNT > 0
    BEGIN
        RETURN 1; -- Trả về 1 nếu xóa thành công
    END
    ELSE
    BEGIN
        RETURN 0; -- Trả về 0 nếu không có bản ghi nào bị xóa
    END
END;
GO
	go
--Thêm quyền
create procedure getallQuyen
as
	begin
		select*from phanQuyen;
	end
	go
--=================nguoidung_nhomquyen
--PROCEDURE


-- Retrieve procedures
GO
GO
CREATE OR ALTER PROCEDURE GetAllTrinhDo_HocHam
AS
BEGIN
    SELECT TD.maHocHam, TD.tenHocHam, TD.kyHieu, TD.moTa, TD.soLuongHuongDan
    FROM HocHam TD
    WHERE TD.IsDeleted = 1;
END;

GO
CREATE OR ALTER PROCEDURE GetAllTrinhDo_HocVi
AS
BEGIN
    SELECT TD.maHocVi, TD.tenHocVi, TD.kyHieu, TD.moTa, TD.soLuongHuongDan
    FROM HocVi TD
    WHERE TD.IsDeleted = 1;
END;

GO
CREATE OR ALTER PROCEDURE GetAllChucVu
AS
BEGIN
    SELECT CV.maChucVu, CV.tenChucVu, CV.moTa
    FROM ChucVu CV
    WHERE CV.IsDeleted = 1;
END;

GO
CREATE OR ALTER PROCEDURE GetAllKhoa
AS
BEGIN
    SELECT K.maKhoa, K.tenKhoa
    FROM Khoa K
    WHERE K.IsDeleted = 1;
END;

GO

CREATE OR ALTER PROCEDURE GetAllBoMon
AS
BEGIN
    SELECT BM.maBoMon, BM.tenBoMon, K.tenKhoa,BM.IDKhoa
    FROM BoMon BM
    JOIN Khoa K ON BM.IDKhoa = K.maKhoa
    WHERE BM.IsDeleted = 1 AND K.IsDeleted = 1;
END;
GO

CREATE OR ALTER PROCEDURE GetAllGiangVien
AS
BEGIN
    SELECT 
        GV.maGiangVien, 
        GV.tenGiangVien, 
        BM.tenBoMon, 
        CV.tenChucVu, 
        HH.tenHocHam,
        HV.tenHocVi,
        GV.ngaySinh,
        GV.gioiTinh,
        GV.sDT,
        GV.email,
		GV.IDBoMon,
		GV.IDChucVu,
		GV.IDHocHam,
		GV.IDHocVi
    FROM giangVien GV
    INNER JOIN BoMon BM ON GV.IDBoMon = BM.maBoMon 
    INNER JOIN ChucVu CV ON GV.IDChucVu = CV.maChucVu 
    LEFT JOIN HocHam HH ON GV.IDHocHam = HH.maHocHam 
    LEFT JOIN HocVi HV ON GV.IDHocVi = HV.maHocVi
    WHERE GV.IsDeleted = 1;
END;
-- Insert procedures remain unchanged
-- Insert procedures

GO
CREATE OR ALTER PROCEDURE InsertHocHam
    @maHocHam VARCHAR(20),
    @tenHocHam NVARCHAR(20),
    @kyHieu VARCHAR(20),
    @moTa NVARCHAR(50),
    @soLuongHuongDan INT
AS
BEGIN
    IF EXISTS (SELECT 1 FROM HocHam WHERE maHocHam = @maHocHam AND IsDeleted = 1)
    BEGIN
        SELECT N'Mã học hàm đã tồn tại!' AS ThongBao;
    END
    ELSE
    BEGIN
        INSERT INTO HocHam(maHocHam, tenHocHam, kyHieu, moTa, soLuongHuongDan, IsDeleted)
        VALUES (@maHocHam, @tenHocHam, @kyHieu, @moTa, @soLuongHuongDan, 1);
        
        SELECT N'Thêm học hàm thành công!' AS ThongBao;
    END
END;
GO


CREATE OR ALTER PROCEDURE InsertHocVi
    @maHocVi VARCHAR(20),
    @tenHocVi NVARCHAR(20),
    @kyHieu VARCHAR(20),
    @moTa NVARCHAR(50),
    @soLuongHuongDan INT
AS
BEGIN
    IF EXISTS (SELECT 1 FROM HocVi WHERE maHocVi = @maHocVi AND IsDeleted = 1)
    BEGIN
        SELECT N'Mã học vị đã tồn tại!' AS ThongBao;
    END
    ELSE
    BEGIN
        INSERT INTO HocVi(maHocVi, tenHocVi, kyHieu, moTa, soLuongHuongDan, IsDeleted)
        VALUES (@maHocVi, @tenHocVi, @kyHieu, @moTa, @soLuongHuongDan, 1);
        
        SELECT N'Thêm học vị thành công!' AS ThongBao;
    END
END;

GO
CREATE OR ALTER PROCEDURE InsertChucVu
    @maChucVu VARCHAR(50),
    @tenChucVu NVARCHAR(50),
    @moTa NVARCHAR(50)
AS
BEGIN
    IF EXISTS (SELECT 1 FROM ChucVu WHERE maChucVu = @maChucVu AND IsDeleted = 1)
    BEGIN
        SELECT N'Mã chức vụ đã tồn tại!' AS ThongBao;
    END
    ELSE
    BEGIN
        INSERT INTO ChucVu (maChucVu, tenChucVu, moTa, IsDeleted)
        VALUES (@maChucVu, @tenChucVu, @moTa, 1);
        
        SELECT N'Thêm chức vụ thành công!' AS ThongBao;
    END
END;

GO
CREATE OR ALTER PROCEDURE InsertKhoa
    @maKhoa VARCHAR(20),
    @tenKhoa NVARCHAR(50)
AS
BEGIN
    IF EXISTS (SELECT 1 FROM Khoa WHERE maKhoa = @maKhoa AND IsDeleted = 1)
    BEGIN
        SELECT N'Mã khoa đã tồn tại!' AS ThongBao;
    END
    ELSE
    BEGIN
        INSERT INTO Khoa (maKhoa, tenKhoa, IsDeleted)
        VALUES (@maKhoa, @tenKhoa, 1);
        
        SELECT N'Thêm khoa thành công!' AS ThongBao;
    END
END;

GO
CREATE OR ALTER PROCEDURE InsertBoMon
    @maBoMon VARCHAR(50),
    @tenBoMon NVARCHAR(50),
    @IDKhoa  NVARCHAR(20)
AS
BEGIN
    IF EXISTS (SELECT 1 FROM BoMon WHERE maBoMon = @maBoMon AND IsDeleted = 1)
    BEGIN
        SELECT N'Mã bộ môn đã tồn tại!' AS ThongBao;
    END
    ELSE
    BEGIN
        INSERT INTO BoMon (maBoMon, tenBoMon,IDKhoa, IsDeleted)
        VALUES (@maBoMon, @tenBoMon, @IDKhoa, 1);
        
        SELECT N'Thêm bộ môn thành công!' AS ThongBao;
    END
END;

-- Update procedures
GO
CREATE OR ALTER PROCEDURE UpdateChucVu
    @maChucVu VARCHAR(50),
    @tenChucVu NVARCHAR(50),
    @moTa NVARCHAR(50)
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM ChucVu WHERE maChucVu = @maChucVu AND IsDeleted = 1)
    BEGIN
        SELECT N'Mã chức vụ không tồn tại!' AS ThongBao;
    END
    ELSE
    BEGIN
        UPDATE ChucVu
        SET tenChucVu = @tenChucVu,
            moTa = @moTa
        WHERE maChucVu = @maChucVu AND IsDeleted = 1;
        
        SELECT N'Cập nhật chức vụ thành công!' AS ThongBao;
    END
END;

GO
CREATE OR ALTER PROCEDURE UpdateKhoa
    @maKhoa VARCHAR(20),
    @tenKhoa NVARCHAR(50)
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Khoa WHERE maKhoa = @maKhoa AND IsDeleted = 1)
    BEGIN
        SELECT N'Mã khoa không tồn tại!' AS ThongBao;
    END
    ELSE
    BEGIN
        UPDATE Khoa
        SET tenKhoa = @tenKhoa
        WHERE maKhoa = @maKhoa AND IsDeleted = 1;
        
        SELECT N'Cập nhật khoa thành công!' AS ThongBao;
    END
END;

GO
GO
CREATE OR ALTER PROCEDURE UpdateBoMon
    @maBoMon VARCHAR(50),
    @tenBoMon NVARCHAR(50),
    @IDKhoa VARCHAR(20)
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM BoMon WHERE maBoMon = @maBoMon AND IsDeleted = 1)
    BEGIN
        SELECT N'Mã bộ môn không tồn tại!' AS ThongBao;
    END
    ELSE IF NOT EXISTS (SELECT 1 FROM Khoa WHERE maKhoa = @IDKhoa AND IsDeleted = 1)
    BEGIN
        SELECT N'Mã khoa không tồn tại!' AS ThongBao;
    END
    ELSE
    BEGIN
        UPDATE BoMon
        SET tenBoMon = @tenBoMon,
            IDKhoa = @IDKhoa
        WHERE maBoMon = @maBoMon AND IsDeleted = 1;
        
        SELECT N'Cập nhật bộ môn thành công!' AS ThongBao;
    END
END;


GO
CREATE OR ALTER PROCEDURE UpdateHocHam
    @maHocHam VARCHAR(20),
    @tenHocHam NVARCHAR(20),
    @kyHieu VARCHAR(20),
    @moTa NVARCHAR(50),
    @soLuongHuongDan INT
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM HocHam WHERE maHocHam = @maHocHam AND IsDeleted = 1)
    BEGIN
        SELECT N'Mã học hàm không tồn tại!' AS ThongBao;
    END
    ELSE
    BEGIN
        UPDATE HocHam
        SET tenHocHam = @tenHocHam,
            kyHieu = @kyHieu,
            moTa = @moTa,
            soLuongHuongDan = @soLuongHuongDan
        WHERE maHocHam = @maHocHam AND IsDeleted = 1;
        
        SELECT N'Cập nhật học hàm thành công!' AS ThongBao;
    END
END;

-- Delete procedures (soft delete)
GO
GO
CREATE OR ALTER PROCEDURE UpdateHocVi
    @maHocVi VARCHAR(20),
    @tenHocVi NVARCHAR(20),
    @kyHieu VARCHAR(20),
    @moTa NVARCHAR(50),
    @soLuongHuongDan INT
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM HocVi WHERE maHocVi = @maHocVi AND IsDeleted = 1)
    BEGIN
        SELECT N'Mã học vị không tồn tại!' AS ThongBao;
    END
    ELSE
    BEGIN
        UPDATE HocVi
        SET tenHocVi = @tenHocVi,
            kyHieu = @kyHieu,
            moTa = @moTa,
            soLuongHuongDan = @soLuongHuongDan
        WHERE maHocVi = @maHocVi AND IsDeleted = 1;
        
        SELECT N'Cập nhật học vị thành công!' AS ThongBao;
    END
END;
GO
CREATE OR ALTER PROCEDURE DeleteChucVu
    @maChucVu VARCHAR(50)
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM ChucVu WHERE maChucVu = @maChucVu AND IsDeleted = 1)
    BEGIN
        SELECT N'Mã chức vụ không tồn tại!' AS ThongBao;
    END
    ELSE
    BEGIN
        UPDATE ChucVu SET IsDeleted = 0 WHERE maChucVu = @maChucVu;
        
        SELECT N'Xóa chức vụ thành công!' AS ThongBao;
    END
END;

GO
CREATE OR ALTER PROCEDURE DeleteKhoa
    @maKhoa VARCHAR(20)
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Khoa WHERE maKhoa = @maKhoa AND IsDeleted = 1)
    BEGIN
        SELECT N'Mã khoa không tồn tại!' AS ThongBao;
    END
    ELSE
    BEGIN
        UPDATE Khoa SET IsDeleted = 0 WHERE maKhoa = @maKhoa;
        
        SELECT N'Xóa khoa thành công!' AS ThongBao;
    END
END;

GO
CREATE OR ALTER PROCEDURE DeleteBoMon
    @maBoMon VARCHAR(50)
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM BoMon WHERE maBoMon = @maBoMon AND IsDeleted = 1)
    BEGIN
        SELECT N'Mã bộ môn không tồn tại!' AS ThongBao;
    END
    ELSE
    BEGIN
        UPDATE BoMon SET IsDeleted = 0 WHERE maBoMon = @maBoMon;
        
        SELECT N'Xóa bộ môn thành công!' AS ThongBao;
    END
END;

GO
CREATE OR ALTER PROCEDURE DeleteHocHam
    @maHocHam VARCHAR(20)
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM HocHam WHERE maHocHam = @maHocHam AND IsDeleted = 1)
    BEGIN
        SELECT N'Mã học hàm không tồn tại!' AS ThongBao;
    END
    ELSE
    BEGIN
        UPDATE HocHam SET IsDeleted = 0 WHERE maHocHam = @maHocHam;
        
        SELECT N'Xóa học hàm thành công!' AS ThongBao;
    END
END;
GO

CREATE OR ALTER PROCEDURE DeleteHocVi
    @maHocVi VARCHAR(20)
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM HocVi WHERE maHocVi = @maHocVi AND IsDeleted = 1)
    BEGIN
        SELECT N'Mã học vị không tồn tại!' AS ThongBao;
    END
    ELSE
    BEGIN
        UPDATE HocVi SET IsDeleted = 0 WHERE maHocVi = @maHocVi;
        
        SELECT N'Xóa học vị thành công!' AS ThongBao;
    END
END;
GO

---====================================================QUẢN LÝ HỆ THÔNG --===================================================
CREATE OR ALTER PROCEDURE GetAllLop
AS
BEGIN
    SELECT * FROM lop WHERE IsDeleted = 1;
END;
	go
	
CREATE OR ALTER PROCEDURE GetAllSinhVien
AS
BEGIN
    SELECT sv.maSinhVien, sv.tenSinhVien, l.tenLop, sv.ngaySinh, sv.gioiTinh, sv.sDT, sv.email,sv.maLop
    FROM sinhVien sv
    JOIN lop l ON sv.maLop = l.maLop
    WHERE sv.IsDeleted = 1 ;
END;
	go

CREATE OR ALTER PROCEDURE GetAllGiangVien
AS
BEGIN
    SELECT gv.maGiangVien, gv.tenGiangVien, bm.tenBoMon, cv.tenChucVu, HH.tenHocHam,HV.tenHocVi, 
           gv.ngaySinh, gv.gioiTinh, gv.sDT, gv.email
    FROM giangVien gv
    JOIN BoMon bm ON gv.IDBoMon = bm.maBoMon
    JOIN ChucVu cv ON gv.IDChucVu = cv.maChucVu
    JOIN HocHam HH ON gv.IDHocHam = HH.maHocHam
    JOIN HocVi HV ON gv.IDHocVi = HV.maHocVi
    WHERE gv.IsDeleted = 1 AND bm.IsDeleted = 1 AND cv.IsDeleted = 1 AND HH.IsDeleted = 1 AND HV.IsDeleted = 1;
END;
	go

--==========================LỚP============
CREATE OR ALTER PROCEDURE ThemLop
    @taiKhoan NVARCHAR(50),
    @maLop VARCHAR(50),
    @tenLop NVARCHAR(50),
    @tenChuyenNganh NVARCHAR(50),
    @khoaHoc VARCHAR(10)
AS
BEGIN
    DECLARE @coQuyenThemLop BIT = 0;

    IF EXISTS (
        SELECT 1
        FROM nguoiDung_nhomQuyen AS ndnq
        JOIN nhomQuyen_phanQuyen AS nqpnq ON ndnq.maNhomQuyen = nqpnq.maNhomQuyen
        WHERE ndnq.taiKhoan = @taiKhoan AND nqpnq.maQuyen = 'ADD_LOP'
    )
    BEGIN
        SET @coQuyenThemLop = 1;
    END

    IF @coQuyenThemLop = 1
    BEGIN
        INSERT INTO lop (maLop, tenLop, tenChuyenNganh, khoaHoc, IsDeleted)
        VALUES (@maLop, @tenLop, @tenChuyenNganh, @khoaHoc, 1);

        SELECT N'Thêm lớp thành công' AS ThongBao;
    END
    ELSE
    BEGIN
        SELECT N'Bạn không có quyền thêm lớp' AS ThongBao;
    END
END;

GO
CREATE OR ALTER PROCEDURE SuaLop
    @taiKhoan NVARCHAR(50),
    @maLop VARCHAR(50),
    @tenLop NVARCHAR(50),
    @tenChuyenNganh NVARCHAR(50),
    @khoaHoc VARCHAR(10)
AS
BEGIN
    DECLARE @coQuyenSuaLop BIT = 0;

    IF EXISTS (
        SELECT 1
        FROM nguoiDung_nhomQuyen AS ndnq
        JOIN nhomQuyen_phanQuyen AS nqpnq ON ndnq.maNhomQuyen = nqpnq.maNhomQuyen
        WHERE ndnq.taiKhoan = @taiKhoan AND nqpnq.maQuyen = 'UP_LOP'
    )
    BEGIN
        SET @coQuyenSuaLop = 1;
    END

    IF @coQuyenSuaLop = 1
    BEGIN
        UPDATE lop
        SET tenLop = @tenLop, tenChuyenNganh = @tenChuyenNganh, khoaHoc = @khoaHoc
        WHERE maLop = @maLop AND IsDeleted = 1;

        SELECT N'Sửa lớp thành công' AS ThongBao;
    END
    ELSE
    BEGIN
        SELECT N'Bạn không có quyền sửa lớp' AS ThongBao;
    END
END;
GO
CREATE OR ALTER PROCEDURE XoaLop
    @taiKhoan NVARCHAR(50),
    @maLop VARCHAR(50)
AS
BEGIN
    DECLARE @coQuyenXoaLop BIT = 0;

    IF EXISTS (
        SELECT 1
        FROM nguoiDung_nhomQuyen AS ndnq
        JOIN nhomQuyen_phanQuyen AS nqpnq ON ndnq.maNhomQuyen = nqpnq.maNhomQuyen
        WHERE ndnq.taiKhoan = @taiKhoan AND nqpnq.maQuyen = 'DEL_LOP'
    )
    BEGIN
        SET @coQuyenXoaLop = 1;
    END

    IF @coQuyenXoaLop = 1
    BEGIN
        UPDATE lop SET IsDeleted = 0 WHERE maLop = @maLop;

        SELECT N'Xóa lớp thành công' AS ThongBao;
    END
    ELSE
    BEGIN
        SELECT N'Bạn không có quyền xóa lớp' AS ThongBao;
    END
END;
GO
--============================GIANG VIEN

CREATE OR ALTER PROCEDURE ThemGiangVien
    @taiKhoan NVARCHAR(50),
    @maGiangVien NVARCHAR(50),
    @tenGiangVien NVARCHAR(255),
    @IDBoMon VARCHAR(50),
    @IDChucVu VARCHAR(50),
    @IDHocHam VARCHAR(20)=null,
    @IDHocVi VARCHAR(20)=null,
    @gioiTinh NVARCHAR(10),
    @ngaySinh DATE,
    @sDT VARCHAR(15),
    @email NVARCHAR(255)
AS
BEGIN
    DECLARE @coQuyenThemGiangVien BIT = 0;

    IF EXISTS (
        SELECT 1
        FROM nguoiDung_nhomQuyen AS ndnq
        JOIN nhomQuyen_phanQuyen AS nqpnq ON ndnq.maNhomQuyen = nqpnq.maNhomQuyen
        WHERE ndnq.taiKhoan = @taiKhoan AND nqpnq.maQuyen = 'ADD_GIANGVIEN'
    )
    BEGIN
        SET @coQuyenThemGiangVien = 1;
    END

    IF @coQuyenThemGiangVien = 1
    BEGIN

        INSERT INTO giangVien (maGiangVien, tenGiangVien, IDBoMon, IDChucVu, IDHocHam,IDHocVi, ngaySinh, gioiTinh, sDT, email, IsDeleted)
        VALUES (@maGiangVien, @tenGiangVien, @IDBoMon, @IDChucVu, @IDHocHam,@IDHocVi, @ngaySinh, @gioiTinh, @sDT, @email, 1);
        EXEC ThemNguoiDung @taiKhoan = @maGiangVien, @hoTen = @tenGiangVien, @ngaySinh = @ngaySinh, @gioiTinh = @gioiTinh, @email = @email, @moTa = N'Giảng viên';
        
        SELECT N'Thêm giảng viên thành công' AS ThongBao;
    END
    ELSE
    BEGIN
        SELECT N'Bạn không có quyền thêm giảng viên' AS ThongBao;
    END
END;
GO

CREATE OR ALTER PROCEDURE SuaGiangVien
    @taiKhoan NVARCHAR(50),
    @maGiangVien NVARCHAR(50),
    @tenGiangVien NVARCHAR(255),
    @IDBoMon VARCHAR(50),
    @IDChucVu VARCHAR(50),
    @IDHocHam VARCHAR(20)=null,
    @IDHocVi VARCHAR(20)=null,
    @gioiTinh NVARCHAR(10),
    @ngaySinh DATE,
    @sDT VARCHAR(15),
    @email NVARCHAR(255)
AS
BEGIN
    DECLARE @coQuyenSuaGiangVien BIT = 0;

    IF EXISTS (
        SELECT 1
        FROM nguoiDung_nhomQuyen AS ndnq
        JOIN nhomQuyen_phanQuyen AS nqpnq ON ndnq.maNhomQuyen = nqpnq.maNhomQuyen
        WHERE ndnq.taiKhoan = @taiKhoan AND nqpnq.maQuyen = 'UP_GIANGVIEN'
    )
    BEGIN
        SET @coQuyenSuaGiangVien = 1;
    END

    IF @coQuyenSuaGiangVien = 1
    BEGIN
        EXEC SuaNguoiDung @taiKhoan = @maGiangVien, @hoTen = @tenGiangVien, @ngaySinh = @ngaySinh, @gioiTinh = @gioiTinh, @email = @email, @moTa = N'Giảng viên';

        UPDATE giangVien
        SET tenGiangVien = @tenGiangVien, IDBoMon = @IDBoMon, IDChucVu = @IDChucVu,
            IDHocHam = @IDHocHam,IDHocVi=@IDHocVi, gioiTinh = @gioiTinh, ngaySinh = @ngaySinh, sDT = @sDT, email = @email
        WHERE maGiangVien = @maGiangVien AND IsDeleted = 1;

        SELECT N'Sửa giảng viên thành công' AS ThongBao;
    END
    ELSE
    BEGIN
        SELECT N'Bạn không có quyền sửa giảng viên' AS ThongBao;
    END
END;

GO

CREATE OR ALTER PROCEDURE XoaGiangVien
    @taiKhoan NVARCHAR(50),
    @maGiangVien NVARCHAR(50)
AS
BEGIN
    DECLARE @coQuyenXoaGiangVien BIT = 0;

    IF EXISTS (
        SELECT 1
        FROM nguoiDung_nhomQuyen AS ndnq
        JOIN nhomQuyen_phanQuyen AS nqpnq ON ndnq.maNhomQuyen = nqpnq.maNhomQuyen
        WHERE ndnq.taiKhoan = @taiKhoan AND nqpnq.maQuyen = 'DEL_GIANGVIEN'
    )
    BEGIN
        SET @coQuyenXoaGiangVien = 1;
    END

    IF @coQuyenXoaGiangVien = 1
    BEGIN
		EXEC XoaNguoiDung @taiKhoan = @maGiangVien;
        UPDATE giangVien SET IsDeleted = 0 WHERE maGiangVien = @maGiangVien;
       

        SELECT N'Xóa giảng viên thành công' AS ThongBao;
    END
    ELSE
    BEGIN
        SELECT N'Bạn không có quyền xóa giảng viên' AS ThongBao;
    END
END;
GO
--===============================SINH VIIEN

CREATE OR ALTER PROCEDURE ThemSinhVien
    @taiKhoan NVARCHAR(50),
    @maSinhVien NVARCHAR(50),
    @tenSinhVien NVARCHAR(255),
    @maLop VARCHAR(50),
    @ngaySinh DATE,
    @gioiTinh NVARCHAR(10),
    @sDT VARCHAR(15),
    @email NVARCHAR(255)
AS
BEGIN
    DECLARE @coQuyenThemSinhVien BIT = 0;

    IF EXISTS (
        SELECT 1
        FROM nguoiDung_nhomQuyen AS ndnq
        JOIN nhomQuyen_phanQuyen AS nqpnq ON ndnq.maNhomQuyen = nqpnq.maNhomQuyen
        WHERE ndnq.taiKhoan = @taiKhoan AND nqpnq.maQuyen = 'ADD_SINHVIEN'
    )
    BEGIN
        SET @coQuyenThemSinhVien = 1;
    END

    IF @coQuyenThemSinhVien = 1
    BEGIN
        EXEC ThemNguoiDung @taiKhoan = @maSinhVien, @hoTen = @tenSinhVien, @ngaySinh = @ngaySinh, @gioiTinh = @gioiTinh, @email = @email, @moTa = N'Sinh viên';

        INSERT INTO sinhVien (maSinhVien, tenSinhVien, maLop, ngaySinh, gioiTinh, sDT, email, IsDeleted)
        VALUES (@maSinhVien, @tenSinhVien, @maLop, @ngaySinh, @gioiTinh, @sDT, @email, 1);

        SELECT N'Thêm sinh viên thành công' AS ThongBao;
    END
    ELSE
    BEGIN
        SELECT N'Bạn không có quyền thêm sinh viên' AS ThongBao;
    END
END;
GO

CREATE OR ALTER PROCEDURE SuaSinhVien
    @taiKhoan NVARCHAR(50),
    @maSinhVien NVARCHAR(50),
    @tenSinhVien NVARCHAR(255),
    @maLop VARCHAR(50),
    @ngaySinh DATE,
    @gioiTinh NVARCHAR(10),
    @sDT VARCHAR(15),
    @email NVARCHAR(255)
AS
BEGIN
    DECLARE @coQuyenSuaSinhVien BIT = 0;

    IF EXISTS (
        SELECT 1
        FROM nguoiDung_nhomQuyen AS ndnq
        JOIN nhomQuyen_phanQuyen AS nqpnq ON ndnq.maNhomQuyen = nqpnq.maNhomQuyen
        WHERE ndnq.taiKhoan = @taiKhoan AND nqpnq.maQuyen = 'UP_SINHVIEN'
    )
    BEGIN
        SET @coQuyenSuaSinhVien = 1;
    END

    IF @coQuyenSuaSinhVien = 1
    BEGIN
        UPDATE sinhVien
        SET tenSinhVien = @tenSinhVien, maLop = @maLop, ngaySinh = @ngaySinh, 
            gioiTinh = @gioiTinh, sDT = @sDT, email = @email
        WHERE maSinhVien = @maSinhVien AND IsDeleted = 1;

        EXEC SuaNguoiDung @taiKhoan = @maSinhVien, @hoTen = @tenSinhVien, @ngaySinh = @ngaySinh, @gioiTinh = @gioiTinh, @email = @email, @moTa = N'Sinh viên';

        SELECT N'Sửa sinh viên thành công' AS ThongBao;
    END
    ELSE
    BEGIN
        SELECT N'Bạn không có quyền sửa sinh viên' AS ThongBao;
    END
END;
GO

CREATE OR ALTER PROCEDURE XoaSinhVien
    @taiKhoan NVARCHAR(50),
    @maSinhVien NVARCHAR(50)
AS
BEGIN
    DECLARE @coQuyenXoaSinhVien BIT = 0;

    IF EXISTS (
        SELECT 1
        FROM nguoiDung_nhomQuyen AS ndnq
        JOIN nhomQuyen_phanQuyen AS nqpnq ON ndnq.maNhomQuyen = nqpnq.maNhomQuyen
        WHERE ndnq.taiKhoan = @taiKhoan AND nqpnq.maQuyen = 'DEL_SINHVIEN'
    )
    BEGIN
        SET @coQuyenXoaSinhVien = 1;
    END

    IF @coQuyenXoaSinhVien = 1
    BEGIN
        EXEC DEL_NGUOIDUNG @taiKhoan = @maSinhVien;

        UPDATE sinhVien SET IsDeleted = 0 WHERE maSinhVien = @maSinhVien;

        SELECT N'Xóa sinh viên thành công' AS ThongBao;
    END
    ELSE
    BEGIN
        SELECT N'Bạn không có quyền xóa sinh viên' AS ThongBao;
    END
END;
GO
go
CREATE PROCEDURE GETPHANQUYENBYTAIKHOAN
@taiKhoan nvarchar(50)
as
	begin
SELECT nhomQuyen_phanQuyen.maNhomQuyen,nhomQuyen_phanQuyen.maQuyen FROM nhomQuyen_phanQuyen INNER JOIN nguoiDung_nhomQuyen ON nhomQuyen_phanQuyen.maNhomQuyen=nguoiDung_nhomQuyen.maNhomQuyen WHERE nguoiDung_nhomQuyen.taiKhoan=@taiKhoan;
end
go

CREATE PROC GETNHOMQUYEN_TAIKHOAN
@TaiKhoan nvarchar(50)
AS
BEGIN
		SELECT nq.maNhomQuyen, nq.tenNhomQuyen, nq.loai, nq.moTa,
       (SELECT COUNT(ndnq.taiKhoan) FROM nguoiDung_nhomQuyen ndnq WHERE ndnq.maNhomQuyen = nq.maNhomQuyen) AS soLuong
FROM nhomQuyen nq inner join nguoiDung_nhomQuyen nd_nq on nq.maNhomQuyen=nd_nq.maNhomQuyen where nd_nq.taiKhoan=@TaiKhoan; 
END
--=================================================================QUAN LY DOT LAM DO AN===============================

GO
CREATE OR ALTER PROC GetAll_DotLamDoAn
AS
BEGIN
    SELECT * FROM dotLamDoAn WHERE IsDeleted = 1;
END
	GO
	
	CREATE PROCEDURE Them_DotLamDoAn
    @taiKhoan NVARCHAR(50),
    @maDot VARCHAR(50),
    @tenDot NVARCHAR(255),
    @ngayBatDau DATE,
    @namApDung VARCHAR(20),
    @dangKyDeTai BIT,
    @choPhepSinhVienDangKyGiangVienKhacBoMon BIT,
    @choPhepSinhVienBaoCaoKhacTuanHienTai BIT,
    @choPhepGiangVienBaoCaoKhacTuanHienTai BIT,
    @choPhepGiangVienSuaDeTai BIT,
    @trangThai BIT
AS
BEGIN
    DECLARE @coQuyenThemDot BIT = 0;
    DECLARE @thongBao NVARCHAR(255) = '';

    -- Kiểm tra quyền thêm đợt
    IF EXISTS (
        SELECT 1
        FROM nguoiDung_nhomQuyen AS ndnq
        JOIN nhomQuyen_phanQuyen AS nqpnq ON ndnq.maNhomQuyen = nqpnq.maNhomQuyen
        WHERE ndnq.taiKhoan = @taiKhoan AND nqpnq.maQuyen = 'ADD_DOTLAMDOAN'
    )
    BEGIN
        SET @coQuyenThemDot = 1;
    END

    -- Kiểm tra xem mã đợt đã tồn tại chưa
    IF EXISTS (SELECT 1 FROM dotLamDoAn WHERE maDot = @maDot)
    BEGIN
        SET @thongBao = N'Mã đợt đã tồn tại';
        SET @coQuyenThemDot = 0;
    END

    IF @coQuyenThemDot = 1
    BEGIN 
        INSERT INTO dotLamDoAn(
            maDot, tenDot, ngayBatDau, namApDung, dangKyDeTai, 
            choPhepSinhVienDangKyGiangVienKhacBoMon, 
            choPhepSinhVienBaoCaoKhacTuanHienTai, 
            choPhepGiangVienBaoCaoKhacTuanHienTai, 
            choPhepGiangVienSuaDeTai, 
            trangThai, 
            IsDeleted
        )
        VALUES (
            @maDot, @tenDot, @ngayBatDau, @namApDung, @dangKyDeTai, 
            @choPhepSinhVienDangKyGiangVienKhacBoMon, 
            @choPhepSinhVienBaoCaoKhacTuanHienTai, 
            @choPhepGiangVienBaoCaoKhacTuanHienTai, 
            @choPhepGiangVienSuaDeTai, 
            @trangThai, 
            1
        );
        SET @thongBao = N'Thêm đợt làm đồ án thành công';
    END
    ELSE
    BEGIN
        IF @thongBao = ''
            SET @thongBao = N'Bạn không có quyền thêm đợt làm đồ án';
    END

    -- Trả về thông báo
    SELECT @thongBao AS ThongBao;
END;
GO

	CREATE PROC GET_DOT_ID
		@MaDot nvarchar(50)
		AS
			BEGIN
    SELECT * FROM dotLamDoAn WHERE maDot=@MaDot and IsDeleted = 1;
			END
				
				GO
-- Procedure to edit an existing "dotLamDoAn"
CREATE OR ALTER PROCEDURE Sua_DotLamDoAn
    @taiKhoan NVARCHAR(50),
    @maDot VARCHAR(50),
    @tenDot NVARCHAR(255),
    @ngayBatDau DATE,
    @namApDung VARCHAR(20),
    @dangKyDeTai BIT,
    @choPhepSinhVienDangKyGiangVienKhacBoMon BIT,
    @choPhepSinhVienBaoCaoKhacTuanHienTai BIT,
    @choPhepGiangVienBaoCaoKhacTuanHienTai BIT,
    @choPhepGiangVienSuaDeTai BIT,
    @trangThai BIT
AS
BEGIN
    DECLARE @coQuyenSuaDot BIT = 0;

    IF EXISTS (
        SELECT 1
        FROM nguoiDung_nhomQuyen AS ndnq
        JOIN nhomQuyen_phanQuyen AS nqpnq ON ndnq.maNhomQuyen = nqpnq.maNhomQuyen
        WHERE ndnq.taiKhoan = @taiKhoan AND nqpnq.maQuyen = 'UP_DOTLAMDOAN'
    )
    BEGIN
        SET @coQuyenSuaDot = 1;
    END

    IF @coQuyenSuaDot = 1
    BEGIN 
        UPDATE dotLamDoAn
        SET tenDot = @tenDot, 
            ngayBatDau = @ngayBatDau, 
            namApDung = @namApDung, 
            dangKyDeTai = @dangKyDeTai, 
            choPhepSinhVienDangKyGiangVienKhacBoMon = @choPhepSinhVienDangKyGiangVienKhacBoMon, 
            choPhepSinhVienBaoCaoKhacTuanHienTai = @choPhepSinhVienBaoCaoKhacTuanHienTai, 
            choPhepGiangVienBaoCaoKhacTuanHienTai = @choPhepGiangVienBaoCaoKhacTuanHienTai, 
            choPhepGiangVienSuaDeTai = @choPhepGiangVienSuaDeTai, 
            trangThai = @trangThai
        WHERE maDot = @maDot AND IsDeleted = 1;

        SELECT N'Sửa đợt làm đồ án thành công' AS ThongBao;
    END
    ELSE
    BEGIN
        SELECT N'Bạn không có quyền sửa đợt làm đồ án' AS ThongBao;
    END
END;
GO

-- Procedure to delete a "dotLamDoAn"
CREATE OR ALTER PROCEDURE Xoa_DotLamDoAn
    @taiKhoan NVARCHAR(50),
    @maDot VARCHAR(50)
AS
BEGIN
    DECLARE @coQuyenXoaDot BIT = 0;

    IF EXISTS (
        SELECT 1
        FROM nguoiDung_nhomQuyen AS ndnq
        JOIN nhomQuyen_phanQuyen AS nqpnq ON ndnq.maNhomQuyen = nqpnq.maNhomQuyen
        WHERE ndnq.taiKhoan = @taiKhoan AND nqpnq.maQuyen = 'DEL_DOTLAMDOAN'
    )
    BEGIN
        SET @coQuyenXoaDot = 1;
    END

    IF @coQuyenXoaDot = 1
    BEGIN 
        UPDATE dotLamDoAn SET IsDeleted = 0 WHERE maDot = @maDot;

        SELECT N'Xóa đợt làm đồ án thành công' AS ThongBao;
    END
    ELSE
    BEGIN
        SELECT N'Bạn không có quyền xóa đợt làm đồ án' AS ThongBao;
    END
END;
GO
CREATE OR ALTER PROC GetAll_HoiDong
AS
BEGIN
    SELECT * FROM hoiDong WHERE IsDeleted = 1;
END

GO

CREATE OR ALTER PROCEDURE Them_HoiDong
    @taiKhoan NVARCHAR(50),
    @maHoiDong VARCHAR(50),
    @tenHoiDong NVARCHAR(255),
    @maDot VARCHAR(50),
    @thuocLop NVARCHAR(MAX), -- Danh sách mã lớp cách nhau dấu phẩy
    @phong NVARCHAR(50),
    @ngayDuKien DATE
AS
BEGIN
    BEGIN TRY
        -- Kiểm tra quyền của tài khoản
        IF EXISTS (
            SELECT 1
            FROM nguoiDung_nhomQuyen AS ndnq
            JOIN nhomQuyen_phanQuyen AS nqpnq 
                ON ndnq.maNhomQuyen = nqpnq.maNhomQuyen
            WHERE ndnq.taiKhoan = @taiKhoan AND nqpnq.maQuyen = 'ADD_HOIDONG'
        )
        BEGIN
            BEGIN TRANSACTION;

            -- Thêm hội đồng vào bảng hoiDong
            INSERT INTO hoiDong (maHoiDong, tenHoiDong, maDot, phong, ngayDuKien, IsDeleted)
            VALUES (@maHoiDong, @tenHoiDong, @maDot, @phong, @ngayDuKien, 1);

            -- Tách danh sách mã lớp và thêm vào bảng hoiDongLop
            DECLARE @maLop NVARCHAR(50);
            WHILE CHARINDEX(',', @thuocLop) > 0
            BEGIN
                SET @maLop = LTRIM(RTRIM(LEFT(@thuocLop, CHARINDEX(',', @thuocLop) - 1)));
                IF EXISTS (SELECT 1 FROM lop WHERE maLop = @maLop)
                BEGIN
                    INSERT INTO hoiDongLop (maHoiDong, maLop) VALUES (@maHoiDong, @maLop);
                END
                SET @thuocLop = SUBSTRING(@thuocLop, CHARINDEX(',', @thuocLop) + 1, LEN(@thuocLop));
            END;

            -- Thêm lớp cuối cùng (nếu còn)
            IF LTRIM(RTRIM(@thuocLop)) <> ''
            BEGIN
                SET @maLop = LTRIM(RTRIM(@thuocLop));
                IF EXISTS (SELECT 1 FROM lop WHERE maLop = @maLop)
                BEGIN
                    INSERT INTO hoiDongLop (maHoiDong, maLop) VALUES (@maHoiDong, @maLop);
                END
            END;

            COMMIT TRANSACTION;

            SELECT N'Thêm hội đồng thành công' AS ThongBao;
        END
        ELSE
        BEGIN
            SELECT N'Bạn không có quyền thêm hội đồng' AS ThongBao;
        END
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        SELECT ERROR_MESSAGE() AS ThongBao;
    END CATCH
END;


GO

CREATE OR ALTER PROCEDURE Sua_HoiDong
    @taiKhoan NVARCHAR(50),
    @maHoiDong VARCHAR(50),
    @tenHoiDong NVARCHAR(255),
    @maDot VARCHAR(50),
    @thuocLop NVARCHAR(MAX), -- Nhiều mã lớp cách nhau dấu phẩy
    @phong NVARCHAR(50),
    @ngayDuKien DATE
AS
BEGIN
    BEGIN TRY
        -- Kiểm tra quyền sửa hội đồng
        IF EXISTS (
            SELECT 1
            FROM nguoiDung_nhomQuyen AS ndnq
            JOIN nhomQuyen_phanQuyen AS nqpnq 
                ON ndnq.maNhomQuyen = nqpnq.maNhomQuyen
            WHERE ndnq.taiKhoan = @taiKhoan AND nqpnq.maQuyen = 'UP_HOIDONG'
        )
        BEGIN
            BEGIN TRANSACTION;

            -- Cập nhật thông tin hội đồng trong bảng hoiDong
            UPDATE hoiDong
            SET tenHoiDong = @tenHoiDong, 
                maDot = @maDot, 
                phong = @phong, 
                ngayDuKien = @ngayDuKien
            WHERE maHoiDong = @maHoiDong AND IsDeleted = 1;

            -- Xóa các liên kết cũ trong bảng hoiDongLop
            DELETE FROM hoiDongLop WHERE maHoiDong = @maHoiDong;

            -- Thêm lại các lớp vào bảng hoiDongLop
            DECLARE @maLop NVARCHAR(50);
            WHILE CHARINDEX(',', @thuocLop) > 0
            BEGIN
                SET @maLop = LTRIM(RTRIM(LEFT(@thuocLop, CHARINDEX(',', @thuocLop) - 1)));
                IF EXISTS (SELECT 1 FROM lop WHERE maLop = @maLop)
                BEGIN
                    INSERT INTO hoiDongLop (maHoiDong, maLop) VALUES (@maHoiDong, @maLop);
                END
                SET @thuocLop = SUBSTRING(@thuocLop, CHARINDEX(',', @thuocLop) + 1, LEN(@thuocLop));
            END;

            -- Thêm lớp cuối cùng (nếu có)
            IF LTRIM(RTRIM(@thuocLop)) <> ''
            BEGIN
                SET @maLop = LTRIM(RTRIM(@thuocLop));
                IF EXISTS (SELECT 1 FROM lop WHERE maLop = @maLop)
                BEGIN
                    INSERT INTO hoiDongLop (maHoiDong, maLop) VALUES (@maHoiDong, @maLop);
                END
            END;

            COMMIT TRANSACTION;
            SELECT N'Sửa hội đồng thành công' AS ThongBao;
        END
        ELSE
        BEGIN
            SELECT N'Bạn không có quyền sửa hội đồng' AS ThongBao;
        END
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        SELECT ERROR_MESSAGE() AS ThongBao;
    END CATCH
END;


GO
CREATE OR ALTER PROCEDURE Xoa_HoiDong
    @taiKhoan NVARCHAR(50),
    @maHoiDong VARCHAR(50)
AS
BEGIN
    BEGIN TRY
        -- Kiểm tra quyền xóa hội đồng
        IF EXISTS (
            SELECT 1
            FROM nguoiDung_nhomQuyen AS ndnq
            JOIN nhomQuyen_phanQuyen AS nqpnq 
                ON ndnq.maNhomQuyen = nqpnq.maNhomQuyen
            WHERE ndnq.taiKhoan = @taiKhoan AND nqpnq.maQuyen = 'DEL_HOIDONG'
        )
        BEGIN
            BEGIN TRANSACTION;

            -- Xóa liên kết hội đồng-lớp
            DELETE FROM hoiDongLop WHERE maHoiDong = @maHoiDong;

            -- Đánh dấu hội đồng đã bị xóa
            UPDATE hoiDong SET IsDeleted = 0 WHERE maHoiDong = @maHoiDong AND IsDeleted = 1;

            COMMIT TRANSACTION;
            SELECT N'Xóa hội đồng thành công' AS ThongBao;
        END
        ELSE
        BEGIN
            SELECT N'Bạn không có quyền xóa hội đồng' AS ThongBao;
        END
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        SELECT ERROR_MESSAGE() AS ThongBao;
    END CATCH
END;

GO
CREATE OR ALTER PROCEDURE Them_ThanhVien_HoiDong
    @taiKhoan NVARCHAR(50),
    @maHoiDong VARCHAR(50),
    @maThanhVien NVARCHAR(50),
    @loaiThanhVien NVARCHAR(10),
    @nhiemVu NVARCHAR(50) = NULL
AS
BEGIN
    DECLARE @coQuyenThemThanhVien BIT = 0;

    IF EXISTS (
        SELECT 1
        FROM nguoiDung_nhomQuyen AS ndnq
        JOIN nhomQuyen_phanQuyen AS nqpnq ON ndnq.maNhomQuyen = nqpnq.maNhomQuyen
        WHERE ndnq.taiKhoan = @taiKhoan AND nqpnq.maQuyen = 'ADD_THANHVIEN_HOIDONG'
    )
    BEGIN
        SET @coQuyenThemThanhVien = 1;
    END

    IF @coQuyenThemThanhVien = 1
    BEGIN 
        IF @loaiThanhVien = 'GV'
        BEGIN
            INSERT INTO hoiDong_GiangVien(maHoiDong, maGiangVien, nhiemVu, IsDeleted)
            VALUES (@maHoiDong, @maThanhVien, @nhiemVu, 1);
        END
        ELSE IF @loaiThanhVien = 'SV'
        BEGIN
            INSERT INTO hoiDong_SinhVien(maHoiDong, maSinhVien, IsDeleted)
            VALUES (@maHoiDong, @maThanhVien, 1);
        END

        SELECT N'Thêm thành viên vào hội đồng thành công' AS ThongBao;
    END
    ELSE
    BEGIN
        SELECT N'Bạn không có quyền thêm thành viên vào hội đồng' AS ThongBao;
    END
END;

GO
CREATE OR ALTER PROCEDURE Xoa_ThanhVien_HoiDong
    @taiKhoan NVARCHAR(50),
    @maHoiDong VARCHAR(50),
    @maThanhVien NVARCHAR(50),
    @loaiThanhVien NVARCHAR(10)
AS
BEGIN
    DECLARE @coQuyenXoaThanhVien BIT = 0;

    IF EXISTS (
        SELECT 1
        FROM nguoiDung_nhomQuyen AS ndnq
        JOIN nhomQuyen_phanQuyen AS nqpnq ON ndnq.maNhomQuyen = nqpnq.maNhomQuyen
        WHERE ndnq.taiKhoan = @taiKhoan AND nqpnq.maQuyen = 'DEL_THANHVIEN_HOIDONG'
    )
    BEGIN
        SET @coQuyenXoaThanhVien = 1;
    END

    IF @coQuyenXoaThanhVien = 1
    BEGIN 
        IF @loaiThanhVien = 'GV'
        BEGIN
            UPDATE hoiDong_GiangVien 
            SET IsDeleted = 0
            WHERE maHoiDong = @maHoiDong AND maGiangVien = @maThanhVien;
        END
        ELSE IF @loaiThanhVien = 'SV'
        BEGIN
            UPDATE hoiDong_SinhVien 
            SET IsDeleted = 0
            WHERE maHoiDong = @maHoiDong AND maSinhVien = @maThanhVien;
        END

        SELECT N'Xóa thành viên khỏi hội đồng thành công' AS ThongBao;
    END
    ELSE
    BEGIN
        SELECT N'Bạn không có quyền xóa thành viên khỏi hội đồng' AS ThongBao;
    END
END;
GO

-- Additional procedures for managing committee members
CREATE OR ALTER PROCEDURE GetThanhVien_HoiDong
    @maHoiDong VARCHAR(50)
AS
BEGIN
    SELECT 'GV' AS LoaiThanhVien, gv.maGiangVien, gv.tenGiangVien, hd_gv.nhiemVu
    FROM hoiDong_GiangVien hd_gv
    JOIN giangVien gv ON hd_gv.maGiangVien = gv.maGiangVien
    WHERE hd_gv.maHoiDong = @maHoiDong AND hd_gv.IsDeleted = 1 AND gv.IsDeleted = 1
    UNION ALL
    SELECT 'SV' AS LoaiThanhVien, sv.maSinhVien, sv.tenSinhVien, NULL AS nhiemVu
    FROM hoiDong_SinhVien hd_sv
    JOIN sinhVien sv ON hd_sv.maSinhVien = sv.maSinhVien
    WHERE hd_sv.maHoiDong = @maHoiDong AND hd_sv.IsDeleted = 1 AND sv.IsDeleted = 1;
END;
GO
select*from dotLamDoAn