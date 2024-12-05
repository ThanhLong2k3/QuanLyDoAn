import React from 'react';
import { notification } from 'antd';
import { ArgsProps } from 'antd/es/notification';

interface CustomNotificationProps {
  result: any;
  successMessage?: string;
  errorMessage?: string;
  quyenMessage?:string;
}

export const CustomNotification: React.FC<CustomNotificationProps> = ({
  result,
  successMessage = 'Thao tác thành công',
  errorMessage = 'Thao tác thất bại',
  quyenMessage='Bạn không có quyền thực hiện tác vụ'
}) => {
  const notificationConfig: ArgsProps = {
    message: 'Thông báo',
    duration: 3,
    style: {
      width: '100px',
      height: '80px'
    },
    placement: 'topRight'
  };

  if (result === 1) {
    notification.success({
      ...notificationConfig,
      message: 'Thông báo',
      description: successMessage
    });
  }
  if (result === 2) {
    notification.success({
      ...notificationConfig,
      message: 'Thông báo',
      description: quyenMessage
    });
  } 
  else {
    notification.error({
      ...notificationConfig,
      message: 'Lỗi',
      description: errorMessage
    });
  }

  return null;
};

export default CustomNotification;