import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Container, Button, FormGroup } from 'react-bootstrap';
import '../../css/HoSo.css';
import { useNavigate, useParams } from 'react-router-dom';
import { API_BASE_URL, API_ROUTES, API_HEADERS } from '../../apiConfig';
import axios from 'axios';

function UserContact() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({
        employeeCode: '',
        employeeName: '',
        email: '',
        content: '',
    });

    const handleCancel = () => {
        if (window.confirm('Are you sure you want to cancel ?')) {
            navigate('../Contact');
        }
    }

    useEffect(() => {
        axios
            .get(`${API_BASE_URL}${API_ROUTES.Contact}/${id}`,{
                headers: API_HEADERS
            })
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
    }, [id]);

    return (
        <Container fluid>
            <Row className='border-bottom border-dark'>
                <Col>
                    <h2>Contact</h2>
                </Col>
            </Row>
            <Form>
                <Row className='mb-3'>
                    <FormGroup>
                        <Form.Group className='mb-3' controlId='employeeCode'>
                            <Form.Label>Employee Code</Form.Label>
                            <Form.Control
                                value={data.employeeCode}
                                required
                                disabled
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='employeeName'>
                            <Form.Label>Employee Name</Form.Label>
                            <Form.Control
                                type='text'
                                value={data.employeeName}
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
                                required
                                disabled
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
                                required
                                disabled
                            />
                        </Form.Group>
                        <Button variant='primary' type='submit' onClick={handleCancel}>
                            Cancel
                        </Button>
                    </FormGroup>
                </Row>
            </Form>
        </Container>
    );
}

export default UserContact;
