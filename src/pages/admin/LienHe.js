import React from 'react'
import {Container, Row, Col, Table} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import '../../css/HoSo.css';
function LienHe() {
    return(
        <Container fluid>
            <Row className='border-bottom border-dark'>
                <Col><h2>Liên Hệ</h2></Col>
            </Row>
            <Row>
                <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>Họ và tên</th>                     
                        <th>Email</th>
                        <th>Nội Dung</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Nguyễn Thanh Tâm</td>
                        <td>NTT@gmail.com</td>  
                        <td>Nội dung .....</td>         
                    </tr>
                </tbody>
                </Table>
            </Row>
        </Container>
        )
}
export default LienHe