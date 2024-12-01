import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Style_Login.css";
import ROUTERS from "../../router/Path";
import {dangNhap,getAllQuyen_TaiKhoan} from "../../sevices/Api/QL_HeThong/QL_NguoiDung"
interface Account {
  taiKhoan: string;
  matKhau: string;
}

const Login: React.FC = () => {
  const [account, setAccount] = useState<Account>({
    taiKhoan: "",
    matKhau: "",
  });
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        let login = await dangNhap(account);
        debugger
        if (login.data && login.data !== 0) {
            localStorage.setItem('taiKhoan', account.taiKhoan);

            const listQuyen = await getAllQuyen_TaiKhoan(account.taiKhoan);

            if (Array.isArray(listQuyen) && listQuyen.length > 0) {
                const maQuyenArray = listQuyen.map(item => item.maQuyen);
                
                const existingPermissions = JSON.parse(localStorage.getItem('ListQuyen') || '[]');
                
                const updatedPermissions = Array.from(new Set([...existingPermissions, ...maQuyenArray]));

                localStorage.setItem('ListQuyen', JSON.stringify(updatedPermissions));

                navigate(ROUTERS.HOME.DEFAULT.PATH);
            } else {
                alert("Không có quyền nào được gán cho tài khoản này!");
            }
        } else {
            alert("Tài khoản không có quyền truy cập hoặc không tồn tại!");
        }
    } catch (error: any) {
        console.error("Login error:", error.message || error);
        alert("Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.");
    }
};


  const handleChange = (name: string, value: string) => {
    setAccount((prevAccount) => ({
      ...prevAccount,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="d-flex flex-column  bg-light">
        <header className="bg-primary text-white shadow-lg">
          <div className="container px-4 py-3 d-flex align-items-center justify-content-center">
            <img src="./utehy-logo.png" alt="Logo UTEHY" className="me-3" style={{ height: "80px", width: "80px" }} />
            <div>
              <h1 className="fs-3 fw-bold">UTEHY</h1>
              <p className="fs-6">ĐẠI HỌC SƯ PHẠM KỸ THUẬT HƯNG YÊN</p>
            </div>
          </div>
        </header>
      </div>
      <div className="d-flex flex-grow-1 justify-content-center align-items-center py-4  heigh_login" >
        <Card
          className="w-100"
          style={{ maxWidth: "400px", borderTop: "4px solid #003366" }}
        >
          <Card.Header>
            <h2
              className="text-center text-primary"
              style={{ color: "#003366" }}
            >
              Đăng nhập
            </h2>
            <p className="text-center">
              Truy cập Hệ thống Quản lý Đồ Án UTEHY
            </p>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="taiKhoan" className="mb-3">
                <Form.Label>Mã Sinh Viên</Form.Label>
                <Form.Control
                  type="taiKhoan"
                  name="taiKhoan"
                  placeholder="Mã sinh viên"
                  value={account.taiKhoan}
                  onChange={(e) => handleChange("taiKhoan", e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="matKhau" className="mb-3">
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  name="matKhau"
                  value={account.matKhau}
                  onChange={(e) => handleChange("matKhau", e.target.value)}
                  required
                />
              </Form.Group>
             
              <Button
                type="submit"
                variant="primary"
                className="w-100"
                style={{ backgroundColor: "#003366", borderColor: "#003366" }}
              >
                Đăng nhập
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
      <footer className="bg-primary text-white">
        <div className="container text-center py-3">
          <p>&copy; Đại học Sư phạm Kỹ thuật Hưng Yên. Bảo lưu mọi quyền.</p>
        </div>
      </footer>  
    </>
  );
};

export default Login;