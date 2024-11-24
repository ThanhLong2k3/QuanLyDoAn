import  { AxiosResponse } from "axios";
import {getall,add,Delete,edit} from "../API-servives"
import {URL} from "../../Url"
import {NhomQuyen} from "../../../components/InterFace"
export const getAll =async () =>{
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


