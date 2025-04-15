import  { AxiosResponse } from "axios";
import {getall,add,Delete,edit} from "../API-servives"
import {URL} from "../../Url"
import {SinhVien} from "../../../components/InterFace";
import {CustomNotification} from "../../../components/UI/notification"

export const getall_SinhVien =async () =>{
    return await getall(URL.QLDOAN.QL_SINHVIEN.GETALL);
}
export const get_SinhVien_ID =async () =>{
    var taiKhoan= localStorage.getItem('taiKhoan')|| '';
    return await getall(URL.QLDOAN.QL_SINHVIEN.GET_BY_ID(taiKhoan));
}

export const addSinhVien= async(value:SinhVien,callBack:()=>void)=>{
    var taiKhoan= localStorage.getItem('taiKhoan')|| '';
      const result= await add(URL.QLDOAN.QL_SINHVIEN.ADD(taiKhoan),value,true,false,callBack)as AxiosResponse<any>; 
      CustomNotification({ result: result.data });
}
export const delSinhVien=async(maLop:string,callBack:()=>void)=>{
    var taiKhoan= localStorage.getItem('taiKhoan')|| '';
    const result= await Delete(URL.QLDOAN.QL_SINHVIEN.DELETE(taiKhoan,maLop),true,false,callBack)as AxiosResponse<any>;   
    CustomNotification({ result: result.data });
}
export const editSinhVien= async(value:SinhVien,callBack:()=>void)=>{
    var taiKhoan= localStorage.getItem('taiKhoan')|| '';
    const result= await edit(URL.QLDOAN.QL_SINHVIEN.UPDATE(taiKhoan),value,true,false,callBack)as AxiosResponse<any>;
    CustomNotification({ result: result.data });
}

export const Search=async(maSinhVien?:string,tenSinhVien?:string,maLop?:string,matrangThai?:number)=>
{
    let url=URL.QLDOAN.QL_SINHVIEN.SEARCH;
    const params = new URLSearchParams();
  
    if (maSinhVien) params.append("masinhvien", maSinhVien);
    if (tenSinhVien) params.append("tensinhvien", tenSinhVien);
    if (maLop) params.append("maLop", maLop);
    if (matrangThai !== undefined) params.append("matrangthai", matrangThai.toString());
    
    url += `?${params.toString()}`;
    return await getall(url);
}

export const editSinhVien_SinhVien= async(value:{},callBack:()=>void)=>{//THÔNG TIN SINH VIÊN
    console.log(value);
    const result= await edit(URL.QLDOAN.QL_SINHVIEN.UPDATE_SINHVIEN_SINHVIEN,value,true,false,callBack)as AxiosResponse<any>;
    CustomNotification({ result: result.data });
}