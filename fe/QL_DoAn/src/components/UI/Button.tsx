import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface ButtonADDProps {
  hienThiModal: () => void;
  TEXT: string;
}

export const ButtomADD: React.FC<ButtonADDProps> = ({ hienThiModal, TEXT }) => {
  return (
    <Button type="primary" onClick={hienThiModal} icon={<PlusOutlined />}>
      {TEXT}
    </Button>
  );
};
