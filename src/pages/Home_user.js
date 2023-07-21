import React, {useEffect} from 'react';
import Navbars from '../components/Navbars';
import Sidebar_user from '../components/Sidebar_user';
import { Outlet } from 'react-router-dom';

function Home_user() {
    return (
        <div className="d-flex">
            <div className="w-auto bg-primary py-2">
                <Sidebar_user/>
            </div>
            <div className="col">
                <Navbars/>
                <Outlet />
            </div>
        </div>
     
    );
}
export default Home_user;
