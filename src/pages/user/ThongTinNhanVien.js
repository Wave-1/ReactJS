
import React, { useEffect, useState } from 'react';
import {Container, Row, Col, Table} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../../css/HoSo.css';
function ThongTinNhanVienUser() {
    const [showPassword, setShowPassword] = useState(false);
  
    const handleToggleShowPassword = () => {
      setShowPassword(!showPassword);
    };
  
    return (
        <Container fluid>
        <Row className='border-bottom border-dark'>
            <Col><h2>Hồ Sơ</h2></Col>
        </Row>
        
        <Form>
          <Row className="mb-3">
            <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Mã nhân viên (*)</Form.Label>
                <Form.Control/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Tên nhân viên (*)</Form.Label>
                <Form.Control />
            </Form.Group>
          
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Giới tính</Form.Label>
                <Form.Select as={Col} aria-label="Default select example">
                    <option value="1">Nam</option>
                    <option value="2">Nữ</option>
                    <option value="3">Không xác định</option>
                </Form.Select>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Ngày sinh</Form.Label>
              <Form.Control type="date"  />
            </Form.Group>

            
          </Row>
            <Row>
            <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
                <Form.Label>Số CCCD</Form.Label>
                <Form.Control />
            </Form.Group>
                <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Ngày cấp</Form.Label>
                <Form.Control type="date"  />
                </Form.Group>
            </Row>
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Chức vụ</Form.Label>
            <Form.Control/>
          </Form.Group>
    
          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>Ca làm việc</Form.Label>
            <Form.Control />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label htmlFor="inputPassword5">Mật khẩu</Form.Label>
              <Form.Control type="password" id="inputPassword5" aria-describedby="passwordHelpBlock" />
          </Form.Group>
        </Form>
        <Row xs="auto">
          <Col>
            <Button onClick={() => window.location.href='/user/ThongTinNhanVien/SuaUser/'}>
              Sửa
            </Button>
          </Col>
        </Row>
        </Container>
      );
}
export default ThongTinNhanVienUser