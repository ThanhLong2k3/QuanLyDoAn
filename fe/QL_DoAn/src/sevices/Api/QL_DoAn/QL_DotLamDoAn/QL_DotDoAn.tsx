import  { AxiosResponse } from "axios";
import {getall,add,Delete,edit} from "../../API-servives"
import {URL} from "../../../Url"
import {DotLamDoAn} from "../../../../components/InterFace"
import { message } from "antd";
import { notification } from 'antd';
var taiKhoan= localStorage.getItem('taiKhoan')|| '';
export const getAll_DotDoAn =async () =>{
    return await getall(URL.QLDOAN.QL_DOTDOAN.GETALL);
}

export const add_DotDoAn= async(value:DotLamDoAn,callBack:()=>void)=>{
      const result= await add(URL.QLDOAN.QL_DOTDOAN.ADD(taiKhoan),value,true,false,callBack)as AxiosResponse<any>; 
      message.success({
        content: result.data,
        duration: 2,
        style: { marginTop: '5vh' }
      });
}
export const del_DotDoAn=async(maDot:string,callBack:()=>void)=>{
    const result= await Delete(URL.QLDOAN.QL_DOTDOAN.DELETE(taiKhoan,maDot),true,false,callBack) as AxiosResponse<any>;  
    message.success(result.data);
}
export const edit_DotDoAn= async(value:DotLamDoAn,callBack:()=>void)=>{
    const result= await edit(URL.QLDOAN.QL_DOTDOAN.UPDATE(taiKhoan),value,true,false,callBack) as AxiosResponse<any>;
    notification.success({
        message: 'Thông báo',
        description: result.data,
        duration: 3,
        style: {
          height: '80px'
        },
        placement: 'topRight'
      });
}