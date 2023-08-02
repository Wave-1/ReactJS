import React, { useEffect, useState } from 'react';
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { toast } from 'react-toastify';
import{useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../css/Login.css';
import '../apiConfig';
import bcrypt from 'bcryptjs';
const Login = () => {


  const [EmployeeCode, setEmployeeCode] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try{
            const response = await axios.get('Employee/' + EmployeeCode);
            const resp = response.data;
                if(Object.keys(resp).length === 0) {
                    toast.error('Please enter a valid role');
                }else{
                    if(bcrypt.compareSync(Password, resp.password)){
                        if (resp.role === "Admin") {
                            toast.success('Đăng nhập thành công (Admin)');
                            sessionStorage.setItem('EmployeeCode', EmployeeCode);
                            sessionStorage.setItem('userRole', 'Admin');
                            navigate('/admin');
                          } else {
                            toast.success('Đăng nhập thành công (User)');
                            sessionStorage.setItem('EmployeeCode', EmployeeCode);
                            sessionStorage.setItem('userRole', 'User');
                            navigate('/user');
                          }
                    }else{
                        toast.error('Tài khoảng hoặc mật khẩu không tồn tại');
                    }
                }
            }catch(err){
                console.error(err);
            }
        }
    };

    const validate = () =>{
      let result = true;
      if(EmployeeCode === "" || EmployeeCode === null){
          result = false;
          toast.warning("Vui lòng nhập tên");
      }
      if(Password === "" || Password === null){
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
                <h2 className="fw-bold mb-5 text-center">ĐĂNG NHẬP</h2>
                <div className="mb-3">
                  <Form 
                  onSubmit={handleSubmit}
                  >
                    <Form.Group className="mb-5" controlId="formBasicEmail">
                      <Form.Control
                        placeholder="Nhập tài khoản"
                        className='rounded'
                        value={EmployeeCode}
                        onChange={(e) => setEmployeeCode(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-5" controlId="formBasicPassword">
                      <Form.Control
                        type="Password"
                        placeholder="Nhập mật khẩu"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                    <div className="d-grid">
                      <Button variant="primary" type="submit" className='bg-black'>
                        Đăng nhập 
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
