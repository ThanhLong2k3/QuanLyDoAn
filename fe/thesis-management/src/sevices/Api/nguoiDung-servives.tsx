import axios from "axios";
import {URL} from "../../sevices/Url"
import { NguoiDung } from "../../components/InterFace";
import { message } from "antd";
export const getall=async()=>{
    let data=await axios.get(URL.QLHETHONG.QLNGUOIDUNG.GETALL);
    if(data)
    {
        return data.data;
    }
    else{
        throw new Error("Lỗi kết nối đến server !");
    }
}

export const add=async (giatri:NguoiDung, callBack:()=> void)=>{
   try{
        await axios.post(URL.QLHETHONG.QLNGUOIDUNG.ADD,giatri);
        message.success("Thêm dữ liệu thành công !");
        callBack();
   }
   catch(error){
        message.error("Thêm dữ liệu thất bại !");
        throw error;
   }
   
}

export const edit=async (giatri:NguoiDung, callBack:()=> void)=>{
    try{
        await axios.post(URL.QLHETHONG.QLNGUOIDUNG.UPDATE,giatri);
        callBack();
    }
    catch(error){
        message.error("Cập nhật dữ liệu thất bại !");
        throw error;
    }
}
