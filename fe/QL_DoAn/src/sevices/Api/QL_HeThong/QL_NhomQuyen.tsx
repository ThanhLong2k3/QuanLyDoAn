import  { AxiosResponse } from "axios";
import {getall,add,Delete,edit,Delete_obj} from "../API-servives"
import {URL} from "../../Url"
import {NhomQuyen} from "../../../components/InterFace"
export const getAll_Quyen =async () =>{
    return await getall(URL.QLHETHONG.QLNHOMQUYEN.GETALL);
}

export const addNhomQuyen= async(value:NhomQuyen,callBack:()=>void)=>{
      return await add(URL.QLHETHONG.QLNHOMQUYEN.ADD,value,true,false,callBack)as AxiosResponse<any>; 
}
export const delNhomQuyen=async(maNhomQuyen:string,callBack:()=>void)=>{
    return await Delete(URL.QLHETHONG.QLNHOMQUYEN.DELETE(maNhomQuyen),true,false,callBack)as AxiosResponse<any>;   
}
export const editNhomQuyen= async(value:NhomQuyen,callBack:()=>void)=>{
    return await edit(URL.QLHETHONG.QLNHOMQUYEN.UPDATE,value,true,false,callBack)as AxiosResponse<any>;
}



//// người dùng _ nhóm quyền
export const getNhomQuyen_TaiKhoan =async (taiKhoan:string) =>{
    return await getall(URL.QLHETHONG.QLNHOMQUYEN.GETNHOMQUYEN_TAIKHOAN(taiKhoan));
}
export const delNguoiDung_NhomQuyen=async(giatri:{})=>{
    return await Delete_obj(URL.QLHETHONG.NGUOIDUNG_NHOMQUYEN.DELETE,giatri);
}


