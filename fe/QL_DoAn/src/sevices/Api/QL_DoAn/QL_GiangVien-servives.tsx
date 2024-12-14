import  { AxiosResponse } from "axios";
import {getall,add,Delete,edit} from "../API-servives"
import {URL} from "../../Url"
import {GiangVien} from "../../../components/InterFace"
import {CustomNotification} from "../../../components/UI/notification"

var taiKhoan= localStorage.getItem('taiKhoan')|| '';
export const getAll =async () =>{
    return await getall(URL.QLDOAN.QL_GIANGVIEN.GETALL);
}

export const addGiangVien= async(value:GiangVien,callBack:()=>void)=>{
    debugger;
      const result= await add(URL.QLDOAN.QL_GIANGVIEN.ADD(taiKhoan),value,true,false,callBack)as AxiosResponse<any>; 
      CustomNotification({ result: result.data });
}
export const delGiangVien=async(maGiangVien:string,callBack:()=>void)=>{
    const result= await Delete(URL.QLDOAN.QL_GIANGVIEN.DELETE(taiKhoan,maGiangVien),true,false,callBack) as AxiosResponse<any>;  
    CustomNotification({ result: result.data });
}
export const editGiangVien= async(value:GiangVien,callBack:()=>void)=>{
    debugger;
    const result= await edit(URL.QLDOAN.QL_GIANGVIEN.UPDATE(taiKhoan),value,true,false,callBack) as AxiosResponse<any>;
    CustomNotification({ result: result.data });
}