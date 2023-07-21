import React, { useEffect, useState } from 'react';
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { toast } from 'react-toastify';
import{useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../css/Login.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    axios.defaults.baseURL="https://localhost:7143/api/";
  
    useEffect(() => {
      sessionStorage.clear();
    },[]);
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
          try {
            const response = await axios.post('Logins/', {
               username,
                password
            });
            navigate("/");
          } catch (error) {
            console.error(error);
          }
        }
      };
  
      const validate = () =>{
        let result = true;
        if(username === "" || username === null){
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
                  <h2 className="fw-bold mb-5 text-center">ĐĂNG KÝ</h2>
                  <div className="mb-3">
                    <Form 
                    onSubmit={handleSubmit}
                    >
                      <Form.Group className="mb-5" controlId="formBasicEmail">
                        <Form.Control
                          placeholder="Nhập tài khoản"
                          className='rounded'
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </Form.Group>
  
                      <Form.Group className="mb-5" controlId="formBasicPassword">
                        <Form.Control
                          type="password"
                          placeholder="Nhập mật khẩu"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit" className='bg-black'>
                          Đăng ký
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Đã có tài khoản{" "}
                        <a href="/login" className="text-primary fw-bold">
                          Đăng nhập
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
}

export default Register