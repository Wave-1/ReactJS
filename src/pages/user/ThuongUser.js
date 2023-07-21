import React from 'react'
import {Container, Row, Col, Table} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import '../../css/HoSo.css';
function ThuongUser() {
    return (
        <Container fluid>
            <Row className='border-bottom border-dark'>
                <Col><h2>Thưởng</h2></Col>
            </Row>
            <Row>
                <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>Mã nhân viên</th>
                        <th>Họ và tên</th>
                        <th>Chức Vụ</th>
                        <th>Vi Phạm</th>
                        <th>Giờ làm</th>
                        <th>Thưởng</th>
                        <th>Chú thích</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>BSBS03</td>
                        <td>Nguyễn Thanh Tâm</td>
                        <td>Phục vụ</td>
                        <td>0</td>
                        <td>9</td>
                        <td>5%</td>
                        <td>có</td>
                    </tr>
                </tbody>
                </Table>
            </Row>
        </Container>
    )
}
export default ThuongUser