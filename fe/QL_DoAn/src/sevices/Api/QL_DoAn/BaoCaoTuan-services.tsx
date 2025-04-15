import  { AxiosResponse } from "axios";
import {getall,add,edit} from "../API-servives"
import {URL} from "../../Url"
import {BAO_CAO_TUAN} from "../../../components/InterFace";
import {CustomNotification} from "../../../components/UI/notification"

export const get_BaoCao_MaDeTai =async (MaDeTai:string) =>{
    return await getall(URL.QLDOAN.BAO_CAO_TUAN.GET_BAOCAOTUAN_MADETAI(MaDeTai));
}

export const addBaoCaoTuan= async(value:BAO_CAO_TUAN,callBack:()=>void)=>{
      const result= await add(URL.QLDOAN.BAO_CAO_TUAN.ADD_BAOCAO,value,true,false,callBack)as AxiosResponse<any>; 
      CustomNotification({ result: result.data, KhongCoQuyen:"Tuần này đã báo cáo rồi !" });
}

export const editBaoCaoTuan= async(value:BAO_CAO_TUAN,callBack:()=>void)=>{
    const result= await edit(URL.QLDOAN.BAO_CAO_TUAN.UPDATE_BAOCAO,value,true,false,callBack)as AxiosResponse<any>;
    CustomNotification({ result: result.data });
}