import React, {useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Container, Row, Col, Table} from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

function SuaUser() {
    return (
        <Container fluid>
        <Row className='border-bottom border-dark'>
            <Col><h2>Sửa Thông Tin Nhân Viên</h2></Col>
        </Row>
        
        <Form>
          <Row className="mb-3">
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
          <Row className="mb-3">
            <Form.Group controlId="formGridCity">
              <Form.Label  htmlFor="inputPassword5">Mật khẩu cũ (*)</Form.Label>
              <Form.Control type="password" id="inputPassword5" aria-describedby="passwordHelpBlock" />
            </Form.Group>
    
            <Form.Group controlId="formGridCity">
              <Form.Label htmlFor="inputPassword5">Nhập mật khẩu mới (*)  </Form.Label>
              <Form.Control type="password" id="inputPassword5" aria-describedby="passwordHelpBlock" />
            </Form.Group>
            <Form.Group controlId="formGridCity">
              <Form.Label htmlFor="inputPassword5">Nhập lại mật khẩu mới (*)</Form.Label>
              <Form.Control type="password" id="inputPassword5" aria-describedby="passwordHelpBlock" />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col}>
              <Col sm={{  offset: 10}}>
                <Button variant="primary" type="submit">
                  Lưu
                </Button>
              </Col>
            </Form.Group>
            <Form.Group as={Col}>
              <Col >
                <Button  className='bg-danger' variant="primary" type="submit">
                  Hủy
                </Button>
              </Col>
            </Form.Group>
          </Row>
        </Form>
        </Container>
      );
    
}
export default SuaUser;
