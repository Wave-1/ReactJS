import React,{useEffect, useState} from 'react'
import {Container, Row, Col, Table} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import '../../css/HoSo.css';
import { API_BASE_URL, API_ROUTES, API_HEADERS } from '../../apiConfig';
import axios from 'axios';
function UserTimeAttendanceManagement() {
    const [data, setData] = useState([]);
    const loggedInEmployeeCode = sessionStorage.getItem('EmployeeCode');
    const calculateSalary = (position, workHours, incomeData) => {
        const positionKey = position.toLowerCase();
        const hourlyRate = incomeData[0][positionKey];
        return hourlyRate * workHours;
    };
    
    function calculateWorkHours(checkIn, checkOut) {
        const checkInTime = new Date(checkIn);
        const checkOutTime = new Date(checkOut);
        const timeDiff = checkOutTime - checkInTime;
        const minutesWorked = Math.floor(timeDiff / (1000 * 60)); 
        return minutesWorked;
    }  

    useEffect(() => {
        const fetchData = async () => {
            try {
                const attendanceResponse = await axios.get(
                    `${API_BASE_URL}${API_ROUTES.TimeAttendanceManagement}?employeeCode=${loggedInEmployeeCode}`,
                    { headers: API_HEADERS }
                );
                const attendanceData = attendanceResponse.data;
                //console.log(attendanceData)
                const incomeResponse = await axios.get(
                    `${API_BASE_URL}${API_ROUTES.LevelIncome}`,
                    { headers: API_HEADERS }
                );
                const incomeData = incomeResponse.data;
                
                const EMPLOYEERole = await axios.get(
                    `${API_BASE_URL}${API_ROUTES.EMPLOYEE}?employeeCode=${loggedInEmployeeCode}`,
                    { headers: API_HEADERS }
                );
                const roleData = EMPLOYEERole.data;
                const employeeRole = roleData[0].role;
                const newData = attendanceData.map(item => {
                    const workHours = calculateWorkHours(item.checkIn, item.checkOut);
                    const position = employeeRole;
                    const salary = calculateSalary(position, workHours, incomeData);
                    const newTotalIncome = calculateSalary(position, workHours, incomeData);
                    return { ...item, position, salary, workHours, newTotalIncome };
                });
    
                // Lưu giá trị số phút vào cơ sở dữ liệu
                for (const item of newData) {
                    const workingHoursCompleted = item.workHours;
                    const employeeCodeToUpdate = item.employeeCode;
    
                    const incomeResponse = await axios.get(
                        `${API_BASE_URL}${API_ROUTES.Income}?employeeCode=${employeeCodeToUpdate}`,
                        { headers: API_HEADERS }
                    );
                    const existingIncomeData = incomeResponse.data;
                    console.log(existingIncomeData)
                    if (existingIncomeData === 0) {
                        try {
                            const data = {
                                EmployeeCode: employeeCodeToUpdate,
                                WorkingHoursCompleted: workingHoursCompleted,
                                TotalIncome: item.newTotalIncome,
                                CreatedAt: new Date().toISOString()
                            };
                            const response = await axios.post(`${API_BASE_URL}${API_ROUTES.Income}`,data,
                                { headers: API_HEADERS }
                            );
                            console.log('post thành công');
                            console.log('Created new income data:', response.data);
                            
                        } catch (error) {
                            console.error('Error creating new income data:', error);
                        }
                    } else if (existingIncomeData.length > 0) {
                        const existingID = existingIncomeData[0].id;
                        await axios.put(
                            `${API_BASE_URL}${API_ROUTES.Income}/${existingID}`,
                            {
                                WorkingHoursCompleted: workingHoursCompleted,
                                TotalIncome: item.newTotalIncome
                            },
                            { headers: API_HEADERS }
                        );
                         console.log('Updated WorkingHoursCompleted:', existingID);
                    }
                    if(existingIncomeData.length > 1){                        
                        const response1 = await axios.delete(`${API_BASE_URL}${API_ROUTES.Income}/${existingIncomeData[1]?.id}`,
                                { headers: API_HEADERS }
                         );
                         console.log('delete thành công', response1.data);
                    }
                    
                }
    
                setData(newData);
            } catch (error) {
                console.error('Error:', error);
            }
        };
    
        fetchData();
    }, [loggedInEmployeeCode]);
    

    return (
        <Container fluid>
            <Row className='border-bottom border-dark'>
                <Col><h2>Timekeeping history</h2></Col>
            </Row>
            <Row>
                <Table striped bordered hover >
                <thead>
                    <tr>
                    <th>Employee code</th>
                        <th>Check in</th>
                        <th>Check out</th>
                        <th>Working day</th>
                        <th>Working minutes</th>
                    </tr>
                </thead>
                <tbody>
                {data.map(i => {
                    const totalMinutes = i.workHours;
                    const hours = Math.floor(totalMinutes / 60);
                    const minutes = totalMinutes % 60;

                    let formattedTime = '';
                    if (hours > 0) {
                        formattedTime += `${hours} hours`;
                    }
                    if (minutes > 0) {
                        if (formattedTime !== '') {
                            formattedTime += ' ';
                        }
                        formattedTime += `${minutes} minutes`;
                    }if (totalMinutes === 0) {
                        formattedTime = '0 minutes';
                    }

                    return (
                        <tr key={i.id}>
                            <td>{i.employeeCode}</td>
                            <td>{i.checkIn}</td>
                            <td>{i.checkOut}</td>
                            <td>{i.workingDay}</td>
                            <td>{formattedTime}</td>
                        </tr>
                    );
                })}

                </tbody>
                </Table>
            </Row>
            <Row>
                <Col>
                <NavLink to ='/user' >Time Attendance</NavLink>
                </Col>
            </Row>
        </Container>
    );
}

export default UserTimeAttendanceManagement;