import React from 'react'
import {Container, Row, Col, Table} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import '../../css/HoSo.css';
function LichLamViec() {
    return (
        <Container fluid>
            <Row className='border-bottom border-dark'>
                <Col><h2>Lịch làm việc</h2></Col>
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
                        <th>Ca làm</th>
                        <th>Giờ bắt đầu</th>
                        <th>Giờ kết thúc</th>
                        <th>Ngày làm</th>
                        <th>Chức vụ</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>BSBS03</td>
                        <td>Nguyễn Thanh Tâm</td>
                        <td>Sáng,Chiều</td>
                        <td>8:00AM</td>
                        <td>5:00PM</td>
                        <td>09/07/2023</td>
                        <td>Phục vụ</td>
                        <td>
                            <a href='/admin/LichLamViec/SuaLich/'><img src={require('../../assets/icon-edit-1.png')} alt='imgedit'style={{width:'35px'}}/></a>
                            <a ><img src={require('../../assets/icon-delete-1.png')} alt='imgdelete'style={{width:'15px'}}/></a>
                        </td>
                    </tr>
                </tbody>
                </Table>
            </Row>
        </Container>
    )
}
export default LichLamViec

