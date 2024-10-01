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