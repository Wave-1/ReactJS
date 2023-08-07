import React from 'react'
import { useState,useEffect } from 'react';
import {Container, Row, Col, Table} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify'
import '../../css/HoSo.css';
import axios from 'axios';

function WorkSchedule() {

    const [data, setData] = useState([]);
    useEffect(() =>{
        const fetchData = async() =>{
            try{
                const response = await axios.get('/WorkSchedule');
                setData(response.data);
            }catch(err){
                console.log(err);
            }
        };
        fetchData();
    },[]);

    const formatDateForInput = (dateString) => {
        if (!dateString) return ''; // Handle empty date
        const date = new Date(dateString);
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
      };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this Work Schedule ?')) {
            try {
                const response = await axios.delete(`/WorkSchedule/${id}`);
                console.log(response.data);
                toast.success('Successfully deleted Work Schedule');
                const updatedData = data.filter((i) => i.id !== id);
                setData(updatedData);
            } catch (err) {
                console.error('Error deleting Work Schedule:', err);
                toast.error('Error when deleting Work Schedule !!!');
            }
        }
    };

    return (
        <Container fluid>
            <Row className='border-bottom border-dark'>
                <Col><h2>Work Schedule</h2></Col>
            </Row>
            <Row xs="auto" className='border-bottom border-dark'>
                <Col >
                    <img src={require('../../assets/icon-plus.png')} alt='imgPlus'style={{width:'35px'}}/>
                    <NavLink to={'/admin/WorkSchedule/Create'}>Create</NavLink>
                </Col>
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
                        <th>Created at</th>
                        <th>Updated at</th>
                        <th>Actions</th>
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
                                <td>{formatDateForInput(workSchedule.createdAt)}</td>
                                <td>{formatDateForInput(workSchedule.updatedAt)}</td>
                                <td>
                                    <NavLink to={`/admin/WorkSchedule/Update/${workSchedule.id}`} >
                                        <img src={require('../../assets/icon-edit-1.png')} alt='imgedit' style={{ width: '35px', marginRight: '10px'}} />
                                    </NavLink>
                                    <NavLink onClick={() => handleDelete(workSchedule.id)}>
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
export default WorkSchedule

