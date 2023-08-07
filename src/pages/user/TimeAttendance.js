import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';

function TimeAttendance() {
    // const [checkedIn, setCheckedIn] = useState(true);
    const [checkedIn, setCheckedIn] = useState(() => {
        const loggedInCheckedIn = localStorage.getItem('checkedIn');
        return loggedInCheckedIn === "true";
    });
    const [employeeCode, setEmployeeCode] = useState('');
    const [date, setDate] = useState(new Date().toLocaleDateString());
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [checkinTime, setCheckinTime] = useState(null); // Lưu giá trị Checkin lần đầu trong ngày

    useEffect(() => {
        // Check if the user is logged in and get their employeeCode and id from sessionStorage
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
        const employeeCode = sessionStorage.getItem('EmployeeCode');
        const currentTime = new Date(); // Lấy thời gian hiện tại

        // Sử dụng moment.js để định dạng giá trị CheckIn thành kiểu datetime
        const formattedCheckinTime = moment(currentTime).format('YYYY-MM-DD HH:mm:ss');

        // Sử dụng moment.js để định dạng ngày tháng
        const formattedWorkingDay = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');

        const createdAt = moment().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

        // Kiểm tra xem đã có hàng dữ liệu cho nhân viên và ngày làm việc tương ứng hay chưa
        //const existingDataResponse = await axios.get(`/TimeAttendanceManagement?employeeCode=${employeeCode}&workingDay=${formattedWorkingDay}`);
        const existingDataResponse = await axios.get(`/TimeAttendanceManagement/${employeeCode}`);
        //console.log(existingDataResponse);
        const existingData = existingDataResponse.data.find(row => (row.checkIn !== null && row.checkOut === null) || (row.checkIn !== null && row.checkOut !== null));
        //console.log(existingData);
        if (!existingData) {
            // Nếu chưa có dữ liệu, tạo mới hàng với giá trị CheckIn và CheckOut là null
            const data = {
                EmployeeCode: employeeCode,
                CheckIn: formattedCheckinTime, // Sử dụng giá trị đã được định dạng
                CheckOut: null, // Set CheckOut to null initially
                WorkingDay: formattedWorkingDay,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            const response = await axios.post('/TimeAttendanceManagement', data);
            setCheckinTime(response.data.checkIn); // Lưu giá trị Checkin lần đầu
        }
    }

    const handleCheckOut = async () => {
        setCheckedIn(false);
        localStorage.setItem("checkedIn", "false");
        const employeeCode = sessionStorage.getItem('EmployeeCode');
        const currentTime = new Date(); // Lấy thời gian hiện tại

        // Sử dụng moment.js để định dạng giá trị CheckOut thành kiểu datetime
        const formattedCheckoutTime = moment(currentTime).format('YYYY-MM-DD HH:mm:ss');

        // Sử dụng moment.js để định dạng ngày tháng
        const formattedWorkingDay = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');

        // Kiểm tra xem đã có hàng dữ liệu cho nhân viên và ngày làm việc tương ứng hay chưa
        const existingDataResponse = await axios.get(`/TimeAttendanceManagement/${employeeCode}`);
        const existingData = existingDataResponse.data.find(row => (row.checkIn !== null && row.checkOut === null) || (row.checkIn !== null && row.checkOut !== null));
        if (existingData) {
            // Nếu đã có dữ liệu, cập nhật giá trị CheckOut vào hàng đó
            await axios.put(`/TimeAttendanceManagement/${existingData.id}`, { ...existingData, CheckOut: formattedCheckoutTime });
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
