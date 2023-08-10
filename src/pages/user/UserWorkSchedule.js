import React from 'react'
import { useState,useEffect } from 'react';
import {Container, Row, Col, Table} from 'react-bootstrap';
import '../../css/HoSo.css';
import { API_BASE_URL, API_ROUTES, API_HEADERS } from '../../apiConfig';
import axios from 'axios';
function UserWorkSchedule() {
    const employeeCode = sessionStorage.getItem('EmployeeCode');
    const [data, setData] = useState([]);
    useEffect(() =>{
        const fetchData = async() =>{
            try{
                const response = await axios.get(
                    `${API_BASE_URL}${API_ROUTES.WorkSchedule}?employeeCode=${employeeCode}`, {
                    headers: API_HEADERS
                });
                setData(response.data);
            }catch(err){
                console.log(err);
            }
        };
        fetchData();
    },[employeeCode]);
    const formatDateForInput = (dateString) => {
        if (!dateString) return ''; // Handle empty date
        const date = new Date(dateString);
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
      };

    return(
        <Container fluid>
            <Row className='border-bottom border-dark'>
                <Col><h2>Work Schedule</h2></Col>
            </Row>
            <Row>
                <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>Employee code</th>
                        <th>Work shift</th>
                        <th>Start time</th>
                        <th>End time</th>
                        <th>Working day</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(workSchedule => {
                        return(
                            <tr key={workSchedule.id}>
                                <td>{workSchedule.employeeCode}</td>
                                <td>{workSchedule.workShifts}</td>
                                <td>{workSchedule.startTime}</td>
                                <td>{workSchedule.endTime}</td>
                                <td>{formatDateForInput(workSchedule.workingDay)}</td>
                            </tr>
                        );
                    })}
                </tbody>
                </Table>
            </Row>
        </Container>
        )
}
export default UserWorkSchedule