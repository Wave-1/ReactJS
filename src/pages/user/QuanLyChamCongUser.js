import React from 'react'
import {Container, Row, Col, Table} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import '../../css/HoSo.css';
function QuanLyChamCongUser() {
    return(
        <Container fluid>
            <Row className='border-bottom border-dark'>
                <Col><h2>Lịch sử chấm công</h2></Col>
            </Row>
            <Row>
                <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>Mã nhân viên</th>
                        <th>Họ và tên</th>                     
                        <th>Giờ bắt đầu</th>
                        <th>Giờ kết thúc</th>
                        <th>Ngày làm</th>
                        <th>Ca làm việc</th>
                        <th>Thu nhập</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>BSBS03</td>
                        <td>Nguyễn Thanh Tâm</td>
                        <td>8:00AM</td>
                        <td>5:00PM</td>
                        <td>09/07/2023</td>                    
                        <td>Sáng,Chiều</td>
                        <td>...</td>
                    </tr>
                </tbody>
                </Table>
            </Row>
            <Row>
                <Col>
                <NavLink to ='/user' >Chấm công</NavLink>
                </Col>
            </Row>
        </Container>
        )
}
export default QuanLyChamCongUser