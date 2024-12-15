import { AxiosResponse } from "axios";
import {getall,add,edit,Delete} from "../../API-servives"
import {URL} from "../../../Url"
import {CustomNotification} from "../../../../components/UI/notification"
import { QL_DeTaiDoAn,PhanCongHuongDan } from "../../../../components/InterFace";
var taiKhoan= localStorage.getItem('taiKhoan')|| '';
export const GetAll_MaDot_TK =async () =>{
    let kq= await getall(URL.QLDOAN.QL_DOTDOAN.DOT_SINHVIEN.GET_DOT_TK(taiKhoan));
    return kq;
}


export const add_DeTaiDoAn= async(value_PC:PhanCongHuongDan,value:QL_DeTaiDoAn,callBack:()=>void)=>{
    debugger;
      const result= await add(URL.QLDOAN.QUANLYDETAI.ADD(taiKhoan),value,true,false,callBack)as AxiosResponse<any>;
        await add(URL.QLDOAN.PHANCONGHUONGDAN.CREATE(taiKhoan),value_PC,false,false,callBack); 
      CustomNotification({ result: result.data });
}
export const del_DeTaiDoAn=async(maQL_DeTaiDoAn:number,callBack:()=>void)=>{
    const result= await Delete(URL.QLDOAN.QUANLYDETAI.DELETE(maQL_DeTaiDoAn,taiKhoan),true,false,callBack) as AxiosResponse<any>;  
    CustomNotification({ result: result.data });
}
export const edit_DeTaiDoAn= async(value:QL_DeTaiDoAn,callBack:()=>void)=>{
    debugger;
    const result= await edit(URL.QLDOAN.QUANLYDETAI.UPDATE(taiKhoan),value,true,false,callBack) as AxiosResponse<any>;
    CustomNotification({ result: result.data });
}