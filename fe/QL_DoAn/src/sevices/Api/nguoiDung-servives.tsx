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
        await axios.post(url,giatri);
        message.success("Thêm dữ liệu thành công !");
        callBack();
   }
   catch(error){
        message.error("Thêm dữ liệu thất bại !");
        throw error;
   }
   
}

export const edit=async (url:string,giatri:{}, callBack:()=> void)=>{
    try{
        await axios.post(url,giatri);
        callBack();
    }
    catch(error){
        message.error("Cập nhật dữ liệu thất bại !");
        throw error;
    }
}

export const Delete=async (url:string, callBack:()=> void)=>{
    try{
        await axios.delete(url);
        callBack();
    }
    catch(error){
        message.error("Cập nhật dữ liệu thất bại !");
        throw error;
    }
}

export const add_Quyen=async (url:string,giatri:{})=>{
    try{
         await axios.post(url,giatri);
    }
    catch(error){
         message.error("Thêm dữ liệu thất bại !");
         throw error;
    }
    
 }
 
export const Delete_Quyen=async (url:string, giatri:{})=>{
    try{
        await axios.delete(url,{
            headers: {
                'Content-Type': 'application/json',  
                'Authorization': 'Bearer <token>',  
                'Accept': 'application/json'
              },
              data: giatri 
            })
    }
    catch(error){
        message.error("Xóa dữ liệu thất bại !");
        throw error;
    }
}