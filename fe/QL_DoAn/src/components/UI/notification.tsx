import React from 'react';
import { notification } from 'antd';
import { ArgsProps } from 'antd/es/notification';
import { App } from 'antd';
interface CustomNotificationProps {
  result: any;
  MessageDone?: string;
  MessageError?: string;
  KhongCoQuyen?:string;
  MaDaTonTai?:string;
  TruongBoMon?:string;
  ERRORIN?:string;
}

export const CustomNotification: React.FC<CustomNotificationProps> = ({
  result,
  MessageDone = 'Thao tác thành công',
  MessageError = 'Thao tác thất bại',
  MaDaTonTai='Mã đã tồn tại',
  KhongCoQuyen='Bạn không có quyền thực hiện tác vụ',
  TruongBoMon='Trưởng bộ môn không cho phép sửa đề tài',
  ERRORIN='Bạn đã đề xuất đề tài rồi!',
}) => {
  const notificationConfig: ArgsProps = {
    message: 'Thông báo',
    duration: 3,
    style: {
      width: '400px',
      height: 'auto'
    },
    placement: 'topRight'
  };
  debugger;
  if (result === 0) {
    notification.error({
      ...notificationConfig,
      message: 'Thông báo',
      description: KhongCoQuyen
    });
    return null;
  }
  if (result === 1) {
    notification.success({
      ...notificationConfig,
      message: 'Thông báo',
      description: MessageDone
    });
    return null;
  }
  if (result === 2) {
    notification.error({
      ...notificationConfig,
      message: 'Thông báo',
      description: MaDaTonTai
    });
    return null;
  } 
  if (result === 3) {
    notification.error({
      ...notificationConfig,
      message: 'Thông báo',
      description: TruongBoMon
    });
    return null;
  } 
  if (result === 4) {
    notification.error({
      ...notificationConfig,
      message: 'Thông báo',
      description: "Sinh viên đang trong đợt Nghiên cứu Khoa Học khác!"
    });
    return null;
  } 
  if (result === 5) {
    notification.error({
      ...notificationConfig,
      message: 'Thông báo',
      description: ERRORIN
    });
    return null;
  } 
 
    notification.error({
      ...notificationConfig,
      message: 'Lỗi',
      description: MessageError
    });
  

  return null;
};

export default CustomNotification;