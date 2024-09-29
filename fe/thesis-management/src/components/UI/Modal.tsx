import { Modal } from 'antd';
import React from 'react';

interface ReusableModalProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  keyDangSua: number | null;
  children: React.ReactNode;
    // Nhận form dưới dạng children
    add_Titel:string;
    update_Titel:string;
}

const ReusableModal: React.FC<ReusableModalProps> = ({ visible, onOk, onCancel, keyDangSua, children,update_Titel,add_Titel }) => {
  return (
    <Modal
      title={keyDangSua !== null ? update_Titel : add_Titel}
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
    >
      {children} {/* Hiển thị form được truyền vào */}
    </Modal>
  );
};

export default ReusableModal;