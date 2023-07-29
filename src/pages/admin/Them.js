import React, {useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Container, Row, Col, Table} from 'react-bootstrap';

function Them() {
    return (
        <Container fluid>
        <Row className='border-bottom border-dark'>
            <Col><h2>Thêm Nhân Viên</h2></Col>
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
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label htmlFor="inputPassword5">Mật khẩu (*)</Form.Label>
              <Form.Control type="password" id="inputPassword5" aria-describedby="passwordHelpBlock"  />
            </Form.Group>
    
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label htmlFor="inputPassword5">Nhập lại mật khẩu (*)  </Form.Label>
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
export default Them;
