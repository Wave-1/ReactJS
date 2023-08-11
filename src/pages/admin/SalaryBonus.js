import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL, API_ROUTES, API_HEADERS } from '../../apiConfig';
import '../../css/HoSo.css';

function Thuong() {
    const navigate = useNavigate();
    const [incomeData, setIncomeData] = useState([]); // Lưu dữ liệu Income
    const [bonusData, setBonusData] = useState([]);
    const [employeeData, setEmployeeData] = useState([]);
    const calculateSalary = (position, workHours, incomeData) => {
        const positionKey = position.toLowerCase();
        const hourlyRate = incomeData[0][positionKey];
        return hourlyRate * workHours;
    };
    
    function calculateWorkHours(checkIn, checkOut) {
        const checkInTime = new Date(checkIn);
        const checkOutTime = new Date(checkOut);
        const timeDiff = checkOutTime - checkInTime;
        const minutesWorked = Math.floor(timeDiff / (1000 * 60)); 
        return minutesWorked;
    }  
    useEffect(() => {
        async function fetchData() {
            try {
                // Lấy dữ liệu từ các bảng
                const incomeResponse = await axios.get(`${API_BASE_URL}${API_ROUTES.Income}`, { headers: API_HEADERS });
                const employeeResponse = await axios.get(`${API_BASE_URL}${API_ROUTES.EMPLOYEE}`, { headers: API_HEADERS });
    
                setIncomeData(incomeResponse.data);
                setEmployeeData(employeeResponse.data);
    
                // Tạo mới hàng dữ liệu trong bảng SalaryBonus nếu chưa tồn tại
                for (const incomeItem of incomeResponse.data) {
                    const existingBonus = await axios.get(`${API_BASE_URL}${API_ROUTES.SalaryBonus}?incomeID=${incomeItem.id}`, { headers: API_HEADERS });
                    console.log(existingBonus)
                    if (existingBonus.data.length === 0) {
                        const newBonus = {
                            IncomeID: incomeItem.id,
                            SalaryBonus: '0', // Thay đổi giá trị tùy theo nhu cầu
                            Note: 'Chưa duyệt'
                        };
                        await axios.post(`${API_BASE_URL}${API_ROUTES.SalaryBonus}`, newBonus, { headers: API_HEADERS });
                        console.log('post tc')
                        break; // Kết thúc vòng lặp sau khi tạo một hàng dữ liệu mới
                    }
                }
    
                // Lấy dữ liệu từ bảng SalaryBonus sau khi đã tạo mới
                const bonusResponse = await axios.get(`${API_BASE_URL}${API_ROUTES.SalaryBonus}`, { headers: API_HEADERS });
                setBonusData(bonusResponse.data);

            //      // Tính TotalIncome và cập nhật dữ liệu trong mảng bonusResponsedata
            //     const bonusResponsedata = bonusResponse.data.map((bonusItem) => {
            //     const matchingIncome = incomeResponse.data.find((income) => income.id === bonusItem.IncomeID);
            //     const hourlyRate = matchingIncome?.workingHoursCompleted;
            //     const totalIncome = Number(bonusItem.SalaryBonus) * Number(hourlyRate);
            //     console.log(matchingIncome)
            //     return { ...bonusItem, totalIncome };
            // });

            // setBonusData(bonusResponsedata);

            

            } catch (error) {
                console.error('Error:', error);
            }
        }
    
        fetchData();
    }, []);
    

    return (
        <Container fluid>
            <Row className='border-bottom border-dark'>
                <Col><h2>Salary Bonus</h2></Col>
            </Row>
            <Row xs="auto" className='border-bottom border-dark'>
                <Col >
                    <img src={require('../../assets/icon-plus.png')} alt='imgPlus' style={{ width: '35px' }} />
                    <NavLink>Create</NavLink>
                </Col>
            </Row>
            <Row>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>EmployeeCode</th>
                            <th>EmployeeName</th>
                            <th>Role</th>
                            <th>WorkingHoursCompleted</th>
                            <th>SalaryBonus</th>
                            <th>TotalIncome</th>
                            <th>Note</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {incomeData.map((incomeItem, index) => {
                            const bonusItem = bonusData[index];
                            const employeeItem = employeeData.find(item => item.employeeCode === incomeItem.employeeCode);
                        return (
                            <tr key={index}>
                                <td>{incomeItem.employeeCode}</td>
                                <td>{employeeItem ? employeeItem.employeeName : null}</td>
                                <td>{employeeItem ? employeeItem.role : null}</td>
                                <td>{incomeItem.workingHoursCompleted}</td>
                                <td>{bonusItem ? bonusItem.salaryBonus : null}</td>
                                <td>{incomeItem.totalIncome}</td>
                                <td>{bonusItem ? bonusItem.note : null}</td>    
                                <td>
                                    <NavLink to={`/admin/SalaryBonus/Update/${bonusItem ? bonusItem.id : ''}`} >
                                        <img src={require('../../assets/icon-edit-1.png')} alt='imgedit' style={{ width: '35px', marginRight: '10px' }} />
                                    </NavLink>
                                    <NavLink>
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

export default Thuong;
