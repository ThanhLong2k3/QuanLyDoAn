import  { AxiosResponse } from "axios";
import {getall,add,Delete,edit} from "../API-servives"
import {URL} from "../../Url"
import {HocHam} from "../../../components/InterFace"
import { message } from "antd";
import {CustomNotification} from "../../../components/UI/notification"

export const getAll_HocHam =async () =>{
    return await getall(URL.QLDANHMUC.QLHOCHAM.GetAllHocHam);
}
export const addHocHam= async(value:HocHam,callBack:()=>void)=>{
      const result= await add(URL.QLDANHMUC.QLHOCHAM.AddHocHam,value,true,false,callBack)as AxiosResponse<any>; 
      CustomNotification({ result: result.data });
}
export const delHocHam=async(ID:string,callBack:()=>void)=>{
    const result= await Delete(URL.QLDANHMUC.QLHOCHAM.DeleteHocHam(ID),true,false,callBack) as AxiosResponse<any>;  
    CustomNotification({ result: result.data });
}
export const editHocHam= async(value:HocHam,callBack:()=>void)=>{
    const result= await edit(URL.QLDANHMUC.QLHOCHAM.UpdateHocHam,value,true,false,callBack) as AxiosResponse<any>;
    CustomNotification({ result: result.data });
}