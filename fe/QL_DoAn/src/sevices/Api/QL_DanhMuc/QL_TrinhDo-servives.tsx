import  { AxiosResponse } from "axios";
import {getall,add,Delete,edit} from "../API-servives"
import {URL} from "../../Url"
import {TrinhDo} from "../../../components/InterFace"
import { message } from "antd";


export const getAll_HocHam =async () =>{
    return await getall(URL.QLDANHMUC.QLTRINHDO.GetAllTrinhDo_HocHam);
}
export const getAll_HocVi =async () =>{
    return await getall(URL.QLDANHMUC.QLTRINHDO.GetAllTrinhDo_HocVi);
}
export const addTrinhDo= async(value:TrinhDo,callBack:()=>void)=>{
      const result= await add(URL.QLDANHMUC.QLTRINHDO.AddTrinhDo,value,true,false,callBack)as AxiosResponse<any>; 
      message.success(result.data);
}
export const delTrinhDo=async(ID:string,callBack:()=>void)=>{
    const result= await Delete(URL.QLDANHMUC.QLTRINHDO.DeleteTrinhDo(ID),true,false,callBack) as AxiosResponse<any>;  
    message.success(result.data);
}
export const editTrinhDo= async(value:TrinhDo,callBack:()=>void)=>{
    const result= await edit(URL.QLDANHMUC.QLTRINHDO.UpdateTrinhDo,value,true,false,callBack) as AxiosResponse<any>;
    message.success(result.data);
}