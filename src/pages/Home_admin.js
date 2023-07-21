import React, {useEffect} from 'react';
import Navbars from '../components/Navbars';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

function Home_admin() {
    return (
        <div className="d-flex">
            <div className="w-auto bg-primary py-2">
                <Sidebar/>
            </div>
            <div className="col">
                <Navbars/>
                <Outlet />
            </div>
        </div>
    );
}
export default Home_admin;

