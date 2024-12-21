import { AxiosResponse } from "axios";
import {getall,add,edit,add_url} from "../../API-servives"
import {URL} from "../../../Url"
import {CustomNotification} from "../../../../components/UI/notification"


export const get_dettai_madot_or_ten =async (maDot?:string,tenDeTai?:string) =>{
    let url=`${URL.QLDOAN.QUANLYDETAI.SEARCH_DETAI}`
    if (maDot) url += `maDot=${encodeURIComponent(maDot)}&`;
    if (tenDeTai) url += `tenDeTai=${encodeURIComponent(tenDeTai)}&`;
    url = url.slice(-1) === '&' ? url.slice(0, -1) : url;
    return await getall(url);
}

export const add_DeTaiDoAn_GV= async(value:{},callBack:()=>void)=>{
      let taiKhoan= localStorage.getItem('taiKhoan')|| '';
      const result= await add(URL.QLDOAN.QUANLYDETAI.ADD_DT_GV(taiKhoan),value,true,false,callBack)as AxiosResponse<any>;
      CustomNotification({ result: result.data });
}

export const edit_DeTaiDoAn_GV= async(value:{},callBack:()=>void)=>{
    let taiKhoan= localStorage.getItem('taiKhoan')|| '';
    const result= await edit(URL.QLDOAN.QUANLYDETAI.UPDATE_DT_GV(taiKhoan),value,true,false,callBack) as AxiosResponse<any>;
    CustomNotification({ result: result.data });
}







export const Get_MaDot_TK =async () =>{
    let taiKhoan= localStorage.getItem('taiKhoan')|| '';
    let kq= await getall(URL.QLDOAN.QL_DOTDOAN.DOT_SINHVIEN.GET_DOT_TK(taiKhoan));
    return kq;
}

export const DeXuatDeTai= async(value:{},callBack:()=>void)=>{
    let taiKhoan= localStorage.getItem('taiKhoan')|| '';
    const result= await add(URL.QLDOAN.QUANLYDETAI.DEXUATDETAI(taiKhoan),value,true,false,callBack)as AxiosResponse<any>;
    CustomNotification({ result: result.data });
}


export const DangKyDeTai_SV= async(maDeTai:string,maSinhVien:string,callBack:()=>void)=>{
    let taiKhoan= localStorage.getItem('taiKhoan')|| '';
    const result= await add_url(URL.QLDOAN.QUANLYDETAI.DANGKYDETAI(maDeTai,maSinhVien,taiKhoan),true,false,callBack)as AxiosResponse<any>;
    CustomNotification({ result: result.data });
}


export const get_detai_madot_sv =async (maDot:string) =>{
    let kq= await getall(URL.QLDOAN.QUANLYDETAI.GET_DETAI_MADOT_SV(maDot));
    return kq;
}