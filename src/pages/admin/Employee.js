import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../css/HoSo.css';
import '../../apiConfig';
import axios from 'axios';
function Employee() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/Employee');
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
                const response = await axios.delete(`/Employee/${employeeCode}`);
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
                <Col><h2>Hồ Sơ</h2></Col>
            </Row>
            <Row xs="auto" className='border-bottom border-dark'>
                <Col >
                    <img src={require('../../assets/icon-plus.png')} alt='imgPlus' style={{ width: '35px' }} />
                    <NavLink to='/admin/HoSo/Create/' >Thêm</NavLink>
                </Col>
            </Row>
            <Row>
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>Mã nhân viên</th>
                            <th>Họ và tên</th>
                            <th>Giới tính</th>
                            <th>Ngày sinh</th>
                            <th>Số điện thoại</th>
                            <th>Số CCCD</th>
                            <th>Chức vụ</th>
                            <th>Ca làm việc</th>
                            <th>Ngày tạo</th>
                            <th>Update</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(employee => {
                            return (
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
                                        <NavLink to={`/admin/HoSo/Update/${employee.employeeCode}`} >
                                            <img src={require('../../assets/icon-edit-1.png')} alt='imgedit' style={{ width: '35px', marginRight: '10px'}} />
                                        </NavLink>

                                        <NavLink onClick={() => handleDelete(employee.employeeCode)}>
                                            <img src={require('../../assets/icon-delete-1.png')} alt='imgdelete' style={{ width: '15px' }} />
                                        </NavLink>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Row>
        </Container >
    );
}

export default Employee