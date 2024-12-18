import  { AxiosResponse } from "axios";
import {getall,add,Delete,edit} from "../API-servives"
import {URL} from "../../Url"
import {Lop} from "../../../components/InterFace"
import {CustomNotification} from "../../../components/UI/notification"
export const getAll =async () =>{
    return await getall(URL.QLDOAN.LQ_LOP.GETALL);
}

export const addLop= async(value:Lop,callBack:()=>void)=>{
    var taiKhoan= localStorage.getItem('taiKhoan')|| '';
      const result= await add(URL.QLDOAN.LQ_LOP.ADD(taiKhoan),value,true,false,callBack)as AxiosResponse<any>; 
      CustomNotification({ result: result.data });
}
export const delLop=async(maLop:string,callBack:()=>void)=>{
    var taiKhoan= localStorage.getItem('taiKhoan')|| '';
    const result= await Delete(URL.QLDOAN.LQ_LOP.DELETE(taiKhoan,maLop),true,false,callBack)as AxiosResponse<any>;   
    CustomNotification({ result: result.data });
}
export const editLop= async(value:Lop,callBack:()=>void)=>{
    var taiKhoan= localStorage.getItem('taiKhoan')|| '';
    const result= await edit(URL.QLDOAN.LQ_LOP.UPDATE(taiKhoan),value,true,false,callBack)as AxiosResponse<any>;
    CustomNotification({ result: result.data });
}