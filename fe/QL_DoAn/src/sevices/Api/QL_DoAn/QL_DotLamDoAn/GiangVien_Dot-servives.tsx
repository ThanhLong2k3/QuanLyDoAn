import {getall,add,Delete,edit} from "../../API-servives"
import {URL} from "../../../Url"

export const getAll_GiangVien_HD =async () =>{
    return await getall(URL.QLDOAN.QL_DOTDOAN.DOT_GIANGVIEN.GETALL_GV_HD);
}
export const getGiangVien_maDot =async (maDot:string ) =>{
    return await getall(URL.QLDOAN.QL_DOTDOAN.DOT_GIANGVIEN.GET_GV_MADOT(maDot));
}

export const add_GiangVien_DotLamDoAn= async(value:{})=>{
     await add(URL.QLDOAN.QL_DOTDOAN.DOT_GIANGVIEN.CREATE_DOT_GV,value,false,false); 
}
export const del_GiangVien_DotDoAn=async(maDot:string,maGiangVien:string)=>{
     await Delete(URL.QLDOAN.QL_DOTDOAN.DOT_GIANGVIEN.DEL_GV_DOT(maDot,maGiangVien),true,false);  
}
export const Up_SLHuongDan= async(value:{})=>{
     await edit(URL.QLDOAN.QL_DOTDOAN.DOT_GIANGVIEN.UP_DOT_GV,value,false,false) ;
}