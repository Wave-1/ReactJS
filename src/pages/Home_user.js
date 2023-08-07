import React from 'react';
import Navbars from '../components/Navbars';
import SidebarUser from '../components/Sidebar_user';
import { Outlet } from 'react-router-dom';

function Home_user() {
    return (
        <div className="d-flex">
            <div className="w-auto bg-primary py-2">
                <SidebarUser/>
            </div>
            <div className="col">
                <Navbars/>
                <Outlet />
            </div>
        </div>
     
    );
}
export default Home_user;
