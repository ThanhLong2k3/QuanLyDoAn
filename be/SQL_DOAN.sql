CREATE DATABASE QL_DoAn;
GO

--=====================================================QUẢN LÝ ĐỒ ÁN 
CREATE TABLE lop (
    maLop VARCHAR(50) PRIMARY KEY,
    tenLop NVARCHAR(50) NOT NULL,
    tenChuyenNganh NVARCHAR(50) NOT NULL,
    khoaHoc VARCHAR(10) NOT NULL
);

-- Tạo bảng nguoiDung
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

CREATE TABLE giangVien (
    maGiangVien  NVARCHAR(50) PRIMARY KEY,
    tenGiangVien NVARCHAR(255),
    tenBoMon NVARCHAR(255),
    chucVu NVARCHAR(100),
    tenHocVi NVARCHAR(100) null,
    tenHocHam NVARCHAR(100) null,
    ngaySinh DATE,
	gioiTinh nvarchar(10),
    sDT VARCHAR(15),
    email NVARCHAR(255),
    FOREIGN KEY (maGiangVien) REFERENCES nguoiDung(taiKhoan) ON DELETE CASCADE ON UPDATE CASCADE,
);

CREATE TABLE sinhVien (
    maSinhVien NVARCHAR(50) PRIMARY KEY,
    tenSinhVien NVARCHAR(255),
    maLop VARCHAR(50),
    ngaySinh DATE,
    gioiTinh NVARCHAR(10),
    sDT VARCHAR(15),
    email NVARCHAR(255),
    FOREIGN KEY (maLop) REFERENCES lop(maLop) ON DELETE CASCADE,
    FOREIGN KEY (maSinhVien) REFERENCES nguoiDung(taiKhoan) ON DELETE CASCADE  ON UPDATE CASCADE,
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
    FOREIGN KEY (maDot) REFERENCES dotLamDoAn(maDot) ON DELETE CASCADE
);

CREATE TABLE hoiDong_GiangVien (
    maHoiDong VARCHAR(50),
    maGiangVien NVARCHAR(50),
	nhiemVu NVARCHAR(50) NULL,
    PRIMARY KEY (maHoiDong, maGiangVien),
    FOREIGN KEY (maHoiDong) REFERENCES hoiDong(maHoiDong) ON DELETE CASCADE,
    FOREIGN KEY (maGiangVien) REFERENCES giangVien(maGiangVien) ON DELETE CASCADE
);

CREATE TABLE hoiDong_SinhVien (
    maHoiDong VARCHAR(50),
    maSinhVien NVARCHAR(50),
    PRIMARY KEY (maHoiDong, maSinhVien),
    FOREIGN KEY (maHoiDong) REFERENCES hoiDong(maHoiDong) ON DELETE CASCADE,
    FOREIGN KEY (maSinhVien) REFERENCES sinhVien(maSinhVien) ON DELETE CASCADE
);
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
-- Thêm 20 dữ liệu vào bảng nguoiDung
-- Chèn dữ liệu vào bảng nguoiDung
-- Thêm dữ liệu vào bảng lop
INSERT INTO lop (maLop, tenLop, tenChuyenNganh, khoaHoc) VALUES
('L01', N'Lớp 1', N'Công nghệ thông tin', '2020'),
('L02', N'Lớp 2', N'Kinh tế', '2021'),
('L03', N'Lớp 3', N'Công nghệ sinh học', '2020'),
('L04', N'Lớp 4', N'Quản trị kinh doanh', '2022'),
('L05', N'Lớp 5', N'Truyền thông', '2021'),
('L06', N'Lớp 6', N'Công nghệ ô tô', '2023'),
('L07', N'Lớp 7', N'Luật', '2020'),
('L08', N'Lớp 8', N'Y khoa', '2021'),
('L09', N'Lớp 9', N'Kiến trúc', '2022'),
('L10', N'Lớp 10', N'Kỹ thuật phần mềm', '2023');

-- Thêm dữ liệu vào bảng nguoiDung
INSERT INTO nguoiDung (taiKhoan, matKhau, hoTen, ngaySinh, gioiTinh, email, moTa, TrangThai) VALUES
('GV001', '123456', N'Trần Văn A', '1970-05-10', N'Nam', 'a.tran@example.com', N'Giảng viên', N'Hoạt động'),
('GV002', '123456', N'Nguyễn Văn B', '1980-07-15', N'Nam', 'b.nguyen@example.com', N'Giảng viên', N'Hoạt động'),
('GV003', '123456', N'Lê Thị C', '1985-11-21', N'Nữ', 'c.le@example.com', N'Giảng viên', N'Hoạt động'),
('GV004', '123456', N'Phạm Quốc D', '1990-03-25', N'Nam', 'd.pham@example.com', N'Giảng viên', N'Hoạt động'),
('GV005', '123456', N'Võ Thị E', '1988-08-30', N'Nữ', 'e.vo@example.com', N'Giảng viên', N'Hoạt động'),
('SV001', '123456', N'Ngô Văn X', '2000-06-01', N'Nam', 'x.ngo@example.com', N'Sinh viên', N'Hoạt động'),
('SV002', '123456', N'Bùi Thị Y', '2001-02-15', N'Nữ', 'y.bui@example.com', N'Sinh viên', N'Hoạt động'),
('SV003', '123456', N'Trịnh Văn Z', '2000-12-20', N'Nam', 'z.trinh@example.com', N'Sinh viên', N'Hoạt động'),
('SV004', '123456', N'Hoàng Thị H', '2001-05-10', N'Nữ', 'h.hoang@example.com', N'Sinh viên', N'Hoạt động'),
('SV005', '123456', N'Vũ Văn I', '2000-09-17', N'Nam', 'i.vu@example.com', N'Sinh viên', N'Hoạt động');

-- Thêm dữ liệu vào bảng giangVien
INSERT INTO giangVien (maGiangVien, tenGiangVien, tenBoMon, chucVu, tenHocVi, tenHocHam, ngaySinh, sDT, email) VALUES
('GV001', N'Trần Văn A', N'Công nghệ thông tin', N'Giáo sư', N'Tiến sĩ', N'Phó giáo sư', '1970-05-10', '0123456789', 'a.tran@example.com'),
('GV002', N'Nguyễn Văn B', N'Kinh tế', N'Phó giáo sư', N'Thạc sĩ', N'Tiến sĩ', '1980-07-15', '0123456788', 'b.nguyen@example.com'),
('GV003', N'Lê Thị C', N'Công nghệ sinh học', N'Giảng viên chính', N'Thạc sĩ', N'Tiến sĩ', '1985-11-21', '0123456787', 'c.le@example.com'),
('GV004', N'Phạm Quốc D', N'Quản trị kinh doanh', N'Trợ giảng', N'Thạc sĩ', N'Phó giáo sư', '1990-03-25', '0123456786', 'd.pham@example.com'),
('GV005', N'Võ Thị E', N'Truyền thông', N'Trưởng khoa', N'Tiến sĩ', N'Giáo sư', '1988-08-30', '0123456785', 'e.vo@example.com');

-- Thêm dữ liệu vào bảng sinhVien
INSERT INTO sinhVien (maSinhVien, tenSinhVien, maLop, ngaySinh, gioiTinh, sDT, email) VALUES
('SV001', N'Ngô Văn X', 'L01', '2000-06-01', N'Nam', '0123456784', 'x.ngo@example.com'),
('SV002', N'Bùi Thị Y', 'L02', '2001-02-15', N'Nữ', '0123456783', 'y.bui@example.com'),
('SV003', N'Trịnh Văn Z', 'L03', '2000-12-20', N'Nam', '0123456782', 'z.trinh@example.com'),
('SV004', N'Hoàng Thị H', 'L04', '2001-05-10', N'Nữ', '0123456781', 'h.hoang@example.com'),
('SV005', N'Vũ Văn I', 'L05', '2000-09-17', N'Nam', '0123456780', 'i.vu@example.com');

-- Thêm dữ liệu vào bảng dotLamDoAn
INSERT INTO dotLamDoAn (maDot, tenDot, ngayBatDau, namApDung, dangKyDeTai, choPhepSinhVienDangKyGiangVienKhacBoMon, choPhepSinhVienBaoCaoKhacTuanHienTai, choPhepGiangVienBaoCaoKhacTuanHienTai, choPhepGiangVienSuaDeTai, trangThai) VALUES
('DA001', N'Đợt làm đồ án 2023', '2023-09-01', '2023', 1, 1, 0, 0, 1, 1),
('DA002', N'Đợt làm đồ án 2022', '2022-09-01', '2022', 1, 0, 1, 1, 0, 1);

-- Thêm dữ liệu vào bảng hoiDong
INSERT INTO hoiDong (maHoiDong, tenHoiDong, maDot, thuocLop, phong, ngayDuKien) VALUES
('HD001', N'Hội đồng 1', 'DA001', N'Lớp 1', 'P101', '2023-12-01'),
('HD002', N'Hội đồng 2', 'DA002', N'Lớp 2', 'P102', '2022-12-01');

-- Thêm dữ liệu vào bảng hoiDong_GiangVien
INSERT INTO hoiDong_GiangVien (maHoiDong, maGiangVien) VALUES
('HD001', 'GV001'),
('HD001', 'GV002'),
('HD002', 'GV003'),
('HD002', 'GV004');

-- Thêm dữ liệu vào bảng hoiDong_SinhVien
INSERT INTO hoiDong_SinhVien (maHoiDong, maSinhVien) VALUES
('HD001', 'SV001'),
('HD001', 'SV002'),
('HD002', 'SV003'),
('HD002', 'SV004');

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
	('DEL_NHOMQUYEN',N'Xóa nhóm quyền');
go

-- Thêm dữ liệu vào bảng nguoiDung_nhomQuyen
INSERT INTO nguoiDung_nhomQuyen (taiKhoan, maNhomQuyen) VALUES
('GV001', 'NQ01'),
('GV002', 'NQ01'),
('SV001', 'NQ02'),
('SV002', 'NQ02');
go
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
    -- Kiểm tra tài khoản và mật khẩu trong bảng nguoiDung
    IF EXISTS (SELECT 1 FROM nguoiDung WHERE taiKhoan = @taiKhoan AND matKhau = @matKhau AND TrangThai = N'Đã xét duyệt')
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
        VALUES (@taiKhoan, '123456', @hoTen, @ngaySinh,@gioiTinh, @email, @moTa, N'Chưa xét duyệt');

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
    @maGiangVien nvarchar(50),
    @tenGiangVien NVARCHAR(255),
    @tenBoMon NVARCHAR(255),
    @chucVu NVARCHAR(100),
    @tenHocVi NVARCHAR(100)=null,
    @tenHocHam NVARCHAR(100)=null,
	@gioiTinh nvarchar(10),
	@ngaySinh date,
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
		EXEC ThemNguoiDung @taiKhoan = @maGiangVien, @hoTen = @tenGiangVien, @ngaySinh = @ngaySinh, @gioiTinh = @gioiTinh, @email = @email, @moTa = N'Giảng viên';

        INSERT INTO giangVien (maGiangVien, tenGiangVien, tenBoMon, chucVu, tenHocVi, tenHocHam,ngaySinh,gioiTinh, sDT, email)
        VALUES (@maGiangVien, @tenGiangVien, @tenBoMon, @chucVu, @tenHocVi, @tenHocHam,@ngaySinh,@gioiTinh, @sDT, @email);
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
    @maGiangVien nvarchar(50),
    @tenGiangVien NVARCHAR(255),
    @tenBoMon NVARCHAR(255),
    @chucVu NVARCHAR(100),
    @tenHocVi NVARCHAR(100)=null,
    @tenHocHam NVARCHAR(100)=null,
	@gioiTinh nvarchar(10),
	@ngaySinh date ,
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
            tenHocVi = @tenHocVi, tenHocHam = @tenHocHam,gioiTinh=@gioiTinh, sDT = @sDT, email = @email
        WHERE maGiangVien = @maGiangVien;
		EXEC SuaSuaNguoiDung @taiKhoan = @maGiangVien, @hoTen = @tenGiangVien, @ngaySinh = @ngaySinh, @gioiTinh = @gioiTinh, @email = @email, @moTa = N'Giảng viên';

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
    @maGiangVien nvarchar(50)
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
    @maSinhVien NVARCHAR(50),
    @tenSinhVien NVARCHAR(255),
    @maLop NVARCHAR(50),
    @ngaySinh DATE,
    @gioiTinh NVARCHAR(10),
    @sDT VARCHAR(15),
    @email NVARCHAR(255)
AS
BEGIN
    DECLARE @coQuyenThemSinhVien BIT = 0;

    -- Kiểm tra quyền thêm sinh viên
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
        -- Thêm sinh viên vào bảng nguoiDung trước
        EXEC ThemNguoiDung @taiKhoan = @maSinhVien, @hoTen = @tenSinhVien, @ngaySinh = @ngaySinh, @gioiTinh = @gioiTinh, @email = @email, @moTa = N'Sinh viên';

        -- Sau đó thêm vào bảng sinhVien
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
    @maSinhVien nvarchar(50),
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
		EXEC SuaNguoiDung @taiKhoan = @maSinhVien, @hoTen = @tenSinhVien, @ngaySinh = @ngaySinh, @gioiTinh = @gioiTinh, @email = @email, @moTa = N'Sinh viên';

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
    @maSinhVien nvarchar(50)
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
GO
go
CREATE PROCEDURE GETPHANQUYENBYTAIKHOAN
@taiKhoan nvarchar(50)
as
	begin
SELECT nhomQuyen_phanQuyen.maNhomQuyen,nhomQuyen_phanQuyen.maQuyen FROM nhomQuyen_phanQuyen INNER JOIN nguoiDung_nhomQuyen ON nhomQuyen_phanQuyen.maNhomQuyen=nguoiDung_nhomQuyen.maNhomQuyen WHERE nguoiDung_nhomQuyen.taiKhoan=@taiKhoan;
end
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
CREATE PROC GetAll_DotLamDoAn
AS
	BEGIN
		SELECT * FROM dotLamDoAn
	END

GO

CREATE PROCEDURE Them_DotLamDoAn
    @taiKhoan NVARCHAR(50),
    @maDot VARCHAR(50),
    @tenDot NVARCHAR(255),
    @ngayBatDau DATE,
    @namApDung VARCHAR(4),
    @dangKyDeTai BIT,
    @choPhepSinhVienDangKyGiangVienKhacBoMon BIT,
    @choPhepSinhVienBaoCaoKhacTuanHienTai BIT,
    @choPhepGiangVienBaoCaoKhacTuanHienTai BIT,
    @choPhepGiangVienSuaDeTai BIT,
    @trangThai BIT
AS
BEGIN
    DECLARE @coQuyenThemDot BIT = 0;

    IF EXISTS (
        SELECT 1
        FROM nguoiDung_nhomQuyen AS ndnq
        JOIN nhomQuyen_phanQuyen AS nqpnq ON ndnq.maNhomQuyen = nqpnq.maNhomQuyen
        WHERE ndnq.taiKhoan = @taiKhoan AND nqpnq.maQuyen = 'ADD_DOTLAMDOAN'
    )
    BEGIN
        SET @coQuyenThemDot = 1;
    END

    IF @coQuyenThemDot = 1
    BEGIN 
        INSERT INTO dotLamDoAn(maDot, tenDot, ngayBatDau, namApDung, dangKyDeTai, 
                               choPhepSinhVienDangKyGiangVienKhacBoMon, choPhepSinhVienBaoCaoKhacTuanHienTai, 
                               choPhepGiangVienBaoCaoKhacTuanHienTai, choPhepGiangVienSuaDeTai, trangThai)
        VALUES (@maDot, @tenDot, @ngayBatDau, @namApDung, @dangKyDeTai, 
                @choPhepSinhVienDangKyGiangVienKhacBoMon, @choPhepSinhVienBaoCaoKhacTuanHienTai, 
                @choPhepGiangVienBaoCaoKhacTuanHienTai, @choPhepGiangVienSuaDeTai, @trangThai);

        SELECT N'Thêm đợt làm đồ án thành công' AS ThongBao;
    END
    ELSE
    BEGIN
        SELECT N'Bạn không có quyền thêm đợt làm đồ án' AS ThongBao;
    END
END;
GO

-- Procedure to edit an existing "dotLamDoAn"
CREATE PROCEDURE Sua_DotLamDoAn
    @taiKhoan NVARCHAR(50),
    @maDot VARCHAR(50),
    @tenDot NVARCHAR(255),
    @ngayBatDau DATE,
    @namApDung VARCHAR(4),
    @dangKyDeTai BIT,
    @choPhepSinhVienDangKyGiangVienKhacBoMon BIT,
    @choPhepSinhVienBaoCaoKhacTuanHienTai BIT,
    @choPhepGiangVienBaoCaoKhacTuanHienTai BIT,
    @choPhepGiangVienSuaDeTai BIT,
    @trangThai BIT
AS
BEGIN
    DECLARE @coQuyenSuaDot BIT = 0;

    -- Check permission to edit a project period
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
        WHERE maDot = @maDot;

        SELECT N'Sửa đợt làm đồ án thành công' AS ThongBao;
    END
    ELSE
    BEGIN
        SELECT N'Bạn không có quyền sửa đợt làm đồ án' AS ThongBao;
    END
END;
GO

-- Procedure to delete a "dotLamDoAn"
CREATE PROCEDURE Xoa_DotLamDoAn
    @taiKhoan NVARCHAR(50),
    @maDot VARCHAR(50)
AS
BEGIN
    DECLARE @coQuyenXoaDot BIT = 0;

    -- Check permission to delete a project period
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
        DELETE FROM dotLamDoAn WHERE maDot = @maDot;

        SELECT N'Xóa đợt làm đồ án thành công' AS ThongBao;
    END
    ELSE
    BEGIN
        SELECT N'Bạn không có quyền xóa đợt làm đồ án' AS ThongBao;
    END
END;
GO
CREATE PROC GetAll_HoiDong
AS
BEGIN
	SELECT*FROM hoiDong
	END
	GO
-- Procedure to add a new "hoiDong"
CREATE PROCEDURE Them_HoiDong
    @taiKhoan NVARCHAR(50),
    @maHoiDong VARCHAR(50),
    @tenHoiDong NVARCHAR(255),
    @maDot VARCHAR(50),
    @thuocLop NVARCHAR(100),
    @phong NVARCHAR(50),
    @ngayDuKien DATE
AS
BEGIN
    DECLARE @coQuyenThemHoiDong BIT = 0;

    -- Check permission to add a new committee
    IF EXISTS (
        SELECT 1
        FROM nguoiDung_nhomQuyen AS ndnq
        JOIN nhomQuyen_phanQuyen AS nqpnq ON ndnq.maNhomQuyen = nqpnq.maNhomQuyen
        WHERE ndnq.taiKhoan = @taiKhoan AND nqpnq.maQuyen = 'ADD_HOIDONG'
    )
    BEGIN
        SET @coQuyenThemHoiDong = 1;
    END

    IF @coQuyenThemHoiDong = 1
    BEGIN 
        INSERT INTO hoiDong(maHoiDong, tenHoiDong, maDot, thuocLop, phong, ngayDuKien)
        VALUES (@maHoiDong, @tenHoiDong, @maDot, @thuocLop, @phong, @ngayDuKien);

        SELECT N'Thêm hội đồng thành công' AS ThongBao;
    END
    ELSE
    BEGIN
        SELECT N'Bạn không có quyền thêm hội đồng' AS ThongBao;
    END
END;
GO

-- Procedure to edit an existing "hoiDong"
CREATE PROCEDURE Sua_HoiDong
    @taiKhoan NVARCHAR(50),
    @maHoiDong VARCHAR(50),
    @tenHoiDong NVARCHAR(255),
    @maDot VARCHAR(50),
    @thuocLop NVARCHAR(100),
    @phong NVARCHAR(50),
    @ngayDuKien DATE
AS
BEGIN
    DECLARE @coQuyenSuaHoiDong BIT = 0;

    -- Check permission to edit a committee
    IF EXISTS (
        SELECT 1
        FROM nguoiDung_nhomQuyen AS ndnq
        JOIN nhomQuyen_phanQuyen AS nqpnq ON ndnq.maNhomQuyen = nqpnq.maNhomQuyen
        WHERE ndnq.taiKhoan = @taiKhoan AND nqpnq.maQuyen = 'UP_HOIDONG'
    )
    BEGIN
        SET @coQuyenSuaHoiDong = 1;
    END

    IF @coQuyenSuaHoiDong = 1
    BEGIN 
        UPDATE hoiDong
        SET tenHoiDong = @tenHoiDong, 
            maDot = @maDot, 
            thuocLop = @thuocLop, 
            phong = @phong, 
            ngayDuKien = @ngayDuKien
        WHERE maHoiDong = @maHoiDong;

        SELECT N'Sửa hội đồng thành công' AS ThongBao;
    END
    ELSE
    BEGIN
        SELECT N'Bạn không có quyền sửa hội đồng' AS ThongBao;
    END
END;
GO

-- Procedure to delete a "hoiDong"
CREATE PROCEDURE Xoa_HoiDong
    @taiKhoan NVARCHAR(50),
    @maHoiDong VARCHAR(50)
AS
BEGIN
    DECLARE @coQuyenXoaHoiDong BIT = 0;

    -- Check permission to delete a committee
    IF EXISTS (
        SELECT 1
        FROM nguoiDung_nhomQuyen AS ndnq
        JOIN nhomQuyen_phanQuyen AS nqpnq ON ndnq.maNhomQuyen = nqpnq.maNhomQuyen
        WHERE ndnq.taiKhoan = @taiKhoan AND nqpnq.maQuyen = 'DEL_HOIDONG'
    )
    BEGIN
        SET @coQuyenXoaHoiDong = 1;
    END

    IF @coQuyenXoaHoiDong = 1
    BEGIN 
        DELETE FROM hoiDong WHERE maHoiDong = @maHoiDong;

        SELECT N'Xóa hội đồng thành công' AS ThongBao;
    END
    ELSE
    BEGIN
        SELECT N'Bạn không có quyền xóa hội đồng' AS ThongBao;
    END
END;
GO

CREATE PROCEDURE Them_ThanhVien_HoiDong
    @taiKhoan NVARCHAR(50),
    @maHoiDong VARCHAR(50),
    @maThanhVien NVARCHAR(50),
    @loaiThanhVien NVARCHAR(10), -- 'GV' for lecturer, 'SV' for student
    @nhiemVu NVARCHAR(50) = NULL -- Default value is NULL
AS
BEGIN
    DECLARE @coQuyenThemThanhVien BIT = 0;

    -- Check permission to add members to a committee
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
            INSERT INTO hoiDong_GiangVien(maHoiDong, maGiangVien, nhiemVu)
            VALUES (@maHoiDong, @maThanhVien, @nhiemVu);
        END
        ELSE IF @loaiThanhVien = 'SV'
        BEGIN
            INSERT INTO hoiDong_SinhVien(maHoiDong, maSinhVien)
            VALUES (@maHoiDong, @maThanhVien);
        END

        SELECT N'Thêm thành viên vào hội đồng thành công' AS ThongBao;
    END
    ELSE
    BEGIN
        SELECT N'Bạn không có quyền thêm thành viên vào hội đồng' AS ThongBao;
    END
END;
GO


-- Procedure to remove members from a "hoiDong"
CREATE PROCEDURE Xoa_ThanhVien_HoiDong
    @taiKhoan NVARCHAR(50),
    @maHoiDong VARCHAR(50),
    @maThanhVien NVARCHAR(50),
    @loaiThanhVien NVARCHAR(10) -- 'GV' for lecturer, 'SV' for student
AS
BEGIN
    DECLARE @coQuyenXoaThanhVien BIT = 0;

    -- Check permission to remove members from a committee
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
            DELETE FROM hoiDong_GiangVien 
            WHERE maHoiDong = @maHoiDong AND maGiangVien = @maThanhVien;
        END
        ELSE IF @loaiThanhVien = 'SV'
        BEGIN
            DELETE FROM hoiDong_SinhVien 
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
CREATE PROC Get_GiangVien_MaHoiDong
    @maHoiDong VARCHAR(50)
AS
BEGIN
	SELECT gv.maGiangVien,gv.tenGiangVien,gv. FROM giangVien gv inner join hoiDong_GiangVien hd_gv on gv.maGiangVien=hd_gv.maGiangVien where hd_gv.maHoiDong=@maHoiDong;