import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Nav.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import NavLink from 'react-bootstrap/esm/NavLink';
function Navbars() {
    const [displayUsername, displayUsernameUpdate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        let EmployeeCode = sessionStorage.getItem('EmployeeCode');
        if (EmployeeCode === '' || EmployeeCode === null) {
            navigate('/login');
        } else {
            displayUsernameUpdate(EmployeeCode);
        }
    }, [navigate]);

    return (
        <Navbar expand="lg" className="bg-primary">
            <Container fluid>
                <Navbar.Brand></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Item></Nav.Item>
                    </Nav>
                    <Nav className="justify-content-end">
                        <Navbar.Text className='text-white pe-5'>
                            <img src={require('../assets/icon-user.png')} alt='imgUser' className='pe-2' />{displayUsername}
                        </Navbar.Text>
                        <div className="vr" />
                        <NavLink href="/login" className='text-white pe-5'>Thoát
                            <img src={require('../assets/icon-leave.png')} alt='imgLogout' />
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navbars;