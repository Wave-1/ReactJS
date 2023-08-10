import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, API_HEADERS, API_ROUTES } from '../../apiConfig';
import { toast } from 'react-toastify';
import bcrypt from 'bcryptjs';
import axios from 'axios';

function EmployeeInformation() {
    const employeeCode = sessionStorage.getItem('EmployeeCode');
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
        newPassword: '',
        confirmPassword: '',
    });

    useEffect(() => {
        axios
            .get(`${API_BASE_URL}${API_ROUTES.EMPLOYEE}/${employeeCode}`, {
                headers: API_HEADERS
            })
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
    }, [employeeCode]);

    const formatDateForInput = (dateString) => {
        if (!dateString) return ''; // Handle empty date
        const date = new Date(dateString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (data.newPassword !== data.confirmPassword) {
            toast.error('Mật khẩu mới không khớp. Vui lòng nhập lại mật khẩu.');
            return;
        }
        try {
            const updateEmployeeData = {
                employeeName: data.employeeName,
                gender: data.gender,
                dateOfBirth: data.dateOfBirth,
                citizenIdentificationCard: data.citizenIdentificationCard,
                cardIssueDate: data.cardIssueDate,
                phoneNumber: data.phoneNumber,
                role: data.role,
                workShifts: data.workShifts,
                password: data.newPassword,
                updatedAt: new Date()
            };

            if (data.newPassword && data.newPassword === data.confirmPassword) {
                const isOldPassword = await comparePasswords(data.oldPassword, data.password);
                if (!isOldPassword) {
                    toast.error('Mật khẩu cũ không khớp. Cập nhật mật khẩu thất bại.');
                    return;
                }
                updateEmployeeData.newPassword = data.newPassword;
            }

            const response = await axios.put(
                `${API_BASE_URL}Employee/${employeeCode}`,
                updateEmployeeData,
                { headers: API_HEADERS }
            );
            console.log('Response:', response.data);
            toast.success('Successfully updated employee information');
        } catch (err) {
            console.error('Error updating employee information:', err);
            toast.error('Error when updating employee information');
        }
    };

    const comparePasswords = async (oldPassword, hashedPassword) => {
        try {
            return await bcrypt.compare(oldPassword, hashedPassword);
        } catch (error) {
            console.error('Error comparing passwords:', error);
            return false;
        }
    };


    const handleCancel = () => {
        navigate('./EmployeeEdit');
    };

    return (
        <Container fluid>
            <Row className='border-bottom border-dark'>
                <Col>
                    <h2>Employee Information</h2>
                </Col>
            </Row>

            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group className="mb-3" controlId="employeeCode">
                        <Form.Label>Employee Code(*)</Form.Label>
                        <Form.Control
                            type="text"
                            name="employeeCode"
                            defaultValue={data.employeeCode}
                            disabled
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="employeeName">
                        <Form.Label>Employee Name (*)</Form.Label>
                        <Form.Control
                            type="text"
                            name="employeeName"
                            defaultValue={data.employeeName}
                            disabled
                        />
                    </Form.Group>
                    
                    <Form.Group as={Col} controlId="gender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Select
                            name="gender"
                            defaultValue={data.gender}
                            disabled
                        >
                            <option defaultValue="Other">Other</option>
                            <option defaultValue="Male">Male</option>
                            <option defaultValue="Female">Female</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId='dateOfBirth'>
                        <Form.Label>Date Of Birth</Form.Label>
                        <Form.Control
                            type="date"
                            name="dateOfBirth"
                            defaultValue={formatDateForInput(data?.dateOfBirth)}
                            disabled
                        />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} className="mb-3" controlId="citizenIdentificationCard">
                        <Form.Label>Citizen Identification </Form.Label>
                        <Form.Control
                            type="text"
                            name="citizenIdentificationCard"
                            defaultValue={data?.citizenIdentificationCard}
                            disabled
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="cardIssueDate">
                        <Form.Label>Card Issue Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="cardIssueDate"
                            defaultValue={formatDateForInput(data?.cardIssueDate)}
                            disabled
                        />
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3" controlId="phoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="text"
                        name="phoneNumber"
                        defaultValue={data?.phoneNumber}
                        disabled
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="role">
                    <Form.Label>Role</Form.Label>
                    <Form.Control
                        type="text"
                        name="role"
                        defaultValue={data?.role}
                        disabled
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="workShifts">
                    <Form.Label>Work Shifts</Form.Label>
                    <Form.Control
                        type="text"
                        name="workShifts"
                        defaultValue={data?.workShifts}
                        disabled
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="oldPassword">
                    <Form.Label>Mật khẩu cũ (*)</Form.Label>
                    <Form.Control type="password"
                        name="oldPassword"
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="newPassword">
                        <Form.Label>Mật khẩu mới (*)</Form.Label>
                        <Form.Control type="password"
                            name="newPassword"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="confirmPassword">
                        <Form.Label>Nhập lại mật khẩu mới (*)</Form.Label>
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
                            Save
                        </Button>
                    </Col>
                    <Col>
                        <Button className='bg-danger' variant="primary" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}
export default EmployeeInformation