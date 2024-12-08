import  { AxiosResponse } from "axios";
import {getall,add,Delete,edit} from "../API-servives"
import {URL} from "../../Url"
import {SinhVien} from "../../../components/InterFace";
import { message } from "antd";
var taiKhoan= localStorage.getItem('taiKhoan')|| '';
export const getall_SinhVien =async () =>{
    return await getall(URL.QLDOAN.QL_SINHVIEN.GETALL);
}

export const addSinhVien= async(value:SinhVien,callBack:()=>void)=>{
      const result= await add(URL.QLDOAN.QL_SINHVIEN.ADD(taiKhoan),value,true,false,callBack)as AxiosResponse<any>; 
      message.success(result.data);
}
export const delSinhVien=async(maLop:string,callBack:()=>void)=>{
    const result= await Delete(URL.QLDOAN.QL_SINHVIEN.DELETE(taiKhoan,maLop),true,false,callBack)as AxiosResponse<any>;   
    message.success(result.data);
}
export const editSinhVien= async(value:SinhVien,callBack:()=>void)=>{
    const result= await edit(URL.QLDOAN.QL_SINHVIEN.UPDATE(taiKhoan),value,true,false,callBack)as AxiosResponse<any>;
    message.success(result.data);
}