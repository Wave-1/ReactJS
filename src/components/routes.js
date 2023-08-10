import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomeAdmin from '../pages/Home_admin';
import HomeUser from '../pages/Home_user';
import Employee from '../pages/admin/Employee';
import TimeAttendanceManagement from '../pages/admin/TimeAttendanceManagement';
import CreateTimeAttendanceManagement from '../pages/admin/CreateTimeAttendanceManagement';
import UpdateTimeAttendanceManagement from '../pages/admin/UpdateTimeAttendanceManagement';
import SalaryBonus from '../pages/admin/SalaryBonus';
import WorkSchedule from '../pages/admin/WorkSchedule';
import CreateWorkSchedule from '../pages/admin/CreateWorkSchedule';
import UpdateWorkSchedule from '../pages/admin/UpdateWorkSchedule';
import Contact from '../pages/admin/Contact';
import SeeContact from '../pages/admin/SeeContact';
import CreateEmployee from '../pages/admin/CreateEmployee';
import UpdateEmployee from '../pages/admin/UpdateEmployee';
import TimeAttendance from '../pages/user/TimeAttendance';
import EmployeeInformation from '../pages/user/EmployeeInformation';
// import EmployeeEdit from '../pages/user/EmployeeEdit';
import UserTimeAttendanceManagement from '../pages/user/UserTimeAttendanceManagement';
import ThuongUser from '../pages/user/ThuongUser';
import UserWorkSchedule from '../pages/user/UserWorkSchedule';
import UserContact from '../pages/user/UserContact';


export const AdminRoutes = () => (
  <Routes>
    <Route path="/" element={<HomeAdmin />}>
      <Route index element={<Employee />} />
      <Route path="Employee" element={<Employee />} />
      <Route path="TimeAttendanceManagement" element={<TimeAttendanceManagement/>} />
      <Route path="TimeAttendanceManagement/Create" element={<CreateTimeAttendanceManagement/>}/>
      <Route path="TimeAttendanceManagement/Update/:id" element={<UpdateTimeAttendanceManagement/>} />
      <Route path="SalaryBonus" element={<SalaryBonus/>} />
      <Route path="WorkSchedule" element={<WorkSchedule/>} />
      <Route path="WorkSchedule/Create" element={<CreateWorkSchedule/>} />
      <Route path="WorkSchedule/Update/:id" element={<UpdateWorkSchedule/>} />
      <Route path="Contact" element={<Contact />} />
      <Route path="Contact/SeeContact/:id" element={<SeeContact />} />
      <Route path="Employee/Create" element={<CreateEmployee />} />
      <Route path="Employee/Update/:employeeCode" element={<UpdateEmployee />} />
    </Route>
  </Routes>
);

export const UserRoutes = () => (
  <Routes>
    <Route path="/" element={<HomeUser />}>
      <Route index element={<TimeAttendance/>} />
      <Route path="EmployeeInformation" element={<EmployeeInformation />} />
      {/* <Route path="EmployeeInformation/EmployeeEdit" element={<EmployeeEdit />} /> */}
      <Route path="TimeAttendanceManagement" element={<UserTimeAttendanceManagement />} />
      <Route path="ThuongUser" element={<ThuongUser />} />
      <Route path="UserWorkSchedule" element={<UserWorkSchedule />} />
      <Route path="UserContact" element={<UserContact/>} />
    </Route>
  </Routes>
);
