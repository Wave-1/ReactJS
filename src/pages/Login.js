import React, { useEffect, useState } from 'react';
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { toast } from 'react-toastify';
import{useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../css/Login.css';
import jwtDecode from 'jwt-decode'; 
import { API_BASE_URL, API_ROUTES } from '../apiConfig'; 
const Login = () => {
    const [employeeCode, setEmployeeCode] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    useEffect(() => {
      sessionStorage.clear();
    },[]);
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
          try {
            const response = await axios.post(API_BASE_URL + API_ROUTES.LOGIN, { employeeCode, password });
            const responseData = response.data;
            console.log(responseData);
      
            if (responseData.success) {
                // Lưu token vào localStorage
                localStorage.setItem('token', responseData.data);

                // Giải mã token để lấy thông tin role
                const decodedToken = jwtDecode(responseData.data);
                console.log(decodedToken);
                const role = decodedToken.role;
                const employeeName = decodedToken.EmployeeName;
                // Kiểm tra role và chuyển hướng vào trang tương ứng
                if (role === "Admin") {
                  toast.success('Logged in successfully (Admin)');
                  sessionStorage.setItem('EmployeeCode', employeeCode);
                  sessionStorage.setItem('userRole', 'Admin');
                  navigate('/admin');
                } else {
                  toast.success('Logged in successfully');
                  sessionStorage.setItem('EmployeeCode', employeeCode);
                  sessionStorage.setItem('EmployeeName', employeeName);
                  sessionStorage.setItem('userRole', 'User');
                  navigate('/user');
                }
            }else{
                toast.error('Incorrect account or password !!!');
            }
          } catch (err) {
            toast.error('Incorrect account or password !!!');
            console.error(err);
          }
        }
      };
  
      const validate = () =>{
        let result = true;
        if(employeeCode === "" || employeeCode === null){
            result = false;
            toast.warning("Vui lòng nhập tên");
        }
        if(password === "" || password === null){
            result = false;
            toast.warning("Vui lòng nhập mật khẩu");
        }
        return result;
    }
  
  
    return (
      <Container fluid className='login'>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={5} xs={12}>
            <h1 className='text-center mb-5'>Acacia</h1>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-5 text-center">Login</h2>
                  <div className="mb-3">
                    <Form 
                    onSubmit={handleSubmit}
                    >
                      <Form.Group className="mb-5" controlId="formBasicEmail">
                        <Form.Control
                          placeholder="EmployeeCode"
                          className='rounded'
                          value={employeeCode}
                          onChange={(e) => setEmployeeCode(e.target.value)}
                        />
                      </Form.Group>
  
                      <Form.Group className="mb-5" controlId="formBasicPassword">
                        <Form.Control
                          type="Password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit" className='bg-black'>
                          Login
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };

export default Login;
