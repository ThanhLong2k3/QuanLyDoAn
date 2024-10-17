import {getall,add,Delete,edit} from "../Api/API-servives"
import {URL} from "../Url"
import {SinhVien} from "../../components/InterFace"
var taiKhoan= localStorage.getItem('taiKhoan')|| '';
export const getAll =async () =>{
    return await getall(URL.QLDOAN.QL_SINHVIEN.GETALL);
}

export const addSinhVien= async(value:SinhVien,callBack:()=>void)=>{
      return await add(URL.QLDOAN.QL_SINHVIEN.ADD(taiKhoan),value,callBack); 
}
export const delSinhVien=async(maLop:string,callBack:()=>void)=>{
    return await Delete(URL.QLDOAN.QL_SINHVIEN.DELETE(taiKhoan,maLop),callBack);   
}
export const editSinhVien= async(value:SinhVien,callBack:()=>void)=>{
    return await edit(URL.QLDOAN.QL_SINHVIEN.UPDATE(taiKhoan),value,callBack);
}