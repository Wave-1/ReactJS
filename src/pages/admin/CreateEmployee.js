import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../apiConfig';
import axios from 'axios';

import '../../css/HoSo.css';

function CreateEmployee() {
    
    const navigate = useNavigate();
    const [data, setData] = useState({
        employeeCode: '',
        employeeName: '',
        gender: '',
        phoneNumber: '',
        dateOfBirth: '',
        citizenIdentificationCard: '',
        cardIssueDate: '',
        role: '',
        workShifts: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const formatDateForInput = (dateString) => {
        if (!dateString) return ''; // Handle empty date
        const date = new Date(dateString);
        const formattedDate = date.toISOString().substr(0, 10); // Get "YYYY-MM-DD" format
        return formattedDate;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (data.password !== data.confirmPassword) {
                toast.error('Mật khẩu không trùng khớp.');
                return;
            }
            const newEmployeeData = {
                employeeCode: data.employeeCode,
                employeeName: data.employeeName,
                gender: data.gender,
                dateOfBirth: data.dateOfBirth,
                citizenIdentificationCard: data.citizenIdentificationCard,
                cardIssueDate: data.cardIssueDate,
                phoneNumber: data.phoneNumber,
                role: data.role,
                workShifts: data.workShifts,
                password: data.confirmPassword,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            const response = await axios.post('/Employee', newEmployeeData);

            console.log('Response:', response.data);
            toast.success('Successfully added employees');
            navigate('../Employee')
        } catch (err) {
            console.error('Error updating employee information:', err);
            toast.error('Error when adding staff !!!');
        }
    };


    const handleCancel = () => {
        if(window.confirm('Are you sure you want to cancel ?')) {
            navigate('../Employee');
        }
    };
  
    return (
        <Container fluid>
            <Row className='border-bottom border-dark'>
                <Col>
                    <h2>Chỉnh Sửa Thông Tin Nhân Viên</h2>
                </Col>
            </Row>

            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group className="mb-3" controlId="employeeCode">
                        <Form.Label>Mã nhân viên (*)</Form.Label>
                        <Form.Control
                            type="text"
                            name="employeeCode"
                            value={data.employeeCode}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="employeeName">
                        <Form.Label>Tên nhân viên (*)</Form.Label>
                        <Form.Control
                            type="text"
                            name="employeeName"
                            value={data.employeeName}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="gender">
                        <Form.Label>Giới tính</Form.Label>
                        <Form.Select
                            name="gender"
                            value={data.gender}
                            onChange={handleChange}
                        >
                            <option value="Không xác định">Không xác định</option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId='dateOfBirth'>
                        <Form.Label>Ngày sinh</Form.Label>
                        <Form.Control
                            type="date"
                            name="dateOfBirth"
                            value={formatDateForInput(data?.dateOfBirth)}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} className="mb-3" controlId="citizenIdentificationCard">
                        <Form.Label>Số CCCD</Form.Label>
                        <Form.Control
                            type="text"
                            name="citizenIdentificationCard"
                            value={data?.citizenIdentificationCard}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="cardIssueDate">
                        <Form.Label>Ngày cấp</Form.Label>
                        <Form.Control
                            type="date"
                            name="cardIssueDate"
                            value={formatDateForInput(data?.cardIssueDate)}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3" controlId="phoneNumber">
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control
                        type="text"
                        name="phoneNumber"
                        value={data?.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="role">
                    <Form.Label>Chức vụ</Form.Label>
                    <Form.Control
                        type="text"
                        name="role"
                        value={data?.role}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="workShifts">
                    <Form.Label>Ca làm việc</Form.Label>
                    <Form.Control
                        type="text"
                        name="workShifts"
                        value={data?.workShifts}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Mật khẩu (*)</Form.Label>
                    <Form.Control type="password"
                        name="password"
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="confirmPassword">
                        <Form.Label>Nhập lại mật khẩu (*)</Form.Label>
                        <Form.Control
                            type="password"
                            name="confirmPassword"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                </Row>
                <Row>
                    <Col>
                        <Button variant="primary" type="submit">
                            Lưu
                        </Button>
                    </Col>
                    <Col>
                        <Button className='bg-danger' variant="primary" onClick={handleCancel}>
                            Hủy
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}

export default CreateEmployee;
