import  { AxiosResponse } from "axios";
import {getall,add,Delete,edit} from "../../API-servives"
import {URL} from "../../../Url"
import {DotLamDoAn} from "../../../../components/InterFace"
import {CustomNotification} from "../../../../components/UI/notification"
export const getAll_DotDoAn =async () =>{
    return await getall(URL.QLDOAN.QL_DOTDOAN.GETALL);
}

export const GetDotByTaiKhoan =async () =>{
    debugger;
    let taiKhoan= localStorage.getItem('taiKhoan')|| '';
    return await getall(URL.QLDOAN.QL_DOTDOAN.GetByTaiKhoan(taiKhoan));
}

export const add_DotDoAn= async(value:DotLamDoAn,callBack:()=>void)=>{
    let taiKhoan= localStorage.getItem('taiKhoan')|| '';
      const result= await add(URL.QLDOAN.QL_DOTDOAN.ADD(taiKhoan),value,true,false,callBack)as AxiosResponse<any>; 
      CustomNotification({ result: result.data });
}
export const del_DotDoAn=async(maDot:string,callBack:()=>void)=>{
    let taiKhoan= localStorage.getItem('taiKhoan')|| '';

    const result= await Delete(URL.QLDOAN.QL_DOTDOAN.DELETE(taiKhoan,maDot),true,false,callBack) as AxiosResponse<any>;  
    CustomNotification({ result: result.data });

}
export const edit_DotDoAn= async(value:DotLamDoAn,callBack:()=>void)=>{
    let taiKhoan= localStorage.getItem('taiKhoan')|| '';
    const result= await edit(URL.QLDOAN.QL_DOTDOAN.UPDATE(taiKhoan),value,true,false,callBack) as AxiosResponse<any>;
    CustomNotification({ result: result.data });

}