import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL, API_ROUTES, API_HEADERS } from '../../apiConfig';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function UpdateSalaryBonus() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({
        employeeCode: '',
        workingHoursCompleted: '',
        salaryBonus: '',
        note: ''
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const bonusResponse = await axios.get(`${API_BASE_URL}${API_ROUTES.SalaryBonus}/${id}`, { headers: API_HEADERS });
                const bonusItem = bonusResponse.data;

                const { incomeID, salaryBonus, note } = bonusItem;

                const incomeResponse = await axios.get(`${API_BASE_URL}${API_ROUTES.Income}?id=${incomeID}`, { headers: API_HEADERS });
                const incomeItem = incomeResponse.data[0];

                setData({
                    employeeCode: incomeItem.employeeCode,
                    workingHoursCompleted: incomeItem.workingHoursCompleted,
                    salaryBonus: salaryBonus,
                    note: note
                });
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(
                `${API_BASE_URL}${API_ROUTES.SalaryBonus}/${id}`,
                data,
                { headers: API_HEADERS }
            );

            toast.success('Salary bonus updated successfully');
            navigate('/admin/SalaryBonus');
        } catch (err) {
            console.error('Error updating salary bonus:', err);
            toast.error('Error when updating salary bonus');
        }
    };

    const handleCancel = () => {
        if (window.confirm('Are you sure you want to cancel?')) {
            navigate('/admin/SalaryBonus');
        }
    };

    return (
        <Container fluid>
            <Row className='border-bottom border-dark'>
                <Col>
                    <h2>Update Salary Bonus</h2>
                </Col>
            </Row>

            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group className="mb-3" controlId="employeeCode">
                        <Form.Label>Employee Code(*)</Form.Label>
                        <Form.Control
                            type="text"
                            name="employeeCode"
                            value={data.employeeCode}
                            onChange={handleChange}
                            disabled
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="workingHoursCompleted">
                        <Form.Label>Working Hours Completed</Form.Label>
                        <Form.Control
                            type="text"
                            name="workingHoursCompleted"
                            value={data.workingHoursCompleted}
                            onChange={handleChange}
                            disabled
                        />
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3" controlId="salaryBonus">
                    <Form.Label>Salary Bonus</Form.Label>
                    <Form.Control
                        type="text"
                        name="salaryBonus"
                        value={data.salaryBonus}
                        onChange={handleChange}
                        //required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="note">
                    <Form.Label>Note</Form.Label>
                    <Form.Select
                        name="note"
                        value={data.note}
                        onChange={handleChange}
                    >
                        <option value="Đã duyệt">Đã duyệt</option>
                        <option value="Chưa duyệt">Chưa duyệt</option>
                    </Form.Select>
                </Form.Group>
                <Row>
                    <Col>
                        <Button variant="primary" type="submit">
                            Update
                        </Button>
                    </Col>
                    <Col>
                        <Button className='bg-danger' variant="primary" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}

export default UpdateSalaryBonus;
