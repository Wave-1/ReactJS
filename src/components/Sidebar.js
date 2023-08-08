import React from 'react';
import '../css/Sidebar.css';
import Container from 'react-bootstrap/Container';
import NavLink from 'react-bootstrap/esm/NavLink';
import Nav from 'react-bootstrap/Nav';
const Sidebar = () => {
  return (
    <div className='sidebar vh-100'>
    <Container fluid>
        <NavLink className="navbar-brand border-bottom-dark" href='/admin'>Acacia</NavLink>
        <div className='row'>
            <Nav className='flex-column'>
            <div className='menu'>
                <p>Menu</p>
            </div>
            <Nav.Item>
                <Nav.Link href='/admin/Employee' className='text-white border-bottom border-dark'>List Of Employee</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href='/admin/TimeAttendanceManagement' className='text-white border-bottom border-dark'>Time Attendance Management</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href='/admin/SalaryBonus' className='text-white border-bottom border-dark'>Salary Bonus</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href='/admin/WorkSchedule' className='text-white border-bottom border-dark'>Work Schedule</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href='/admin/LienHe' className='text-white'>Liên hệ</Nav.Link>
            </Nav.Item> 
            </Nav>
            
        </div>
    </Container>
    </div>
  )
}

export default Sidebar