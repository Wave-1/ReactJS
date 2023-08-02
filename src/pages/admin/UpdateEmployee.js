import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function UpdateEmployee() {
    const { employeeCode } = useParams();
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
            .get(`/Employee/${employeeCode}`)
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
    }, [employeeCode]);

    const formatDateForInput = (dateString) => {
        if (!dateString) return ''; // Handle empty date
        const date = new Date(dateString);
        const formattedDate = date.toISOString().substr(0, 10); // Get "YYYY-MM-DD" format
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

            const response = await axios.put(`/Employee/${employeeCode}`, updateEmployeeData);

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
                            disabled
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

                {/* <Form.Group className="mb-3" controlId="oldPassword">
                    <Form.Label>Mật khẩu cũ (*)</Form.Label>
                    <Form.Control type="password"
                        name="oldPassword"
                        onChange={handleChange}
                        required
                    />
                </Form.Group> */}

                {/* <Row className="mb-3">
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
                </Row> */}
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

export default UpdateEmployee;
