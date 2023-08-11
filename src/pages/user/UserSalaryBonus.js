import { Container, Row, Col, Table } from 'react-bootstrap';
import '../../css/HoSo.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL, API_HEADERS, API_ROUTES } from '../../apiConfig';
function UserSalaryBonus() {
    const [employeeCode, setEmployeeCode] = useState('');
    const [employeeData, setEmployeeData] = useState([]);
    const [incomeData, setIncomeData] = useState([]);
    const [bonusData, setBonusData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const lemployeeCode = sessionStorage.getItem('EmployeeCode');
            if (lemployeeCode) {
                setEmployeeCode(lemployeeCode);
            }
            try {
                // Lấy dữ liệu từ bảng Employee dựa trên employeeCode
                const employeeResponse = await axios.get(
                    `${API_BASE_URL}${API_ROUTES.EMPLOYEE}?employeeCode=${employeeCode}`,
                    { headers: API_HEADERS }
                );
                setEmployeeData(employeeResponse.data);

                // Lấy dữ liệu từ bảng Income dựa trên employeeCode
                const incomeResponse = await axios.get(
                    `${API_BASE_URL}${API_ROUTES.Income}?employeeCode=${employeeCode}`,
                    { headers: API_HEADERS }
                );
                const newIncomeData = incomeResponse.data;
                setIncomeData(newIncomeData);


                if (newIncomeData.length > 0) {
                    // Lấy dữ liệu từ bảng SalaryBonus dựa trên [IncomeID] = [ID].[Income]
                    const bonusResponse = await axios.get(
                        `${API_BASE_URL}${API_ROUTES.SalaryBonus}?incomeID=${newIncomeData[0].id}`,
                        { headers: API_HEADERS }
                    );
                    const bonusDataR = bonusResponse.data;
                    setBonusData(bonusDataR);
                    //console.log(bonusDataR[1]);
                }

            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchData();
    }, [employeeCode]);

    return (
        <Container fluid>
            <Row className='border-bottom border-dark'>
                <Col><h2>Salary Bonus</h2></Col>
            </Row>
            <Row>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Employee Code</th>
                            <th>Employee Name</th>
                            <th>Role</th>
                            <th>Working Hours Completed</th>
                            <th>Salary Bonus</th>
                            <th>Total Income</th>
                            <th>Note</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeeData.map((employeeItem, index) => {
                            const matchingIncome = incomeData.find(incomeItem => incomeItem.employeeCode === employeeItem.employeeCode);
                            console.log('bonusData', bonusData);
                            const matchingBonus = bonusData[1]; // Lấy dòng thứ hai của mảng bonusData

                            return (
                                <tr key={index}>
                                    <td>{employeeItem.employeeCode}</td>
                                    <td>{employeeItem.employeeName}</td>
                                    <td>{employeeItem.role}</td>
                                    <td>{matchingIncome ? matchingIncome.workingHoursCompleted : null}</td>
                                    <td>{matchingBonus ? matchingBonus.salaryBonus : null}</td>
                                    <td>{matchingIncome ? matchingIncome.totalIncome : null}</td>
                                    <td>{matchingBonus ? matchingBonus.note : null}</td>
                                </tr>
                            );
                        })}
                    </tbody>

                </Table>
            </Row>
        </Container>
    );
}

export default UserSalaryBonus