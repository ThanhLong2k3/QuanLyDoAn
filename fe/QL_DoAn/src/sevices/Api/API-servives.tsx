import axios, { AxiosResponse } from "axios";

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

export const add=async (url:string,giatri:{}, returnRespones:boolean,showMess:boolean,callBack?:()=> void): Promise<AxiosResponse<any> | void> =>{
    try{
         let kq= await axios.post(url,giatri);
         if(showMess)
         {
            message.success("Thêm dữ liệu thành công !");
         }
         if(callBack)
         {
            callBack();
         }
         if(returnRespones)
         {
            return kq;
         }
    }
    catch(error){
         message.error("Thêm dữ liệu thất bại !");
         throw error;
    }
    
 }
 export const Delete=async (url:string,returnRespones:boolean,showMess:boolean,callBack?:()=> void): Promise<AxiosResponse<any> | void> =>{
    try{
        let kq= await axios.delete(url);
        if(showMess)
            {
               message.success("Thêm dữ liệu thành công !");
            }
            if(callBack)
            {
               callBack();
            }
            if(returnRespones)
            {
               return kq;
            }
    }
    catch(error){
        message.error("Cập nhật dữ liệu thất bại !");
        throw error;
    }
}
export const edit=async (url:string,giatri:{}, returnRespones:boolean,showMess:boolean,callBack?:()=> void): Promise<AxiosResponse<any> | void> =>{
    try{
        let kq= await axios.post(url,giatri); if(showMess)
            {
               message.success("Thêm dữ liệu thành công !");
            }
            if(callBack)
            {
               callBack();
            }
            if(returnRespones)
            {
               return kq;
            }
    }
    catch(error){
        message.error("Cập nhật dữ liệu thất bại !");
        throw error;
    }
}
export const Delete_obj=async (url:string, giatri:{})=>{
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