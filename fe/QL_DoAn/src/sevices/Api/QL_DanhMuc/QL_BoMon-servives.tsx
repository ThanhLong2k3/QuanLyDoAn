import  { AxiosResponse } from "axios";
import {getall,add,Delete,edit} from "../API-servives"
import {URL} from "../../Url"
import {BoMon} from "../../../components/InterFace"
import { message } from "antd";
import {CustomNotification} from "../../../components/UI/notification"

export const getAll_BoMon =async () =>{
    return await getall(URL.QLDANHMUC.QLBOMON.GetAllBoMon);
}

export const addBoMon= async(value:BoMon,callBack:()=>void)=>{
      const result= await add(URL.QLDANHMUC.QLBOMON.AddBoMon,value,true,false,callBack)as AxiosResponse<any>; 
      CustomNotification({ result: result.data });
}
export const delBoMon=async(ID:string,callBack:()=>void)=>{
    const result= await Delete(URL.QLDANHMUC.QLBOMON.DeleteBoMon(ID),true,false,callBack) as AxiosResponse<any>;  
    CustomNotification({ result: result.data });
}
export const editBoMon= async(value:BoMon,callBack:()=>void)=>{
    const result= await edit(URL.QLDANHMUC.QLBOMON.UpdateBoMon,value,true,false,callBack) as AxiosResponse<any>;
    CustomNotification({ result: result.data });
}