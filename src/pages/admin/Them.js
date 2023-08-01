import React, { useState } from 'react';
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../apiConfig';
import axios from 'axios';

import '../../css/HoSo.css';

function Them() {
    const navigate = useNavigate();
    const [employeeCode, setEmployeeCode] = useState('');
    const [employeeName, setEmployeeName] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [citizenIdentificationCard, setCitizenIdentificationCard] = useState('');
    const [cardIssueDate, setCardIssueDate] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [role, setRole] = useState('');
    const [workShifts, setWorkShifts] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [createdAt, setCreatedAt] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('Mật khẩu nhập lại không khớp!');
            return;
        }

        const employeeData = {
            employeeCode,
            employeeName,
            gender,
            dateOfBirth,
            citizenIdentificationCard,
            cardIssueDate,
            phoneNumber,
            role,
            workShifts,
            password,
            createdAt: new Date()
        };

        axios.post('/Employee', employeeData)
            .then(response => {
                // Handle the response
                alert('Nhân viên mới đã được thêm thành công!');
                event.target.reset();
            })
            .catch(error => {
                // Handle the error
                alert('Đã xảy ra lỗi khi thêm nhân viên mới!');
                console.error(error);
            });
    };

    const handleCancel = () => {
      navigate('../HoSo');
  };
 
  
    return (
        <Container fluid>
            <Row className='border-bottom border-dark'>
                <Col><h2>Thêm Nhân Viên</h2></Col>
            </Row>

            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group className="mb-3" controlId="formGridAddress1">
                        <Form.Label>Mã nhân viên (*)</Form.Label>
                        <Form.Control value={employeeCode} onChange={event => setEmployeeCode(event.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGridAddr">
                        <Form.Label>Tên nhân viên (*)</Form.Label>
                        <Form.Control value={employeeName} onChange={event => setEmployeeName(event.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Giới tính</Form.Label>
                        <Form.Select as={Col} aria-label="Default select example" value={gender} onChange={event => setGender(event.target.value)}>
                            <option value="Không xác định">Không xác định</option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>                            
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Ngày sinh</Form.Label>
                        <Form.Control type="date" value={dateOfBirth} onChange={event => setDateOfBirth(event.target.value)} />
                    </Form.Group>


                </Row>
                <Row>
                    <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
                        <Form.Label>Số CCCD</Form.Label>
                        <Form.Control value={citizenIdentificationCard} onChange={event => setCitizenIdentificationCard(event.target.value)} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Ngày cấp</Form.Label>
                        <Form.Control type="date" value={cardIssueDate} onChange={event => setCardIssueDate(event.target.value)}  />
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control value={phoneNumber} onChange={event => setPhoneNumber(event.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Chức vụ</Form.Label>
                    <Form.Control value={role} onChange={event => setRole(event.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridAddress2">
                    <Form.Label>Ca làm việc</Form.Label>
                    <Form.Control value={workShifts} onChange={event => setWorkShifts(event.target.value)} />
                </Form.Group>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label htmlFor="inputPassword5">Mật khẩu (*)</Form.Label>
                        <Form.Control type="password" id="inputPassword5" aria-describedby="passwordHelpBlock" value={password} onChange={event => setPassword(event.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label htmlFor="inputPassword5">Nhập lại mật khẩu (*)  </Form.Label>
                        <Form.Control type="password" id="inputPassword5" aria-describedby="passwordHelpBlock" value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)} />
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col}>
                        <Col sm={{ offset: 10 }}>
                            <Button variant="primary" type="submit">
                                Lưu
                            </Button>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Col >
                            <Button className='bg-danger' variant="primary" onClick={handleCancel}>
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
