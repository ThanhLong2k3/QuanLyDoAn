import  { AxiosResponse } from "axios";
import {getall,add,Delete,edit} from "../API-servives"
import {URL} from "../../Url"
import {ChucVu} from "../../../components/InterFace"
import {CustomNotification} from "../../../components/UI/notification"



export const getAll_ChucVu =async () =>{
    return await getall(URL.QLDANHMUC.QLCHUCVU.GetAllChucVu);
}

export const addChucVu= async(value:ChucVu,callBack:()=>void)=>{
      const result= await add(URL.QLDANHMUC.QLCHUCVU.AddChucVu,value,true,false,callBack)as AxiosResponse<any>; 
     CustomNotification({ result: result.data });
}
export const delChucVu=async(ID:string,callBack:()=>void)=>{
    const result= await Delete(URL.QLDANHMUC.QLCHUCVU.DeleteChucVu(ID),true,false,callBack) as AxiosResponse<any>;  
   CustomNotification({ result: result.data });
}
export const editChucVu= async(value:ChucVu,callBack:()=>void)=>{
    const result= await edit(URL.QLDANHMUC.QLCHUCVU.UpdateChucVu,value,true,false,callBack) as AxiosResponse<any>;
   CustomNotification({ result: result.data });
}