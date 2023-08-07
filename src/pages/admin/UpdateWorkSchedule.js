import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../apiConfig';
import axios from 'axios';

import '../../css/HoSo.css';

function UpdateWorkSchedule() {
    const [validated, setValidated] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({
        employeeCode: '',
        workShifts: '',
        startTime: '',
        endTime: '',
        workingDay: '',
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
            .get(`/WorkSchedule/${id}`)
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
            const newWorkScheduleData = {
                employeeCode: data.employeeCode,
                workShifts: data.workShifts,
                startTime: data.startTime,
                endTime: data.endTime,
                workingDay: data.workingDay,
                updatedAt: new Date()
            };
            const response = await axios.put(`/WorkSchedule/${id}`, newWorkScheduleData);

            console.log('Response:', response.data);
            toast.success('Successfully updated Work Schedule');
            navigate('../WorkSchedule')
        } catch (err) {
            console.error('Error updated Work Schedule:', err);
            toast.error('Error updated Work Schedule !!!');
        }
    };


    const handleCancel = () => {
        if (window.confirm('Are you sure you want to cancel ?')) {
            navigate('../WorkSchedule');
        }
    };

    return (
        <Container fluid>
        <Row className='border-bottom border-dark'>
            <Col>
                <h2>Create Work Schedule</h2>
            </Col>
        </Row>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group className="mb-3" controlId="employeeCode">
                    <Form.Label>Employee Code (*)</Form.Label>
                    <Form.Control
                        type="text"
                        name="employeeCode"
                        value={data.employeeCode}
                        onChange={handleChange}
                        required
                        disabled
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="workShifts">
                    <Form.Label>Work Shifts</Form.Label>
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
                <Form.Group as={Col} controlId="startTime">
                    <Form.Label>Start Time</Form.Label>
                    <Form.Control
                        type="text"
                        name="startTime"
                        value={data?.startTime}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="endTime">
                    <Form.Label>End Time</Form.Label>
                    <Form.Control
                        type="text"
                        name="endTime"
                        value={data?.endTime}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
            </Row>
            <Row>
            <Form.Group as={Col} className="mb-3" controlId="workingDay">
                <Form.Label>Working Day</Form.Label>
                <Form.Control
                    type="date"
                    name="workingDay"
                    value={formatDateForInput(data?.workingDay)}
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

export default UpdateWorkSchedule;
