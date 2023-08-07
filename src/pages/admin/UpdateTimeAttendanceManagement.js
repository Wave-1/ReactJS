import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../apiConfig';
import axios from 'axios';

import '../../css/HoSo.css';

function UpdateTimeAttendanceManagement() {
    const [validated, setValidated] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({
        id: '',
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
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
      };

    useEffect(() => {
        axios
            .get(`/TimeAttendanceManagement/${id}`)
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
    }, [id]);

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
                checkIn: data.checkIn,
                checkOut: data.checkOut,
                workingDay: data.workingDay,
                workShifts: data.workShifts,
                updatedAt: new Date()
            };
            const response = await axios.put(`/TimeAttendanceManagement/${id}`, newTimeAttendanceManagementData);

            console.log('Response:', response.data);
            toast.success('Successfully updated Time Attendance Manager');
            navigate('../TimeAttendanceManagement')
        } catch (err) {
            console.error('Error updated Time Attendance Manager:', err);
            toast.error('Error updated Time Attendance Management !!!');
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
                            disabled
                        />
                    </Form.Group>
                    
                    <Form.Group as={Col} className="mb-3" controlId="checkIn">
                        <Form.Label>Check in</Form.Label>
                        <Form.Control
                            type="text"
                            name="checkIn"
                            value={data?.checkIn}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="checkOut">
                        <Form.Label>Check out</Form.Label>
                        <Form.Control
                            type="text"
                            name="checkOut"
                            value={data?.checkOut}
                            onChange={handleChange}
                            required
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

export default UpdateTimeAttendanceManagement;
