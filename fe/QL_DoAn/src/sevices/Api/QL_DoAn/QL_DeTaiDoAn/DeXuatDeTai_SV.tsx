import { AxiosResponse } from "axios";
import {getall,add,edit,Delete} from "../../API-servives"
import {URL} from "../../../Url"
import {CustomNotification} from "../../../../components/UI/notification"
import { QL_DeTaiDoAn } from "../../../../components/InterFace";

export const GetAll_MaDot_TK =async () =>{
    let taiKhoan= localStorage.getItem('taiKhoan')|| '';
    let kq= await getall(URL.QLDOAN.QL_DOTDOAN.DOT_SINHVIEN.GET_DOT_TK(taiKhoan));
    return kq;
}


export const add_DeTaiDoAn= async(value:{},callBack:()=>void)=>{
      let taiKhoan= localStorage.getItem('taiKhoan')|| '';
      const result= await add(URL.QLDOAN.QUANLYDETAI.ADD(taiKhoan),value,true,false,callBack)as AxiosResponse<any>;
      CustomNotification({ result: result.data });
}
export const del_DeTaiDoAn=async(maQL_DeTaiDoAn:number,callBack:()=>void)=>{
    let taiKhoan= localStorage.getItem('taiKhoan')|| '';
    const result= await Delete(URL.QLDOAN.QUANLYDETAI.DELETE(maQL_DeTaiDoAn,taiKhoan),true,false,callBack) as AxiosResponse<any>;  
    CustomNotification({ result: result.data });
}
export const edit_DeTaiDoAn= async(value:QL_DeTaiDoAn,callBack:()=>void)=>{
    let taiKhoan= localStorage.getItem('taiKhoan')|| '';
    const result= await edit(URL.QLDOAN.QUANLYDETAI.UPDATE(taiKhoan),value,true,false,callBack) as AxiosResponse<any>;
    CustomNotification({ result: result.data });
}