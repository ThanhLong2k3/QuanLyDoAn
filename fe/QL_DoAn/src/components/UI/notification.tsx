import React from 'react';
import { notification } from 'antd';
import { ArgsProps } from 'antd/es/notification';
import { App } from 'antd';
interface CustomNotificationProps {
  result: any;
  successMessage?: string;
  errorMessage?: string;
  quyenMessage?:string;
  inerrorMessage?:string
}

export const CustomNotification: React.FC<CustomNotificationProps> = ({
  result,
  successMessage = 'Thao tác thành công',
  errorMessage = 'Thao tác thất bại',
  inerrorMessage='Mã đã tồn tại',
  quyenMessage='Bạn không có quyền thực hiện tác vụ'
}) => {
  const notificationConfig: ArgsProps = {
    message: 'Thông báo',
    duration: 3,
    style: {
      width: '300px',
      height: '80px'
    },
    placement: 'topRight'
  };
  debugger;
  if (result === 0) {
    notification.error({
      ...notificationConfig,
      message: 'Thông báo',
      description: quyenMessage
    });
    return null;
  }
  if (result === 1) {
    notification.success({
      ...notificationConfig,
      message: 'Thông báo',
      description: successMessage
    });
    return null;
  }
  if (result === 2) {
    notification.error({
      ...notificationConfig,
      message: 'Thông báo',
      description: inerrorMessage
    });
    return null;
  } 
  if (result === 3) {
    notification.error({
      ...notificationConfig,
      message: 'Thông báo',
      description: "Trưởng bộ môn không cho phép sửa đề tài"
    });
    return null;
  } 
 
    notification.error({
      ...notificationConfig,
      message: 'Lỗi',
      description: errorMessage
    });
  

  return null;
};

export default CustomNotification;