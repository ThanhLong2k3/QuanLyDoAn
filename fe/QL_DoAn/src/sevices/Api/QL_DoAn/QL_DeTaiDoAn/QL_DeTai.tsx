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
    CustomNotification({ result: result.data ,ERRORIN:'Bạn đã đề xuất đề tài rồi!'});
}


export const DangKyDeTai_SV= async(maDeTai:string,maSinhVien:string,callBack:()=>void)=>{
    let taiKhoan= localStorage.getItem('taiKhoan')|| '';
    const result= await add_url(URL.QLDOAN.QUANLYDETAI.DANGKYDETAI(maDeTai,maSinhVien,taiKhoan),true,false,callBack)as AxiosResponse<any>;
    CustomNotification({ result: result.data ,TruongBoMon:"Trưởng bộ môn không cho phép đăng ký đề tài",ERRORIN:'Bạn đã đăng ký đề tài rồi!'});
}


export const get_detai_madot_sv =async (maDot:string) =>{
    let kq= await getall(URL.QLDOAN.QUANLYDETAI.GET_DETAI_MADOT_SV(maDot));
    return kq;
}


// GIẢNG VIÊN SÁC NHẬN ĐỀ TÀI SINH VIÊN ĐĂNG KÝ

export const Get_DeTaiSinhVien_MaDot =async (MaDot:string) =>{
    let kq= await getall(URL.QLDOAN.QUANLYDETAI.GIANGVIENXACNHANDETAI.GET_DETAISINHVIEN_MADOT(MaDot));
    return kq;
}

export const GIANGVIEN_XACNHANDETAI= async(value:{},callBack:()=>void)=>{
    let taiKhoan= localStorage.getItem('taiKhoan')|| '';
    const result= await edit(URL.QLDOAN.QUANLYDETAI.GIANGVIENXACNHANDETAI.GIANGVIEN_XACNHANDETAI(taiKhoan),value,true,false,callBack) as AxiosResponse<any>;
    CustomNotification({ result: result.data,MessageDone:'Xác nhận đề tài thành công!' });
}



export const GIANGVIEN_TUCHOIDETAI= async(value:{},callBack:()=>void)=>{
    let taiKhoan= localStorage.getItem('taiKhoan')|| '';
    const result= await edit(URL.QLDOAN.QUANLYDETAI.GIANGVIENXACNHANDETAI.GIANGVIEN_TUCHOIDETAI(taiKhoan),value,true,false,callBack) as AxiosResponse<any>;
    CustomNotification({ result: result.data,MessageDone:'Đã từ chối đề tài!' });
}


// =====================================================TBM XÁC NHẬN ĐỀ TÀI

export const TBM_Get_DeTaiSinhVien_MaDot =async (MaDot:string) =>{
    let kq= await getall(URL.QLDOAN.QUANLYDETAI.TBMXACNHANDETAI.GET_DETAISINHVIEN_MADOT(MaDot));
    return kq;
}

export const TBM_XACNHANDETAI= async(value:{},callBack:()=>void)=>{
    let taiKhoan= localStorage.getItem('taiKhoan')|| '';
    const result= await edit(URL.QLDOAN.QUANLYDETAI.TBMXACNHANDETAI.TBM_XACNHANDETAI(taiKhoan),value,true,false,callBack) as AxiosResponse<any>;
    CustomNotification({ result: result.data,MessageDone:'Xác nhận đề tài thành công!' });
}



export const TBM_TUCHOIDETAI= async(value:{},callBack:()=>void)=>{
    let taiKhoan= localStorage.getItem('taiKhoan')|| '';
    const result= await edit(URL.QLDOAN.QUANLYDETAI.TBMXACNHANDETAI.TBM_TUCHOIDETAI(taiKhoan),value,true,false,callBack) as AxiosResponse<any>;
    CustomNotification({ result: result.data,MessageDone:'Đã từ chối đề tài!' });
}

