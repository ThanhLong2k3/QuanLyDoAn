import {getall,add,Delete,edit} from "../Api/API-servives"
import {URL} from "../Url"
import {GiangVien} from "../../components/InterFace"
var taiKhoan= localStorage.getItem('taiKhoan')|| '';
export const getAll =async () =>{
    return await getall(URL.QLDOAN.QL_GIANGVIEN.GETALL);
}

export const addGiangVien= async(value:GiangVien,callBack:()=>void)=>{
      return await add(URL.QLDOAN.QL_GIANGVIEN.ADD(taiKhoan),value,callBack); 
}
export const delGiangVien=async(maGiangVien:string,callBack:()=>void)=>{
    return await Delete(URL.QLDOAN.QL_GIANGVIEN.DELETE(taiKhoan,maGiangVien),callBack);   
}
export const editGiangVien= async(value:GiangVien,callBack:()=>void)=>{
    debugger;
    return await edit(URL.QLDOAN.QL_GIANGVIEN.UPDATE(taiKhoan),value,callBack);
}