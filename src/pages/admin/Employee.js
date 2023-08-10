import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, InputGroup, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../css/HoSo.css';
import { API_BASE_URL, API_ROUTES, API_HEADERS } from '../../apiConfig';
import axios from 'axios';
import Search from '../../components/Search';
function Employee() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(API_BASE_URL + API_ROUTES.EMPLOYEE, {
                    headers: API_HEADERS
                });
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);
    const handleDelete = async (employeeCode) => {
        if (window.confirm('Are you sure you want to delete this employee ?')) {
            try {
                // const token = localStorage.getItem('token');
                const response = await axios.delete(API_BASE_URL + `Employee/${employeeCode}`, {
                    headers: API_HEADERS
                });
                console.log(response.data);
                toast.success('Successfully deleted employee information');
                const updatedData = data.filter((employee) => employee.employeeCode !== employeeCode);
                setData(updatedData);
            } catch (err) {
                console.error('Error deleting employee:', err);
                toast.error('Error when deleting employee information !!!');
            }
        }
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
    return (
        <Container fluid>
            <Row className='border-bottom border-dark'>
                <Col><h2>List Of Employee</h2></Col>
                <Col>
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                </Col>
            </Row>
            <Row xs="auto" className='border-bottom border-dark'>
                <Col >
                    <img src={require('../../assets/icon-plus.png')} alt='imgPlus' style={{ width: '35px' }} />
                    <NavLink to='/admin/Employee/Create/' >Create</NavLink>
                </Col>
            </Row>
            <Row>
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>Employee Code</th>
                            <th>Employee Name</th>
                            <th>Gender</th>
                            <th>Date Of Birth</th>
                            <th>Phone Number</th>
                            <th>Citizen Identification </th>
                            <th>Role</th>
                            <th>Work Shifts</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data
                            .filter((employee) =>
                                searchTerm.toLowerCase() === '' ||
                                (employee.employeeCode && employee.employeeCode.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())) ||
                                (employee.employeeName && employee.employeeName.toLowerCase().includes(searchTerm.toLowerCase()))
                            )
                            .map(employee => 
                            (
                                <tr key={employee.employeeCode}>
                                    <td>{employee.employeeCode}</td>
                                    <td>{employee.employeeName}</td>
                                    <td>{employee.gender}</td>
                                    <td>{formatDateForInput(employee.dateOfBirth)}</td>
                                    <td>{employee.phoneNumber}</td>
                                    <td>{employee.citizenIdentificationCard}</td>
                                    <td>{employee.role}</td>
                                    <td>{employee.workShifts}</td>
                                    <td>{formatDateForInput(employee.createdAt)}</td>
                                    <td>{formatDateForInput(employee.updatedAt)}</td>
                                    <td>
                                        <NavLink to={`/admin/Employee/Update/${employee.employeeCode}`} >
                                            <img src={require('../../assets/icon-edit-1.png')} alt='imgedit' style={{ width: '35px', marginRight: '10px' }} />
                                        </NavLink>

                                        <NavLink onClick={() => handleDelete(employee.employeeCode)}>
                                            <img src={require('../../assets/icon-delete-1.png')} alt='imgdelete' style={{ width: '15px' }} />
                                        </NavLink>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </Row>
        </Container >
    );
}

export default Employee