import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../apiConfig';
import axios from 'axios';

import '../../css/HoSo.css';

function CreateTimeAttendanceManagement() {
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    const [data, setData] = useState({
        employeeCode: '',
        checkIn: '',
        checkOut: '',
        workingDay: '',
        workShifts: '',
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
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);
        try {
            const newTimeAttendanceManagementData = {
                employeeCode: data.employeeCode,
                workingDay: data.workingDay,
                workShifts: data.workShifts,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            const response = await axios.post('/TimeAttendanceManagement', newTimeAttendanceManagementData);

            console.log('Response:', response.data);
            toast.success('Successfully added Time Attendance Management');
            navigate('../TimeAttendanceManagement')
        } catch (err) {
            console.error('Error added Time Attendance Management:', err);
            toast.error('Error added Time Attendance Management !!!');
        }
    };


    const handleCancel = () => {
        if (window.confirm('Are you sure you want to cancel ?')) {
            navigate('../TimeAttendanceManagement');
        }
    };

    return (
        <Container fluid>
            <Row className='border-bottom border-dark'>
                <Col>
                    <h2>Create Time Attendance Management</h2>
                </Col>
            </Row>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group className="mb-3" controlId="employeeCode">
                        <Form.Label>Employee code (*)</Form.Label>
                        <Form.Control
                            type="text"
                            name="employeeCode"
                            value={data.employeeCode}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    
                    <Form.Group as={Col} className="mb-3" controlId="checkIn">
                        <Form.Label>Check in</Form.Label>
                        <Form.Control
                            type="text"
                            name="checkIn"
                            value={data?.checkIn}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="checkOut">
                        <Form.Label>Check out</Form.Label>
                        <Form.Control
                            type="text"
                            name="checkOut"
                            value={data?.checkOut}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Row>
                <Row>
                <Form.Group as={Col} className="mb-3" controlId="workingDay">
                        <Form.Label>Working day</Form.Label>
                        <Form.Control
                            type="date"
                            name="workingDay"
                            value={formatDateForInput(data?.workingDay)}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="workShifts">
                        <Form.Label>Work shifts</Form.Label>
                        <Form.Control
                            type="text"
                            name="workShifts"
                            value={data?.workShifts}
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

export default CreateTimeAttendanceManagement;
