import { DuLieuItem } from "../../ultils/hook";
export interface HocVi extends DuLieuItem {
  ma: string;
  ten: string;
  kyHieu: string;
  moTa: string;
  soLuongHuongDan: number;
}

export interface NguoiDung {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  ngaySinh: Date;
  gioiTinh: string;
  email: string;
  moTa: string;
  trangThai: string;
}
export interface Quyen {
  maQuyen: string;
  tenQuyen: string;
}
export interface NhomQuyen_PhanQuyen {
  maNhomQuyen: string;
  maQuyen: string;
}
export interface NhomQuyen {
  maNhomQuyen: string;
  tenNhomQuyen: string;
  loai: string;
  moTa: string;
  soLuong?: number;
}
export interface Lop {
  maLop: string;
  tenLop: string;
  tenChuyenNganh: string;
  khoaHoc: string;
}
export interface GiangVien {
  maGiangVien: string;
  tenGiangVien: string;
  tenBoMon: string;
  chucVu?: string;
  tenHocVi?: string;
  tenHocHam?: string;
  gioiTinh: string;
  ngaySinh: Date;
  sDT: string;
  email: string;
}
export interface SinhVien {
  maSinhVien: string;
  tenSinhVien: string;
  maLop: string;
  tenTrangThai?: string;
  ngaySinh: Date;
  email: string;
  gioiTinh: string;
  sDT: string;
}
export interface DotLamDoAn extends DuLieuItem {
  key: number;
  maDot: string;
  tenDot: string;
  ngayBatDau: string;
  namApDung: string;
  dangKyDeTai?: boolean;
  choPhepSinhVienDangKyGiangVienKhacBoMon?: boolean;
  choPhepSinhVienBaoCaoKhacTuanHienTai?: boolean;
  choPhepGiangVienBaoCaoKhacTuanHienTai?: boolean;
  ChoPhepGiangVienSuaDeTai?: boolean;
  trangThai: boolean;
}
export interface HoiDong extends DuLieuItem {
  key: number;
  maHoDong?: string;
  tenHoiDong: string;
  maDot: string;
  thuocLop: string;
  phong?: string;
  ngayDuKien: string;
}
export interface BoMon {
  id: string;
  tenBoMon: string;
  tenKhoa: string;
}

export interface ChucVu {
  id: string;
  tenChucVu: string;
  moTa: string;
}

export interface Khoa {
  id: string;
  tenKhoa: string;
}
export interface TrinhDo {
  id: string;
  tenHocHam_HocVi: string;
  kyHieu: string;
  moTa: string;
  soLuongHuongDan: Number;
  hocHam_HocVi ?: Number;
}
