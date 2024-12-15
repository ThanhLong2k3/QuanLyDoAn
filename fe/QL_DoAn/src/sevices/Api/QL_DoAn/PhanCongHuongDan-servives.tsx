import  { AxiosResponse } from "axios";
import {getall,add,edit} from "../API-servives"
import {URL} from "../../Url"
import {PhanCongHuongDan} from "../../../components/InterFace"
import {CustomNotification} from "../../../components/UI/notification"

var taiKhoan= localStorage.getItem('taiKhoan')|| '';
export const GetAll_PhanCong_MaDot =async (maDot:string) =>{
    return await getall(URL.QLDOAN.PHANCONGHUONGDAN.GETPHANCONG_MADOT(maDot));
}

export const addPhanCong= async(value:PhanCongHuongDan,callBack:()=>void)=>{
      const result= await add(URL.QLDOAN.PHANCONGHUONGDAN.CREATE(taiKhoan),value,true,false,callBack)as AxiosResponse<any>; 
      debugger
      CustomNotification({ result: result.data });
}
export const editPhanCong= async(value:PhanCongHuongDan,callBack:()=>void)=>{
    const result= await edit(URL.QLDOAN.PHANCONGHUONGDAN.UPDATE(taiKhoan),value,true,false,callBack) as AxiosResponse<any>;
    debugger
    CustomNotification({ result: result.data });
}