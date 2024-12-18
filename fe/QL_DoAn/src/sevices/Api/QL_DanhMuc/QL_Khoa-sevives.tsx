import  { AxiosResponse } from "axios";
import {getall,add,Delete,edit} from "../API-servives"
import {URL} from "../../Url"
import {Khoa} from "../../../components/InterFace"
import { message } from "antd";
import {CustomNotification} from "../../../components/UI/notification"

export const getAll_Khoa =async () =>{
    return await getall(URL.QLDANHMUC.QLKHOA.GetAllKhoa);
}

export const addKhoa= async(value:Khoa,callBack:()=>void)=>{
      const result= await add(URL.QLDANHMUC.QLKHOA.AddKhoa,value,true,false,callBack)as AxiosResponse<any>; 
      CustomNotification({ result: result.data });
}
export const delKhoa=async(ID:string,callBack:()=>void)=>{
    const result= await Delete(URL.QLDANHMUC.QLKHOA.DeleteKhoa(ID),true,false,callBack) as AxiosResponse<any>;  
    CustomNotification({ result: result.data });
}
export const editKhoa= async(value:Khoa,callBack:()=>void)=>{
    const result= await edit(URL.QLDANHMUC.QLKHOA.UpdateKhoa,value,true,false,callBack) as AxiosResponse<any>;
    CustomNotification({ result: result.data });
}