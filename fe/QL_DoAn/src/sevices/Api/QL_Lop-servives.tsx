import  { AxiosResponse } from "axios";
import {getall,add,Delete,edit} from "../Api/API-servives"
import {URL} from "../Url"
import {Lop} from "../../components/InterFace"
var taiKhoan= localStorage.getItem('taiKhoan')|| '';
export const getAll =async () =>{
    return await getall(URL.QLDOAN.LQ_LOP.GETALL);
}

export const addLop= async(value:Lop,callBack:()=>void)=>{
      return await add(URL.QLDOAN.LQ_LOP.ADD(taiKhoan),value,true,false,callBack)as AxiosResponse<any>; 
}
export const delLop=async(maLop:string,callBack:()=>void)=>{
    return await Delete(URL.QLDOAN.LQ_LOP.DELETE(taiKhoan,maLop),true,false,callBack)as AxiosResponse<any>;   
}
export const editLop= async(value:Lop,callBack:()=>void)=>{
    return await edit(URL.QLDOAN.LQ_LOP.UPDATE(taiKhoan),value,true,false,callBack)as AxiosResponse<any>;
}