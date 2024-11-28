import  { AxiosResponse } from "axios";
import {getall,add,Delete,edit,Delete_obj} from "../API-servives"
import {URL} from "../../Url"
import {NguoiDung} from "../../../components/InterFace"
export const getAll_NguoiDung =async () =>{
    return await getall(URL.QLHETHONG.QLNGUOIDUNG.GETALL);
}
export const getAll_NguoiDung_TaiKhoan =async (taiKhoan:string) =>{
    return await getall(URL.QLHETHONG.QLNGUOIDUNG.GETBYTK(taiKhoan));
}

export const addNguoiDung= async(value:NguoiDung,callBack:()=>void)=>{
      return await add(URL.QLHETHONG.QLNGUOIDUNG.ADD,value,true,false,callBack)as AxiosResponse<any>; 
}
export const delNguoiDung=async(maNguoiDung:string,callBack:()=>void)=>{
    return await Delete(URL.QLHETHONG.QLNGUOIDUNG.DELETE(maNguoiDung),true,false,callBack)as AxiosResponse<any>;   
}
export const editNguoiDung= async(value:NguoiDung,callBack:()=>void)=>{
    return await edit(URL.QLHETHONG.QLNGUOIDUNG.UPDATE,value,true,false,callBack)as AxiosResponse<any>;
}
export const getNguoiDung_ByMaNhomQuyen =async (ma:string) =>{
    return await getall(URL.QLHETHONG.NGUOIDUNG_NHOMQUYEN.GETBYMANHOMQUYEN(ma));
}

// 
export const addNguoiDung_NhomQuyen= async(value:{})=>{
    return await add(URL.QLHETHONG.NGUOIDUNG_NHOMQUYEN.ADD,value,true,false,undefined)as AxiosResponse<any>; 
}
export const delNguoiDung_NhomQuyen=async(value:{})=>{
    return await Delete_obj(URL.QLHETHONG.NGUOIDUNG_NHOMQUYEN.DELETE, value);
}

//  NGUOIDUNG_NHOMQUYEN

export const dangNhap =async (value:{}) =>{
    return await add(URL.QLHETHONG.QLNGUOIDUNG.DANGNHAP,value,true,false)as AxiosResponse<any>;
}

export const getAllQuyen_TaiKhoan =async (tk:string) =>{
    return await getall(URL.QLHETHONG.NGUOIDUNG_NHOMQUYEN.GETBYTAIKHOAN(tk));
}