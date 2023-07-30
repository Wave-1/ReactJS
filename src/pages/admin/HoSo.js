import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import '../../css/HoSo.css';
import '../../apiConfig';
import axios from 'axios';

function HoSo() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/Employee')
            .then(response => setData(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <Container fluid>
            <Row className='border-bottom border-dark'>
                <Col><h2>Hồ Sơ</h2></Col>
            </Row>
            <Row xs="auto" className='border-bottom border-dark'>
                <Col >
                    <img src={require('../../assets/icon-plus.png')} alt='imgPlus' style={{ width: '35px' }} />
                    <NavLink to='/admin/HoSo/Them/' >Thêm</NavLink>
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
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(employee => {
                            const dateOfBirth = new Date(employee.dateOfBirth);
                            const formattedDateOfBirth = dateOfBirth.toLocaleDateString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' });
                            const datecreatedAt = new Date(employee.createdAt);
                            const formattedcreatedAt = datecreatedAt.toLocaleDateString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' });
                            return (
                                <tr key={employee.employeeCode}>
                                    <td>{employee.employeeCode}</td>
                                    <td>{employee.employeeName}</td>
                                    <td>{employee.gender}</td>
                                    <td>{formattedDateOfBirth}</td>
                                    <td>{employee.phoneNumber}</td>
                                    <td>{employee.citizenIdentificationCard}</td>
                                    <td>{employee.role}</td>
                                    <td>{employee.workShifts}</td>                                   
                                    <td>{formattedcreatedAt}</td>
                                    <td>
                                        <NavLink to='/admin/HoSo/Sua' >
                                            <img src={require('../../assets/icon-edit-1.png')} alt='imgedit' style={{ width: '35px' }} />
                                        </NavLink>

                                        <NavLink to='/admin/HoSo/Xoa' >
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

export default HoSo;
