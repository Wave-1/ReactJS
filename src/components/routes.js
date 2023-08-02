import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomeAdmin from '../pages/Home_admin';
import HomeUser from '../pages/Home_user';
import Employee from '../pages/admin/Employee';
import QuanLyChamCong from '../pages/admin/QuanLyChamCong';
import Thuong from '../pages/admin/Thuong';
import LichLamViec from '../pages/admin/LichLamViec';
import LienHe from '../pages/admin/LienHe';
import CreateEmployee from '../pages/admin/CreateEmployee';
import UpdateEmployee from '../pages/admin/UpdateEmployee';
import ThongTinNhanVienUser from '../pages/user/ThongTinNhanVien';
import ChamCong from '../pages/user/ChamCong';
import ThuongUser from '../pages/user/ThuongUser';
import LichLamViecUser from '../pages/user/LichLamViec';
import LienHeUser from '../pages/user/LienHe';
import QuanLyChamCongUser from '../pages/user/QuanLyChamCongUser';
import SuaUser from '../pages/user/SuaUser';


export const AdminRoutes = () => (
  <Routes>
    <Route path="/" element={<HomeAdmin />}>
      <Route index element={<Employee />} />
      <Route path="Employee" element={<Employee />} />
      <Route path="QuanLyChamCong" element={<QuanLyChamCong />} />
      <Route path="Thuong" element={<Thuong />} />
      <Route path="LichLamViec" element={<LichLamViec />} />
      <Route path="LienHe" element={<LienHe />} />
      <Route path="HoSo/CreateEmployee" element={<CreateEmployee />} />
      <Route path="HoSo/Update/:employeeCode" element={<UpdateEmployee />} />
    </Route>
  </Routes>
);

export const UserRoutes = () => (
  <Routes>
    <Route path="/" element={<HomeUser />}>
      <Route index element={<ChamCong />} />
      <Route path="ThongTinNhanVienUser" element={<ThongTinNhanVienUser />} />
      <Route path="QuanLyChamCongUser" element={<QuanLyChamCongUser />} />
      <Route path="ThuongUser" element={<ThuongUser />} />
      <Route path="LichLamViecUser" element={<LichLamViecUser />} />
      <Route path="LienHeUser" element={<LienHeUser />} />
      <Route path="ThongTinNhanVien/SuaUser" element={<SuaUser />} />
    </Route>
  </Routes>
);
