import React from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import '../../css/HoSo.css';
function HoSo() {
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
                            <th>Số CCCD</th>
                            <th>Chức vụ</th>
                            <th>Ca làm việc</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>BSBS03</td>
                            <td>Nguyễn Thanh Tâm</td>
                            <td>Nữ</td>
                            <td>20/11/2002</td>
                            <td>023456789</td>
                            <td>Phục vụ</td>
                            <td>Chiều, sáng </td>
                            <td>
                                <NavLink to='/admin/HoSo/Sua' >
                                    <img src={require('../../assets/icon-edit-1.png')} alt='imgedit' style={{ width: '35px' }} />
                                </NavLink>

                                <NavLink to='/admin/HoSo/Xoa' >
                                    <img src={require('../../assets/icon-delete-1.png')} alt='imgdelete' style={{ width: '15px' }} />
                                </NavLink>
                            </td>
                        </tr>

                        <tr>
                            <td>01QL</td>
                            <td>Nguyễn Minh Anh</td>
                            <td>Nam</td>
                            <td>05/04/2000</td>
                            <td>0715212121</td>
                            <td>Quản lý</td>
                            <td>Sáng , chiều</td>
                            <td>
                                <NavLink to='/admin/HoSo/Sua' >
                                    <img src={require('../../assets/icon-edit-1.png')} alt='imgedit' style={{ width: '35px' }} />
                                </NavLink>

                                <NavLink to='/admin/HoSo/Xoa' >
                                    <img src={require('../../assets/icon-delete-1.png')} alt='imgdelete' style={{ width: '15px' }} />
                                </NavLink>
                            </td>
                        </tr>

                        <tr>
                            <td>01QL</td>
                            <td>Nguyễn Minh Anh</td>
                            <td>Nam</td>
                            <td>05/04/2000</td>
                            <td>0715212121</td>
                            <td>Quản lý</td>
                            <td>Sáng , chiều</td>
                            <td>
                                <NavLink to='/admin/HoSo/Sua' >
                                    <img src={require('../../assets/icon-edit-1.png')} alt='imgedit' style={{ width: '35px' }} />
                                </NavLink>

                                <NavLink to='/admin/HoSo/xoa' >
                                    <img src={require('../../assets/icon-delete-1.png')} alt='imgdelete' style={{ width: '15px' }} />
                                </NavLink>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Row>
        </Container>
    )
}

export default HoSo