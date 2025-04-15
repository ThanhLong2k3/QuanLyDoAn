import  { AxiosResponse } from "axios";
import {getall,add,Delete,edit} from "../API-servives"
import {URL} from "../../Url"
import {GiangVien} from "../../../components/InterFace"
import {CustomNotification} from "../../../components/UI/notification"

export const getAll =async () =>{
    return await getall(URL.QLDOAN.QL_GIANGVIEN.GETALL);
}

export const addGiangVien= async(value:GiangVien,callBack:()=>void)=>{
      let taiKhoan= localStorage.getItem('taiKhoan')|| '';
      const result= await add(URL.QLDOAN.QL_GIANGVIEN.ADD(taiKhoan),value,true,false,callBack)as AxiosResponse<any>; 
      CustomNotification({ result: result.data });
}
export const delGiangVien=async(maGiangVien:string,callBack:()=>void)=>{
    let taiKhoan= localStorage.getItem('taiKhoan')|| '';
    const result= await Delete(URL.QLDOAN.QL_GIANGVIEN.DELETE(taiKhoan,maGiangVien),true,false,callBack) as AxiosResponse<any>;  
    CustomNotification({ result: result.data });
}
export const editGiangVien= async(value:GiangVien,callBack:()=>void)=>{
    let taiKhoan= localStorage.getItem('taiKhoan')|| '';
    const result= await edit(URL.QLDOAN.QL_GIANGVIEN.UPDATE(taiKhoan),value,true,false,callBack) as AxiosResponse<any>;
    CustomNotification({ result: result.data });
}



export const Search=async(tenGiangVien?:string,maBoMon?:string,maChucVu?:string)=>
    {
        let url=URL.QLDOAN.QL_GIANGVIEN.SEARCH;
        const params = new URLSearchParams();
      
        if (tenGiangVien) params.append("tenGiangVien", tenGiangVien);
        if (maBoMon) params.append("maBoMon", maBoMon);
        if (maChucVu) params.append("maChucVu", maChucVu);
        
        url += `?${params.toString()}`;
        return await getall(url);
    }