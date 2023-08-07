import React,{useEffect, useState} from 'react'
import {Container, Row, Col, Table} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import '../../css/HoSo.css';
import '../../apiConfig';
import axios from 'axios';
function UserTimeAttendanceManagement() {
    const [data, setData] = useState([]);
    const loggedInEmployeeCode = sessionStorage.getItem('EmployeeCode');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/TimeAttendanceManagement/${loggedInEmployeeCode}`);
                setData(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [loggedInEmployeeCode]);

    return (
        <Container fluid>
            <Row className='border-bottom border-dark'>
                <Col><h2>Lịch sử chấm công</h2></Col>
            </Row>
            <Row>
                <Table striped bordered hover >
                <thead>
                    <tr>
                    <th>Employee code</th>
                        <th>Check in</th>
                        <th>Check out</th>
                        <th>Working day</th>
                    </tr>
                </thead>
                <tbody>
                {data.map(i => {
                        return(
                            <tr key = {i.id}>
                                <td>{i.employeeCode}</td>
                                <td>{i.checkIn}</td>
                                <td>{i.checkOut}</td>
                                <td>{i.workingDay}</td>
                            </tr>
                        );
                    })}
                </tbody>
                </Table>
            </Row>
            <Row>
                <Col>
                <NavLink to ='/user' >Chấm công</NavLink>
                </Col>
            </Row>
        </Container>
    );
}

export default UserTimeAttendanceManagement;