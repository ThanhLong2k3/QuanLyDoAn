import  { AxiosResponse } from "axios";
import {getall,add,Delete,edit} from "../API-servives"
import {URL} from "../../Url"
import {HocVi} from "../../../components/InterFace"
import { message } from "antd";



export const getAll_HocVi =async () =>{
    return await getall(URL.QLDANHMUC.QLHOCVI.GetAllHocVi);
}
export const addHocVi= async(value:HocVi,callBack:()=>void)=>{
      const result= await add(URL.QLDANHMUC.QLHOCVI.AddHocVi,value,true,false,callBack)as AxiosResponse<any>; 
      message.success(result.data);
}
export const delHocVi=async(ID:string,callBack:()=>void)=>{
    const result= await Delete(URL.QLDANHMUC.QLHOCVI.DeleteHocVi(ID),true,false,callBack) as AxiosResponse<any>;  
    message.success(result.data);
}
export const editHocVi= async(value:HocVi,callBack:()=>void)=>{
    const result= await edit(URL.QLDANHMUC.QLHOCVI.UpdateHocVi,value,true,false,callBack) as AxiosResponse<any>;
    message.success(result.data);
}