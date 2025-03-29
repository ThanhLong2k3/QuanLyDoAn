import  { AxiosResponse } from "axios";
import {getall,add,Delete_obj} from "../../API-servives"
import {URL} from "../../../Url"
import {CustomNotification} from "../../../../components/UI/notification"


export const get_GROUP_ID =async () =>{
    var taiKhoan= localStorage.getItem('taiKhoan')|| '';
    return await getall(URL.QLDOAN.QL_NHOMSINHVIEN.TAONHOM.GET_NHOM_MASV("12521136"));
}

export const add_GROUP= async(value:any,callBack:()=>void)=>{
    var taiKhoan= localStorage.getItem('taiKhoan')|| '';
    const data={
        maNhom: "string",
        tenNhom: value.tenNhom,
        maSinhVienTruong: "12521136"
      }
      const result= await add(URL.QLDOAN.QL_NHOMSINHVIEN.TAONHOM.ADD_NHOM,data,true,false,callBack)as AxiosResponse<any>; 
      CustomNotification({ result: result.data });
}

export const get_MemberGROUP_ID =async (ID_GROUP:string) =>{
    return await getall(URL.QLDOAN.QL_NHOMSINHVIEN.THANHVIEN.GET_ID(ID_GROUP));
}

export const add_Member_Group= async(value:any,callBack:()=>void)=>{
    var taiKhoan= localStorage.getItem('taiKhoan')|| '';
    const data={
        maNhom: value.maNhom,
        maSinhVienMoi: "12521136",
        maNguoiMoi: value.maSinhVien
      }
    const result= await add(URL.QLDOAN.QL_NHOMSINHVIEN.THEMTHANHVIEN.GUILOIMOI,data,true,false,callBack)as AxiosResponse<any>; 
    CustomNotification({ result: result.data });
}

export const del_Member_Group=async(value:any,callBack:()=>void)=>{
    var taiKhoan= localStorage.getItem('taiKhoan')|| '';
   await Delete_obj(URL.QLDOAN.QL_NHOMSINHVIEN.THANHVIEN.DELETE("12521136"),value);   
   callBack();
}

