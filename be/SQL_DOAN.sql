CREATE DATABASE QL_DoAn;
GO
USE QL_DoAn;
GO

CREATE TABLE lop (
    maLop VARCHAR(50) PRIMARY KEY,
    tenLop NVARCHAR(50) NOT NULL,
    tenChuyenNganh NVARCHAR(50) NOT NULL,
    khoaHoc VARCHAR(10) NOT NULL
);
CREATE TABLE giangVien (
    maGiangVien INT PRIMARY KEY,
    tenGiangVien NVARCHAR(255),
    tenBoMon NVARCHAR(255),
    chucVu NVARCHAR(100),
    tenHocVi NVARCHAR(100),
    TenHocHam NVARCHAR(100),
    sDT VARCHAR(15),
    email NVARCHAR(255)
);

CREATE TABLE sinhVien (
    maSinhVien INT PRIMARY KEY,
    tenSinhVien NVARCHAR(255),
    maLop NVARCHAR(50),
    ngaySinh DATE,
    gioiTinh NVARCHAR(10),
    sDT VARCHAR(15),
    email NVARCHAR(255)
);
CREATE TABLE dotLamDoAn (
    maDot VARCHAR(50) PRIMARY KEY,
    tenDot NVARCHAR(255),
    ngayBatDau DATE,
    namApDung VARCHAR(4),
    dangKyDeTai BIT,
    choPhepSinhVienDangKyGiangVienKhacBoMon BIT,
    choPhepSinhVienBaoCaoKhacTuanHienTai BIT,
    choPhepGiangVienBaoCaoKhacTuanHienTai BIT,
    choPhepGiangVienSuaDeTai BIT,
    trangThai BIT
);
CREATE TABLE hoiDong (
    maHoiDong VARCHAR(50) PRIMARY KEY,
    tenHoiDong NVARCHAR(255),
    maDot VARCHAR(50),
    thuocLop NVARCHAR(100),
    phong NVARCHAR(50),
    ngayDuKien DATE,
    FOREIGN KEY (maDot) REFERENCES dotLamDoAn(maDot) on delete cascade
);

CREATE TABLE hoiDong_GiangVien (
    maHoiDong VARCHAR(50),
    maGiangVien INT,
    PRIMARY KEY (MaHoiDong, MaGiangVien),
    FOREIGN KEY (MaHoiDong) REFERENCES HoiDong(MaHoiDong) on delete cascade,
    FOREIGN KEY (MaGiangVien) REFERENCES GiangVien(MaGiangVien)on delete cascade
);
CREATE TABLE hoiDong_SinhVien (
    maHoiDong VARCHAR(50),
    maSinhVien INT,
    PRIMARY KEY (maHoiDong, maSinhVien),
    FOREIGN KEY (maHoiDong) REFERENCES hoiDong(maHoiDong) on delete cascade,
    FOREIGN KEY (maSinhVien) REFERENCES sinhVien(maSinhVien) on delete cascade
);

-- T?o b?ng nguoiDung
CREATE TABLE nguoiDung (
    taiKhoan NVARCHAR(50) PRIMARY KEY,
    matKhau NVARCHAR(50) NOT NULL,
    hoTen NVARCHAR(50) NOT NULL,
    ngaySinh DATE NOT NULL,
    gioiTinh NVARCHAR(20), 
    email VARCHAR(50),
    moTa NVARCHAR(50),
    TrangThai NVARCHAR(20)
);

-- T?o b?ng nhomQuyen
CREATE TABLE nhomQuyen (
    maNhomQuyen varchar(20) PRIMARY KEY,
    tenNhomQuyen NVARCHAR(50) NOT NULL,
    loai NVARCHAR(20) NOT NULL,
    moTa NVARCHAR(50),
    soLuong INT
);

-- T?o b?ng phanQuyen
CREATE TABLE phanQuyen (
    maQuyen varchar(50) PRIMARY KEY,
    tenQuyen NVARCHAR(50) NOT NULL
);

-- T?o b?ng nguoiDung_nhomQuyen (b?ng k?t h?p)
CREATE TABLE nguoiDung_nhomQuyen (
    taiKhoan NVARCHAR(50) FOREIGN KEY REFERENCES nguoiDung(taiKhoan) on delete cascade ,
    maNhomQuyen varchar(20) FOREIGN KEY REFERENCES nhomQuyen(maNhomQuyen) on delete cascade,
    PRIMARY KEY (taiKhoan, maNhomQuyen) 
);
go
-- T?o b?ng nhomQuyen_phanQuyen (b?ng k?t h?p)
CREATE TABLE nhomQuyen_phanQuyen (
    maNhomQuyen varchar(20) FOREIGN KEY REFERENCES nhomQuyen(maNhomQuyen) on delete cascade,
    maQuyen varchar(50) FOREIGN KEY REFERENCES phanQuyen(maQuyen) on delete cascade,
    PRIMARY KEY (maNhomQuyen, maQuyen)  -- Ð?t khóa chính k?t h?p
);
go

-- Thêm 20 dữ liệu vào bảng nguoiDung
-- Chèn dữ liệu vào bảng nguoiDung
INSERT INTO nguoiDung (taiKhoan, matKhau, hoTen, ngaySinh, gioiTinh, email, moTa, TrangThai)
VALUES 
    ('10621307', '123456', N'Nguyễn Văn A', '2003-05-01', 'Nam', 'a@gmail.com', N'Sinh viên', N'Đã kích hoạt'),
    ('10621308', '123456', N'Nguyễn Văn B', '2003-06-02', 'Nam', 'b@gmail.com', N'Sinh viên', N'Đã kích hoạt'),
    ('10621309', '123456', N'Nguyễn Văn C', '2003-07-03', 'Nam', 'c@gmail.com', N'Sinh viên', N'Đã kích hoạt'),
    ('10621310', '123456', N'Nguyễn Văn D', '2003-08-04', 'Nam', 'd@gmail.com', N'Sinh viên', N'Đã kích hoạt'),
    ('10621311', '123456', N'Nguyễn Văn E', '2003-09-05', 'Nam', 'e@gmail.com', N'Sinh viên', N'Đã kích hoạt'),
    ('10621312', '123456', N'Nguyễn Văn F', '2003-10-06', 'Nam', 'f@gmail.com', N'Sinh viên', N'Đã kích hoạt'),
    ('10621313', '123456', N'Nguyễn Văn G', '2003-11-07', 'Nam', 'g@gmail.com', N'Sinh viên', N'Đã kích hoạt'),
    ('10621314', '123456', N'Nguyễn Văn H', '2003-12-08', 'Nam', 'h@gmail.com', N'Sinh viên', N'Đã kích hoạt'),
    ('10621315', '123456', N'Nguyễn Văn I', '2004-01-09', 'Nam', 'i@gmail.com', N'Sinh viên', N'Đã kích hoạt'),
    ('10621316', '123456', N'Nguyễn Văn J', '2004-02-10', 'Nam', 'j@gmail.com', N'Sinh viên', N'Đã kích hoạt'),
    ('10621317', '123456', N'Nguyễn Văn K', '2004-03-11', 'Nam', 'k@gmail.com', N'Sinh viên', N'Đã kích hoạt'),
    ('10621318', '123456', N'Nguyễn Văn L', '2004-04-12', 'Nam', 'l@gmail.com', N'Sinh viên', N'Đã kích hoạt'),
    ('10621319', '123456', N'Nguyễn Văn M', '2004-05-13', 'Nam', 'm@gmail.com', N'Sinh viên', N'Đã kích hoạt'),
    ('10621320', '123456', N'Nguyễn Văn N', '2004-06-14', 'Nam', 'n@gmail.com', N'Sinh viên', N'Đã kích hoạt'),
    ('10621321', '123456', N'Nguyễn Văn O', '2004-07-15', 'Nam', 'o@gmail.com', N'Sinh viên', N'Đã kích hoạt'),
    ('10621322', '123456', N'Nguyễn Văn P', '2004-08-16', 'Nam', 'p@gmail.com', N'Sinh viên', N'Đã kích hoạt'),
    ('10621323', '123456', N'Nguyễn Văn Q', '2004-09-17', 'Nam', 'q@gmail.com', N'Sinh viên', N'Đã kích hoạt'),
    ('10621324', '123456', N'Nguyễn Văn R', '2004-10-18', 'Nam', 'r@gmail.com', N'Sinh viên', N'Đã kích hoạt'),
    ('10621325', '123456', N'Nguyễn Văn S', '2004-11-19', 'Nam', 's@gmail.com', N'Sinh viên', N'Đã kích hoạt'),
    ('10621326', '123456', N'Nguyễn Văn T', '2004-12-20', 'Nam', 't@gmail.com', N'Sinh viên', N'Đã kích hoạt');

-- Chèn dữ liệu vào bảng nguoiDung bổ sung
INSERT INTO nguoiDung (taiKhoan, matKhau, hoTen, ngaySinh, gioiTinh, email, moTa, TrangThai)
VALUES 
    ('10621306', '123456', N'Phạm Thanh Long', '2003-04-30', 'Nam', 'jaykergg@gmail.com', N'Sinh viên', N'Đã kích hoạt'),
    ('12521136', '123456', N'Đỗ Văn Minh', '2003-12-03', 'Nam', 'dominh123@gmail.com', N'Sinh viên', N'Đã kích hoạt'),
    ('12522057', '123456', N'Nguyễn Phương Linh', '2004-08-11', 'Nữ', 'nguyenphuonglinh@gmail.com', N'Sinh viên', N'Đã kích hoạt');

-- Chèn dữ liệu vào bảng nhomQuyen
INSERT INTO nhomQuyen (maNhomQuyen,tenNhomQuyen, loai, moTa, soLuong)
VALUES 
    ('ST','STUDENT', N'Cơ bản', N'Quyền dành cho sinh viên FIT', 0),
    ('TE','TEACHER', N'Cơ bản', N'Quyền dành cho giảng viên FIT', 0),
    ('GV','GVK', N'Cơ bản', N'Quyền dành cho Giáo vụ khoa', 0);

-- Chèn dữ liệu vào bảng phanQuyen


-- Gán quyền cho người dùng vào nhóm quyền
INSERT INTO nguoiDung_nhomQuyen (taiKhoan, maNhomQuyen)
VALUES
    ('10621306', 'ST'),  
    ('12521136', 'TE'),  
    ('12522057', 'GV');  

-- Gán quyền cho nhóm quyền
INSERT INTO nhomQuyen_phanQuyen (maNhomQuyen, maQuyen)
VALUES
    (1, 1),
    (2, 2),
    (3, 1),
    (3, 2), 
    (3, 3),  
    (3, 4);  
go
--========================PROCEDURE=========================
-- THÊM NGU?I DÙNG

CREATE PROCEDURE dangnhap
    @taiKhoan NVARCHAR(50),
    @matKhau NVARCHAR(50)
AS
BEGIN
    -- Kiểm tra tài khoản và mật khẩu trong bảng nguoiDung
    IF EXISTS (SELECT 1 FROM nguoiDung WHERE taiKhoan = @taiKhoan AND matKhau = @matKhau AND TrangThai = N'Đã kích hoạt')
    BEGIN
        -- Kiểm tra nếu tài khoản là mã sinh viên
        IF EXISTS (SELECT 1 FROM sinhVien WHERE maSinhVien = @taiKhoan)
        BEGIN
            SELECT 1 AS Role; -- Sinh viên
            RETURN;
        END
        -- Kiểm tra nếu tài khoản là mã giảng viên
        ELSE IF EXISTS (SELECT 1 FROM giangVien WHERE maGiangVien = @taiKhoan)
        BEGIN
            SELECT 2 AS Role; -- Giảng viên
            RETURN;
        END
    END

    -- Nếu tài khoản hoặc mật khẩu không chính xác hoặc không thuộc giảng viên/sinh viên
    SELECT 0 AS Role; -- Đăng nhập thất bại
END;
GO
exec dangnhap @taiKhoan='10621306', @matKhau='123456'
select *from nguoiDung
se
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
        INSERT INTO nguoiDung (taiKhoan, matKhau, hoTen, ngaySinh,gioiTinh, email, moTa, TrangThai)
        VALUES (@taiKhoan, '123456', @hoTen, @ngaySinh,@gioiTinh, @email, @moTa, 'Chưa xét duyệt');

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
    WHERE taiKhoan = @taiKhoan;

    SELECT N'Sửa người dùng thành công' AS ThongBao;
END;
GO


-- L?Y T?T C? NGU?I DÙNG
CREATE PROCEDURE GetAllNguoiDung
AS
BEGIN
    SELECT * FROM nguoiDung;
END;
GO

-- GET BY TÀI KHO?N
CREATE PROCEDURE GetNguoiDungByTaiKhoan
    @taiKhoan NVARCHAR(50)
AS
BEGIN
    SELECT * FROM nguoiDung
    WHERE taiKhoan = @taiKhoan;
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

CREATE PROCEDURE Getallnhomquyen
as
	begin 
		SELECT nq.maNhomQuyen, nq.tenNhomQuyen, nq.loai, nq.moTa,
       (SELECT COUNT(ndnq.taiKhoan) FROM nguoiDung_nhomQuyen ndnq WHERE ndnq.maNhomQuyen = nq.maNhomQuyen) AS soLuong
FROM nhomQuyen nq;
	end ;
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

	
create procedure delNguoiDung_NhomQuyen
	@taiKhoan nvarchar(20),
	@maNhomQuyen nvarchar(50)
as 
	begin 
		delete from nguoiDung_nhomQuyen where taiKhoan=@taiKhoan and maNhomQuyen = @maNhomQuyen
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
--Thêm quyền
create procedure getallQuyen
as
	begin
		select*from phanQuyen;
	end
--=================nguoidung_nhomquyen
---====================================================QUẢN LÝ HỆ THÔNG --===================================================
create procedure GetAllLop
as
begin
	select*from lop;
	end;
	go
create procedure GetAllSinhVien
as
begin
	select*from sinhVien;
	end;
	go
	create procedure GetAllGiangVien
as
begin
	select*from giangVien;
	end;
	go
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
	('DEL_GIANGVIEN',N'Xóa Giảng Viên');
go
--==========================LỚP============
CREATE PROCEDURE ThemLop
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
        INSERT INTO lop (maLop, tenLop, tenChuyenNganh, khoaHoc)
        VALUES (@maLop, @tenLop, @tenChuyenNganh, @khoaHoc);

        SELECT N'Thêm lớp thành công' AS ThongBao;
    END
    ELSE
    BEGIN
        SELECT N'Bạn không có quyền thêm lớp' AS ThongBao;
    END
END;
GO
CREATE PROCEDURE SuaLop
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
        WHERE maLop = @maLop;

        SELECT N'Sửa lớp thành công' AS ThongBao;
    END
    ELSE
    BEGIN
        SELECT N'Bạn không có quyền sửa lớp' AS ThongBao;
    END
END;
GO
CREATE PROCEDURE XoaLop
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
        DELETE FROM lop WHERE maLop = @maLop;

        SELECT N'Xóa lớp thành công' AS ThongBao;
		
    END
    ELSE
    BEGIN
        SELECT N'Bạn không có quyền xóa lớp' AS ThongBao;
    END
END;
GO
--============================GIANG VIEN
CREATE PROCEDURE ThemGiangVien
    @taiKhoan NVARCHAR(50),
    @maGiangVien INT,
    @tenGiangVien NVARCHAR(255),
    @tenBoMon NVARCHAR(255),
    @chucVu NVARCHAR(100),
    @tenHocVi NVARCHAR(100),
    @tenHocHam NVARCHAR(100),
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
        INSERT INTO giangVien (maGiangVien, tenGiangVien, tenBoMon, chucVu, tenHocVi, tenHocHam, sDT, email)
        VALUES (@maGiangVien, @tenGiangVien, @tenBoMon, @chucVu, @tenHocVi, @tenHocHam, @sDT, @email);

        SELECT N'Thêm giảng viên thành công' AS ThongBao;
    END
    ELSE
    BEGIN
        SELECT N'Bạn không có quyền thêm giảng viên' AS ThongBao;
    END
END;
GO
CREATE PROCEDURE SuaGiangVien
    @taiKhoan NVARCHAR(50),
    @maGiangVien INT,
    @tenGiangVien NVARCHAR(255),
    @tenBoMon NVARCHAR(255),
    @chucVu NVARCHAR(100),
    @tenHocVi NVARCHAR(100),
    @tenHocHam NVARCHAR(100),
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
        UPDATE giangVien
        SET tenGiangVien = @tenGiangVien, tenBoMon = @tenBoMon, chucVu = @chucVu,
            tenHocVi = @tenHocVi, tenHocHam = @tenHocHam, sDT = @sDT, email = @email
        WHERE maGiangVien = @maGiangVien;

        SELECT N'Sửa giảng viên thành công' AS ThongBao;
    END
    ELSE
    BEGIN
        SELECT N'Bạn không có quyền sửa giảng viên' AS ThongBao;
    END
END;
GO
CREATE PROCEDURE XoaGiangVien
    @taiKhoan NVARCHAR(50),
    @maGiangVien INT
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
        DELETE FROM giangVien WHERE maGiangVien = @maGiangVien;

        SELECT N'Xóa giảng viên thành công' AS ThongBao;
    END
    ELSE
    BEGIN
        SELECT N'Bạn không có quyền xóa giảng viên' AS ThongBao;
    END
END;
GO
--===============================SINH VIIEN
CREATE PROCEDURE ThemSinhVien
    @taiKhoan NVARCHAR(50),
    @maSinhVien INT,
    @tenSinhVien NVARCHAR(255),
    @maLop NVARCHAR(50),
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
        INSERT INTO sinhVien (maSinhVien, tenSinhVien, maLop, ngaySinh, gioiTinh, sDT, email)
        VALUES (@maSinhVien, @tenSinhVien, @maLop, @ngaySinh, @gioiTinh, @sDT, @email);

        SELECT N'Thêm sinh viên thành công' AS ThongBao;
    END
    ELSE
    BEGIN
        SELECT N'Bạn không có quyền thêm sinh viên' AS ThongBao;
    END
END;
GO
CREATE PROCEDURE SuaSinhVien
    @taiKhoan NVARCHAR(50),
    @maSinhVien INT,
    @tenSinhVien NVARCHAR(255),
    @maLop NVARCHAR(50),
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
        WHERE maSinhVien = @maSinhVien;

        SELECT N'Sửa sinh viên thành công' AS ThongBao;
    END
    ELSE
    BEGIN
        SELECT N'Bạn không có quyền sửa sinh viên' AS ThongBao;
    END
END;
GO
CREATE PROCEDURE XoaSinhVien
    @taiKhoan NVARCHAR(50),
    @maSinhVien INT
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
        DELETE FROM sinhVien WHERE maSinhVien = @maSinhVien;

        SELECT N'Xóa sinh viên thành công' AS ThongBao;
    END
    ELSE
    BEGIN
        SELECT N'Bạn không có quyền xóa sinh viên' AS ThongBao;
    END
END;
