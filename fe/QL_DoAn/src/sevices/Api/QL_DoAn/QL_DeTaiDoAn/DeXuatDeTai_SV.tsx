import axios from "axios";
import {getall,add,edit} from "../../API-servives"
import {URL} from "../../../Url"
import {CustomNotification} from "../../../../components/UI/notification"

var taiKhoan= localStorage.getItem('taiKhoan')|| '';
export const GetAll_MaDot_TK =async () =>{
    let kq= await axios.get(URL.QLDOAN.QL_DOTDOAN.DOT_SINHVIEN.GET_DOT_TK(taiKhoan));
    return kq.data;
}