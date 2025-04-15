import  { AxiosResponse } from "axios";
import {getall,add,Delete_obj, Delete} from "../../API-servives"
import {URL} from "../../../Url"
import {CustomNotification} from "../../../../components/UI/notification"
import { v4 as uuidv4 } from 'uuid';

export const get_GROUP_ID =async (isTruongNhom:number) =>{
    var taiKhoan= localStorage.getItem('taiKhoan')|| '';
    return await getall(URL.QLDOAN.QL_NHOMSINHVIEN.TAONHOM.GET_NHOM_MASV(taiKhoan,isTruongNhom));
}
export const get_GROUP_MaDot =async (isTruongNhom:number,maDot:string) =>{
    var taiKhoan= localStorage.getItem('taiKhoan')|| '';
    return await getall(URL.QLDOAN.QL_NHOMSINHVIEN.TAONHOM.GET_NHOM_MASV(undefined,isTruongNhom,maDot,taiKhoan));
}
export const add_GROUP = async (value: any, callBack: () => void) => {
    const taiKhoan = localStorage.getItem('taiKhoan') || '';
    const maNhom = uuidv4(); // Tạo mã nhóm ngẫu nhiên

    const data = {
        maNhom,
        tenNhom: value.tenNhom,
        maSinhVienTruong: taiKhoan
    };

    const result = await add(URL.QLDOAN.QL_NHOMSINHVIEN.TAONHOM.ADD_NHOM, data, true, false, callBack) as AxiosResponse<any>;
    CustomNotification({ result: result.data });
};
export const delete_Group=async (manhom:string,callBack:()=>void)=>{
    const taiKhoan = localStorage.getItem('taiKhoan') || '';
    const result=await Delete(URL.QLDOAN.QL_NHOMSINHVIEN.TAONHOM.DELETE(manhom,taiKhoan),true,false,callBack)as AxiosResponse<any>;
    CustomNotification({ result: result.data });
}
export const get_MemberGROUP_ID =async (ID_GROUP:string) =>{
    return await getall(URL.QLDOAN.QL_NHOMSINHVIEN.THANHVIEN.GET_ID(ID_GROUP));
}

export const add_Member_Group= async(value:any)=>{
    debugger
    var taiKhoan= localStorage.getItem('taiKhoan')|| '';
    const data={
        maNhom: value.maNhom,
        maSinhVienMoi: value.maSinhVien ,
        maNguoiMoi: taiKhoan
      }
    const result= await add(URL.QLDOAN.QL_NHOMSINHVIEN.THEMTHANHVIEN.GUILOIMOI,data,true,false)as AxiosResponse<any>; 
    debugger

    CustomNotification({ result: result.data });
}

export const del_Member_Group=async(value:any,callBack:()=>void)=>{
    var taiKhoan= localStorage.getItem('taiKhoan')|| '';
   await Delete_obj(URL.QLDOAN.QL_NHOMSINHVIEN.THANHVIEN.DELETE(taiKhoan),value);   
   callBack();
}

export const get_LoiMoi_Id =async () =>{
    var taiKhoan= localStorage.getItem('taiKhoan')|| '';
    return await getall(URL.QLDOAN.QL_NHOMSINHVIEN.LOIMOI.GET_LOIMOI_ID(taiKhoan));
}


export const XuLyLoiMoi= async(traloi:number,value:any,callBack:()=>void)=>{
    debugger;
    var taiKhoan= localStorage.getItem('taiKhoan')|| '';
    const data={
        maLoiMoi: value.maLoiMoi,
        maSinhVien: taiKhoan,
        traLoi: traloi
      }
    const result= await add(URL.QLDOAN.QL_NHOMSINHVIEN.LOIMOI.XU_LY_LOI_MOI,data,true,false,callBack)as AxiosResponse<any>; 
    CustomNotification({ result: result.data });
}