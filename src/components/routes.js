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
import LienHe from '../pages/admin/LienHe';
import CreateEmployee from '../pages/admin/CreateEmployee';
import UpdateEmployee from '../pages/admin/UpdateEmployee';
import TimeAttendance from '../pages/user/TimeAttendance';
import ThongTinNhanVienUser from '../pages/user/ThongTinNhanVien';
import UserTimeAttendanceManagement from '../pages/user/UserTimeAttendanceManagement';
import ThuongUser from '../pages/user/ThuongUser';
import LichLamViecUser from '../pages/user/LichLamViec';
import LienHeUser from '../pages/user/LienHe';
import SuaUser from '../pages/user/SuaUser';


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
      <Route path="LienHe" element={<LienHe />} />
      <Route path="HoSo/Create" element={<CreateEmployee />} />
      <Route path="HoSo/Update/:employeeCode" element={<UpdateEmployee />} />
    </Route>
  </Routes>
);

export const UserRoutes = () => (
  <Routes>
    <Route path="/" element={<HomeUser />}>
      <Route index element={<TimeAttendance/>} />
      <Route path="ThongTinNhanVienUser" element={<ThongTinNhanVienUser />} />
      <Route path="TimeAttendanceManagement" element={<UserTimeAttendanceManagement />} />
      <Route path="ThuongUser" element={<ThuongUser />} />
      <Route path="LichLamViecUser" element={<LichLamViecUser />} />
      <Route path="LienHeUser" element={<LienHeUser />} />
      <Route path="ThongTinNhanVien/SuaUser" element={<SuaUser />} />
    </Route>
  </Routes>
);
