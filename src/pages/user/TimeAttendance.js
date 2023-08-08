import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { API_BASE_URL, API_ROUTES, API_HEADERS } from '../../apiConfig';
import axios from 'axios';
import moment from 'moment';

function TimeAttendance() {
    const [checkedIn, setCheckedIn] = useState(() => {
        const loggedInCheckedIn = localStorage.getItem('checkedIn');
        return loggedInCheckedIn === "true";
    });
    const [employeeCode, setEmployeeCode] = useState('');
    const [date, setDate] = useState(new Date().toLocaleDateString());
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [setCheckinTime] = useState(null);

    useEffect(() => {
        const loggedInEmployeeCode = sessionStorage.getItem('EmployeeCode');
        if (loggedInEmployeeCode) {
            setEmployeeCode(loggedInEmployeeCode);
        }

        const loggedInCheckedIn = localStorage.getItem('checkedIn') === "true";
        setCheckedIn(loggedInCheckedIn);

        const interval = setInterval(() => {
            setDate(new Date().toLocaleDateString());
            setTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleCheckIn = async () => {
        setCheckedIn(true);
        localStorage.setItem("checkedIn", "true");
        const currentTime = new Date();
        const formattedCheckinTime = moment(currentTime).format('YYYY-MM-DD HH:mm:ss');
        const formattedWorkingDay = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
        const createdAt = moment().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

        const existingDataResponse = await axios.get(`${API_BASE_URL}${API_ROUTES.TimeAttendanceManagement}?employeeCode=${employeeCode}&workingDay=${formattedWorkingDay}`,
        { headers: API_HEADERS }
        );

        const existingData = existingDataResponse.data.find(row => (row.checkIn !== null && row.checkOut === null) || (row.checkIn !== null && row.checkOut !== null));
        console.log(existingData);
        console.log(employeeCode);

        if (!existingData) {
            const data = {
                EmployeeCode: employeeCode,
                CheckIn: formattedCheckinTime,
                CheckOut: null,
                WorkingDay: formattedWorkingDay,
                CreatedAt: createdAt
            };
            const response = await axios.post(API_BASE_URL + API_ROUTES.TimeAttendanceManagement, data,
            { headers: API_HEADERS }
            );
            setCheckinTime(response.data.checkIn);
        }
    }

    const handleCheckOut = async () => {
        setCheckedIn(false);
        localStorage.setItem("checkedIn", "false");
        const currentTime = new Date();
        const formattedCheckoutTime = moment(currentTime).format('YYYY-MM-DD HH:mm:ss');
        const formattedWorkingDay = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');

        const existingDataResponse = await axios.get(`${API_BASE_URL}${API_ROUTES.TimeAttendanceManagement}?employeeCode=${employeeCode}&workingDay=${formattedWorkingDay}`,
        { headers: API_HEADERS }
        );
        const existingData = existingDataResponse.data.find(row => (row.checkIn !== null && row.checkOut === null) || (row.checkIn !== null && row.checkOut !== null));
        console.log(existingData);
        console.log(employeeCode);

        if (existingData) {
            await axios.put(`${API_BASE_URL}${API_ROUTES.TimeAttendanceManagement}/${existingData.id}`, 
            { ...existingData, CheckOut: formattedCheckoutTime },
            { headers: API_HEADERS }
            );
        }
    }

    return (
        <Container fluid>
            <Row className="d-flex justify-content-center align-items-center">
                <Col md={8} lg={5} xs={12}>
                    <h1 className='text-center mb-5 mt-5'>Acacia</h1>
                    <Card className="shadow">
                        <Card.Body>
                            <div className="mb-3 mt-md-4">
                                <Row>
                                    <h2 className="fw-bold mb-5 text-center"><img src={require('../../assets/icon-Dho.png')} alt='imgPlus' style={{ width: '35px' }} />{date} {time}</h2>
                                </Row>
                                <div className="mb-3">
                                    <Form>
                                        <div className="d-grid">
                                            {!checkedIn ? (
                                                <Button variant="primary" type="button" onClick={handleCheckIn}>
                                                    Check in
                                                </Button>
                                            ) : (
                                                <Button className='bg-danger' variant="primary" type="button" onClick={handleCheckOut}>
                                                    Check out
                                                </Button>
                                            )}
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default TimeAttendance;