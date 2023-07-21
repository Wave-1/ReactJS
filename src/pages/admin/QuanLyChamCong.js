import React from 'react'
import {Container, Row, Col, Table} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import '../../css/HoSo.css';
function QuanLyChamCong() {
    return (
        <Container fluid>
            <Row className='border-bottom border-dark'>
                <Col><h2>Lịch sử chấm công</h2></Col>
            </Row>
            <Row xs="auto" className='border-bottom border-dark'>
                <Col >
                    <img src={require('../../assets/icon-plus.png')} alt='imgPlus'style={{width:'35px'}}/>
                    <NavLink>Thêm</NavLink>
                </Col>
                {/* <Col>
                    <img src={require('../../assets/icon-edit.png')} alt='imgEdit'style={{width:'35px'}}/>
                    <NavLink >Xem và sửa</NavLink>
                </Col>
                <Col>
                    <img src={require('../../assets/icon-delete.png')} alt='imgDelete'style={{width:'35px'}}/>
                    <NavLink >Xóa</NavLink>
                </Col> */}
            </Row>
            <Row>
                <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>Mã nhân viên</th>
                        <th>Họ và tên</th>
                        <th>Check in</th>
                        <th>Check out</th>
                        <th>Ngày làm</th>
                        <th>Ca làm việc</th>
                        <th>Tổng thu nhập</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>BSBS03</td>
                        <td>Nguyễn Thanh Tâm</td>
                        <td>8:00AM</td>
                        <td>5:01PM</td>
                        <td>09/07/2023</td>
                        <td>Sáng,Chiều</td>
                        <td>...</td>
                        <td>
                            <a href='/admin/QuanLyChamCong/SuaChamCong/'><img src={require('../../assets/icon-edit-1.png')} alt='imgedit'style={{width:'35px'}}/></a>
                            <a><img src={require('../../assets/icon-delete-1.png')} alt='imgdelete'style={{width:'15px'}}/></a>
                        </td>
                    </tr>
                </tbody>
                </Table>
            </Row>
        </Container>
    )
}
export default QuanLyChamCong