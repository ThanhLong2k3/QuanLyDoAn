import axios from "axios";
import { message } from "antd";
export const getall=async(url:string)=>{
    let data=await axios.get(url);
    if(data)
    {
        return data.data;
    }
    else{
        throw new Error("Lỗi kết nối đến server !");
    }
}

export const add=async (url:string,giatri:{}, callBack:()=> void)=>{
    try{
         let kq= await axios.post(url,giatri);
         callBack();
         return kq;
    }
    catch(error){
         message.error("Thêm dữ liệu thất bại !");
         throw error;
    }
    
 }
 export const Delete=async (url:string, callBack:()=> void)=>{
    try{
        let kq= await axios.delete(url);
        callBack();
        return kq;
    }
    catch(error){
        message.error("Cập nhật dữ liệu thất bại !");
        throw error;
    }
}
export const edit=async (url:string,giatri:{}, callBack:()=> void)=>{
    try{
        let kq= await axios.post(url,giatri);
        callBack();
        return kq;
    }
    catch(error){
        message.error("Cập nhật dữ liệu thất bại !");
        throw error;
    }
}