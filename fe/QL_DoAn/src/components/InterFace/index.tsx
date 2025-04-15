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
export interface DotLamDoAn {
  maDot: string;
  tenDot: string;
  ngayBatDau: string;
  namApDung: string;
  dangKyDeTai?: boolean;
  choPhepSinhVienDangKyGiangVienKhacBoMon?: boolean;
  choPhepSinhVienBaoCaoKhacTuanHienTai?: boolean;
  choPhepGiangVienBaoCaoKhacTuanHienTai?: boolean;
  choPhepGiangVienSuaDeTai?: boolean;
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
  maBoMon: string;
  tenBoMon: string;
  tenKhoa: string;
}

export interface ChucVu {
  maChucVu: string;
  tenChucVu: string;
  moTa: string;
}

export interface Khoa {
  maKhoa: string;
  tenKhoa: string;
}
export interface HocHam {
  maHocHam: string;
  tenHocHam: string;
  kyHieu: string;
  moTa: string;
  soLuongHuongDan: number;
}
export interface HocVi {
  maHocVi: string;
  tenHocVi: string;
  kyHieu: string;
  moTa: string;
  soLuongHuongDan: number;
}

export interface DotLamDoAn_GiangVien {
  maDot:string,
  maGiangVien:string,
  tenGiangVien:string,
  soLuongHuongDan: number;
}
export interface DotLamDoAn_SinhVien {
  maDot:string,
  maLop:string,
  maSinhVien:string,
  tenSinhVien:string,
}

export interface PhanCongHuongDan{
  maDot:string,
  maSinhVien:string,
  maGiangVien:string
}

export interface QL_DeTaiDoAn{
  maDeTai: number,
  tenDeTai: string,
  namHocApDung: string,
  maSinhVien:string,
  trangThai: boolean,
  maDot: string,
  hinhThucBaoCaoBaoVe: string,
  moTa: string
}

export interface QL_DETAI_GV{
  maDeTai: string,
  tenDeTai: string,
  trangThai: boolean,
  maDot: string,
  hinhThucBaoCaoBaoVe: string,
  moTa: string
}
 
export interface BAO_CAO_TUAN{
  maBaoCao?:number | null,
  maDeTai: string,
  soTuan: number,
  tuNgay: string,
  denNgay: string,
  congViec: string,
  noiDungThucHien: string,
  ketQuaDatDuoc: string,
  noiDungBaoCao: string,
  duongDanBaoCao: string,
  nhanXetCuaGiangVien?: string | null,
  diem?: number | null
}
export interface WeekReport {
  key: string;
  id: number;
  title: string;
  content: string;
  work: string;
  taskContent: string;
  result: string;
  url: string;
  fromDate: string;
  toDate: string;
  comment?: string;
  evaluation?: string;
}