import React from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import '../../css/HoSo.css';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify'
import { API_BASE_URL, API_ROUTES, API_HEADERS } from '../../apiConfig';
import axios from 'axios';
import Search from '../../components/Search';
import '../../css/HoSo.css';
function Contact() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(API_BASE_URL + API_ROUTES.Contact, {
                    headers: API_HEADERS
                });
                setData(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const formatDateForInput = (dateString) => {
        if (!dateString) return ''; // Handle empty date
        const date = new Date(dateString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this Contact ?')) {
            try {
                const response = await axios.delete(`${API_BASE_URL}${API_ROUTES.Contact}/${id}`, {
                    headers: API_HEADERS
                });
                console.log(response.data);
                toast.success('Successfully deleted Contact');
                const updatedData = data.filter((i) => i.id !== id);
                setData(updatedData);
            } catch (err) {
                console.error('Error deleting Contact:', err);
                toast.error('Error when deleting Contact !!!');
            }
        }
    };
    return (
        <Container fluid>
            <Row className='border-bottom border-dark'>
                <Col><h2>Contact</h2></Col>
                <Col>
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </Col>
            </Row>
            <Row>
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>Employee Code</th>
                            <th>Employee Name</th>
                            <th>Email</th>
                            <th>Content</th>
                            <th>Created at</th>
                            <th>Updated at</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data
                            .filter((employee) =>
                                searchTerm.toLowerCase() === '' ||
                                (employee.employeeCode && employee.employeeCode.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())) ||
                                (employee.employeeName && employee.employeeName.toLowerCase().includes(searchTerm.toLowerCase()))
                            )
                            .map(i => {
                                return (
                                    <tr key={i.id}>
                                        <td>{i.employeeCode}</td>
                                        <td>{i.employeeName}</td>
                                        <td>{i.email}</td>
                                        <td className="truncate-text">{i.content}</td>
                                        <td>{formatDateForInput(i.createdAt)}</td>
                                        <td>{formatDateForInput(i.updatedAt)}</td>
                                        <td>
                                            <NavLink to={`/admin/Contact/SeeContact/${i.id}`} >
                                                <img src={require('../../assets/icon-Vector.png')} alt='imgedit' style={{ width: '25px', marginRight: '20px' }} />
                                            </NavLink>
                                            <NavLink onClick={() => handleDelete(i.id)}>
                                                <img src={require('../../assets/icon-delete-1.png')} alt='imgdelete' style={{ width: '15px' }} />
                                            </NavLink>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </Table>
            </Row>
        </Container>
    )
}
export default Contact