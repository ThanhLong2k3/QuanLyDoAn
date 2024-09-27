import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Style_Login.css";
import ROUTERS from "../../router/Part";


interface Account {
  masv: string;
  password: string;
  userType: string;
}

const Login: React.FC = () => {
  const [account, setAccount] = useState<Account>({
    masv: "",
    password: "",
    userType: "",
  });
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý đăng nhập
    console.log(account);
    if (account.masv === '1' && account.password === '1') {
      localStorage.setItem("user", account.userType);
      if (account.userType === "1") {
        navigate(ROUTERS.HOME.DEFAULT.PART);
      } 
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
                    <img src="./utehy-logo.png"  alt="Logo UTEHY" className="me-3" style={{ height: "50px", width: "50px" }} />
                    <div>
                        <h1 className="fs-3 fw-bold">UTEHY</h1>
                        <p className="fs-6">Đại học Sư phạm Kỹ thuật Hưng Yên</p>
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
          <Form.Group controlId="userType" className="mb-3">
                <Form.Label>Loại tài khoản</Form.Label>
                <Form.Select
                  name="userType"
                  value={account.userType}
                  onChange={(e)=>handleChange("userType",e.target.value)}
                  required
                >
                  <option value="">Chọn loại tài khoản</option>
                  <option value="1">Giáo vụ khoa</option>
                  <option value="2">Trưởng bộ môn</option>
                  <option value="3">Giảng viên</option>
                  <option value="4">Sinh viên</option>
                </Form.Select>
              </Form.Group>
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="masv" className="mb-3">
                <Form.Label>Mã Sinh Viên</Form.Label>
                <Form.Control
                  type="masv"
                  name="masv"
                  placeholder="Mã sinh viên"
                  value={account.masv}
                  onChange={(e)=>handleChange("masv",e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={account.password}
                  onChange={(e)=>handleChange("password",e.target.value)}
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
