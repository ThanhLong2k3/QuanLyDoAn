import { DuLieuItem } from "../../ultils/hook";
export interface HocVi extends DuLieuItem {
    ma: string;
    ten: string;
    kyHieu: string;
    moTa: string;
    soLuongHuongDan: number;
  }
  
export interface NguoiDung extends DuLieuItem {
    key:number;
    tk:string;
    mk:string;
    ten:string;
    ngaySinh:Date;
    gioiTinh: string;
    email:string;
    moTa:string;
    trangThai?:string,
}
export interface NhomQuyen extends DuLieuItem{
    key:number;
    maNhomQuyen:string;
    tenNhomQuyen:string;
    loai:string;
    moTa: string;
    soLuong?:number;
}
export interface Lop extends DuLieuItem{
    key:number;
    maLop:number;
    tenLop:string;
    tenChuyenNganh:string;
    khoaHoc: string;
}
export interface GiangVien extends DuLieuItem{
    key:number;
    maGiangVien:number;
    tenGiangVien:string;
    tenBoMon:string;
    chucVu?: string;
    tenHocVi?:string;
    tenHocHam?:string;
    SDT:string;
    email:string;
}
export interface SinhVien extends DuLieuItem{
    key:number;
    maSinhVien:number;
    tenSinhVien:string;
    maLop:string;
    tenTrangThai?: string;
    ngaySinh:string;
    email:string;
    gioiTinh:string;
    SDT:string;
}
export interface DotLamDoAn extends DuLieuItem{
    key:number;
    maDot:string;
    tenDot: string;
    ngayBatDau: string;
    namApDung:string;
    dangKyDeTai?:boolean;
    choPhepSinhVienDangKyGiangVienKhacBoMon?:boolean;
    choPhepSinhVienBaoCaoKhacTuanHienTai?:boolean;
    choPhepGiangVienBaoCaoKhacTuanHienTai?:boolean;
    ChoPhepGiangVienSuaDeTai?:boolean;
    trangThai:boolean;
}
export interface HoiDong extends DuLieuItem{
    tenHoiDong:string;
    maDot:string;
    thuocLop:string;
    phong?:string;
    ngayDuKien:string;
}
