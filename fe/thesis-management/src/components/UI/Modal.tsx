import React from 'react';
import { Modal, Typography } from 'antd';

const { Title } = Typography;

interface ReusableModalProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  keyDangSua: number | null;
  children: React.ReactNode;
  add_Titel: string;
  update_Titel: string;
}

const ReusableModal: React.FC<ReusableModalProps> = ({
  visible,
  onOk,
  onCancel,
  keyDangSua,
  children,
  update_Titel,
  add_Titel
}) => {
  return (
    <Modal
      title={
        <Title level={4} style={{ margin: 0, color: '#1e88e5' }}>
          {keyDangSua !== null ? update_Titel : add_Titel}
        </Title>
      }
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      width={800}
    >
      {children}
    </Modal>
  );
};

export default ReusableModal;