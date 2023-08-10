import React, { useState } from 'react';
import { Row, Col, Form, Container, Button, FormGroup } from 'react-bootstrap';
import '../../css/HoSo.css';
import { toast } from 'react-toastify';
import { API_BASE_URL, API_ROUTES, API_HEADERS } from '../../apiConfig';
import axios from 'axios';

function UserContact() {

    const employeeCode = sessionStorage.getItem('EmployeeCode');
    const employeeName = sessionStorage.getItem('EmployeeName');

    const [data, setData] = useState({
        employeeCode: employeeCode || '',
        employeeName: employeeName || '',
        email: '',
        content: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newContactData = {
                employeeCode: data.employeeCode,
                employeeName: data.employeeName,
                email: data.email,
                content: data.content,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            const response = await axios.post(
                API_BASE_URL + API_ROUTES.Contact,
                newContactData,
                {
                    headers: API_HEADERS,
                }
            );

            console.log('Response:', response.data);
            toast.success('Successfully added Contact');
        } catch (err) {
            console.error('Error added Contact:', err);
            toast.error('Error added Contact !!!');
        }
    };

    return (
        <Container fluid>
            <Row className='border-bottom border-dark'>
                <Col>
                    <h2>Contact</h2>
                </Col>
            </Row>
            <Form onSubmit={handleSubmit}>
                <Row className='mb-3'>
                    <FormGroup>
                        <Form.Group className='mb-3' controlId='employeeCode'>
                            <Form.Label>Employee Code</Form.Label>
                            <Form.Control
                                value={data.employeeCode}
                                onChange={handleChange}
                                required
                                disabled
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='employeeName'>
                            <Form.Label>Employee Name</Form.Label>
                            <Form.Control
                                type='text'
                                value={data.employeeName}
                                onChange={handleChange}
                                required
                                disabled
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='email'
                                name='email'
                                value={data.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='content'>
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as='textarea'
                                rows={9}
                                style={{
                                    resize: 'none',
                                    width: '100%',
                                    height: '200px',
                                    border: '1px solid #ccc',
                                }}
                                name='content'
                                value={data.content}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button variant='primary' type='submit'>
                            Send Message
                        </Button>
                    </FormGroup>
                </Row>
            </Form>
        </Container>
    );
}

export default UserContact;
