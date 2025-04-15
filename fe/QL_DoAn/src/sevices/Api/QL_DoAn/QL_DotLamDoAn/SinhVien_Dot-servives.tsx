import  { AxiosResponse } from "axios";
import {getall,add,Delete} from "../../API-servives"
import {URL} from "../../../Url"
import {CustomNotification} from "../../../../components/UI/notification"

export const getAll_SinhVien_HD =async () =>{
    return await getall(URL.QLDOAN.QL_DOTDOAN.DOT_SINHVIEN.GETALL_SV_HD);
}
export const getSinhVien_maDot =async (maDot:string ) =>{
    return await getall(URL.QLDOAN.QL_DOTDOAN.DOT_SINHVIEN.GET_SV_MADOT(maDot));
}

export const add_SinhVien_DotLamDoAn= async(value:{})=>{
   let kq=  await add(URL.QLDOAN.QL_DOTDOAN.DOT_SINHVIEN.CREATE_DOT_SV,value,true,false)as AxiosResponse<any>; 
   CustomNotification({ result: kq.data });
}
export const del_SinhVien_DotDoAn=async(maDot:string,maSinhVien:string)=>{
     await Delete(URL.QLDOAN.QL_DOTDOAN.DOT_SINHVIEN.DEL_SV_DOT(maDot,maSinhVien),true,false);  
}
