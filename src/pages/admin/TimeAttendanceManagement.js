import React from 'react'
import {Container, Row, Col, Table} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import '../../css/HoSo.css';
import { useState,useEffect } from 'react';
import { toast } from 'react-toastify'
import axios from 'axios';
function TimeAttendanceManagement() {
    const [data, setData] = useState([]);
    useEffect(() =>{
        const fetchData = async() => {
            try{
                const response = await axios.get('/TimeAttendanceManagement');
                setData(response.data);
            }catch(error){
                console.log(error);
            }
        };
        fetchData();
    },[]);
    
    const formatDateForInput = (dateString) => {
        if (!dateString) return ''; // Handle empty date
        const date = new Date(dateString);
        const formattedDate = date.toISOString().substr(0, 10); // Get "YYYY-MM-DD" format
        return formattedDate;
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this Time Attendance Management ?')) {
            try {
                const response = await axios.delete(`/TimeAttendanceManagement/${id}`);
                console.log(response.data);
                toast.success('Successfully deleted Time Attendance Management');
                const updatedData = data.filter((i) => i.id !== id);
                setData(updatedData);
            } catch (err) {
                console.error('Error deleting Time Attendance Management:', err);
                toast.error('Error when deleting Time Attendance Management !!!');
            }
        }
    };

    return (
        <Container fluid>
            <Row className='border-bottom border-dark'>
                <Col><h2>Time Attendance Management</h2></Col>
            </Row>
            <Row xs="auto" className='border-bottom border-dark'>
                <Col >
                    <img src={require('../../assets/icon-plus.png')} alt='imgPlus'style={{width:'35px'}}/>
                    <NavLink to={'/admin/TimeAttendanceManagement/Create'}>Create</NavLink>
                </Col>
            </Row>
            <Row>
                <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>Employee code</th>
                        <th>Check in</th>
                        <th>Check out</th>
                        <th>Working day</th>
                        <th>Work shifts</th>
                        <th>Created at</th>
                        <th>Updated at</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(i => {
                        return(
                            <tr key = {i.id}>
                                <td>{i.employeeCode}</td>
                                <td>{i.checkIn}</td>
                                <td>{i.checkOut}</td>
                                <td>{formatDateForInput(i.workingDay)}</td>
                                <td>{i.workShifts}</td>
                                <td>{formatDateForInput(i.createdAt)}</td>
                                <td>{formatDateForInput(i.updatedAt)}</td>
                                <td>
                                    <NavLink to={`/admin/TimeAttendanceManagement/Update/${i.id}`} >
                                        <img src={require('../../assets/icon-edit-1.png')} alt='imgedit' style={{ width: '35px', marginRight: '10px'}} />
                                    </NavLink>
                                    <NavLink onClick={() => handleDelete(i.id)}>
                                        <img src={require('../../assets/icon-delete-1.png')} alt='imgdelete' style={{ width: '15px' }} />
                                    </NavLink>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
                </Table>
            </Row>
        </Container>
    )
}
export default TimeAttendanceManagement