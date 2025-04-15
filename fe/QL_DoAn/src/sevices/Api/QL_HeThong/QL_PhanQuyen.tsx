import {getall,add,Delete_obj} from "../API-servives"

import {URL} from "../../Url"
import {NhomQuyen_PhanQuyen} from "../../../components/InterFace"

export const getAll_PhanQUyen =async () =>{
    return await getall(URL.QLHETHONG.PHANQUYEN.GETALL);
}
export const getByMaNhomQuyen =async (ma:string ) =>{
    return await getall(URL.QLHETHONG.PHANQUYEN.GETBYMANHOMQUYEN(ma));
}
export const addNhomQuyen_PhanQuyen= async(value:NhomQuyen_PhanQuyen)=>{
    return await add(URL.QLHETHONG.NHOMQUYENPHANQUYEN.ADD,value,true,false,undefined); 
}


//
export const delNhomQuyen_PhanQuyen=async(value:{})=>{
    return await Delete_obj(URL.QLHETHONG.NHOMQUYENPHANQUYEN.DELETE, value);
}