import React from 'react'
import {Container, Row, Col, Table} from 'react-bootstrap';
import '../../css/HoSo.css';
function LichLamViecUser() {
    return(
        <Container fluid>
            <Row className='border-bottom border-dark'>
                <Col><h2>Lịch làm việc</h2></Col>
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
                        <th>Chức vụ</th>
                        <th>Ca làm việc</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>BSBS03</td>
                        <td>Nguyễn Thanh Tâm</td>
                        <td>8:00AM</td>
                        <td>5:00PM</td>
                        <td>09/07/2023</td>
                        <td>Phục vụ</td>                       
                        <td>Sáng,Chiều</td>
                    </tr>
                </tbody>
                </Table>
            </Row>
        </Container>
        )
}
export default LichLamViecUser