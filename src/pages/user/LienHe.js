import React from 'react'
import {Container, Row, Col, Table, FormGroup} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../../css/HoSo.css';
function LienHeUser() {
    return (
        <Form>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Col>
                        <h3>Cần hỗ trợ ?</h3>
                        <h6>Liên hệ với chúng tôi để được giải đáp.</h6>
                    </Col>
                </Form.Group>
                <FormGroup as={Col}>
                    <Form.Group  className="mb-3">
                            <Form.Label>Họ và tên</Form.Label>
                            <Form.Control />
                    </Form.Group>
                    <Form.Group  className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Nội dung</Form.Label>
                            <Form.Control as="textarea" rows={5} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Gửi tin nhắn
                    </Button>
                </FormGroup>
            </Row>           
        </Form>
      );
}
export default LienHeUser