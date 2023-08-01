import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';

function ChamCong() {
  const [checkedIn, setCheckedIn] = useState(false);
  const [employeeCode, setEmployeeCode] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    // Check if the user is logged in and get their employeeCode from sessionStorage
    const loggedInEmployeeCode = sessionStorage.getItem('EmployeeCode');
    if (loggedInEmployeeCode) {
      setEmployeeCode(loggedInEmployeeCode);
    }

    const loggedInCheckedIn = sessionStorage.getItem('checkedIn') === "true";
    setCheckedIn(loggedInCheckedIn);

    const interval = setInterval(() => {
      setDate(new Date().toLocaleDateString());
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCheckIn = () => {
    setCheckedIn(true);
    localStorage.setItem("checkedIn", "true");
    const employeeCode = sessionStorage.getItem('EmployeeCode');
    const checkin = new Date(); // Lấy thời gian hiện tại
    saveToDatabase(employeeCode, checkin, null); // Gọi hàm saveToDatabase với tham số checkin
  }
  

  const handleCheckOut = () => {
    setCheckedIn(false);
    localStorage.setItem("checkedIn", "false");
    const employeeCode = sessionStorage.getItem('EmployeeCode');
    const checkoutTime = new Date();
    saveToDatabase(employeeCode, null, checkoutTime); // Gọi hàm với tham số checkoutTime
  }
  async function saveToDatabase(employeeCode, checkin, checkout) {
    const formatTime = (date) => date.toLocaleTimeString('en-US', { hour12: false });
    const workingDay = new Date().toISOString().split('T')[0];
  
    try {
      // Get the last row for the given employeeCode and workingDay
      const response = await axios.get(`/TimeAttendanceManagement?employeeCode=${employeeCode}&workingDay=${workingDay}`);
      if (response.data.length > 0) {
        const lastRow = response.data[response.data.length - 1];
        // Use the checkin value from the last row to update the checkout
        const updatedData = {
          ...lastRow,
          CheckOut: checkout ? formatTime(checkout) : lastRow.CheckOut,
        };
        await axios.put(`/TimeAttendanceManagement/${lastRow.id}`, updatedData);
      } else {
        // Insert new row for checkin
        const data = {
          EmployeeCode: employeeCode,
          CheckIn: checkin ? formatTime(checkin) : null,
          CheckOut: checkout ? formatTime(checkout) : null,
          WorkingDay: workingDay,
          CreatedAt: new Date().toISOString()
        };
        await axios.post('/TimeAttendanceManagement', data);
      }
    } catch (error) {
      console.error('Error saving data:', error);
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

export default ChamCong;
