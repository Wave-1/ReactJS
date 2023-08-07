import React from 'react';
import '../css/Sidebar.css';
import Container from 'react-bootstrap/Container';
import NavLink from 'react-bootstrap/esm/NavLink';
import Nav from 'react-bootstrap/Nav';
const Sidebar_user = () => {
  return (
    <div className='sidebar vh-100'>
    <Container fluid>
        <NavLink className="navbar-brand border-bottom-dark" href='/user'>Acacia</NavLink>
        <div className='row'>
            <Nav className='flex-column'>
            <div className='menu'>
                <p>Menu</p>
            </div>
            <Nav.Item>
                <Nav.Link href='/user/ThongTinNhanVienUser' className='text-white border-bottom border-dark'>Thông tin nhân viên</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href='/user/TimeAttendanceManagement' className='text-white border-bottom border-dark'>Time Attendance Management</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href='/user/ThuongUser' className='text-white border-bottom border-dark'>Thưởng</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href='/user/LichLamViecUser' className='text-white border-bottom border-dark'>Lich làm việc</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href='/user/LienHeUser' className='text-white'>Liên hệ</Nav.Link>
            </Nav.Item> 
            </Nav>
            
        </div>
    </Container>
    </div>
  )
}

export default Sidebar_user