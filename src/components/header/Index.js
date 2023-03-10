import { useMemo } from 'react';

import Head from "./Head";
import Logged from './Logged';
import NotLogged from './NotLogged';
import './sidebar.css'
export default function Index() {

    const user = useMemo(() => {
        let sessionID = sessionStorage.getItem('sessionID');
        if (sessionID) return true;
        return false;
    });

    return (
        <div className='sidebar'>
            <Head />
            {(user == true) ? <Logged /> : <NotLogged />}
        </div>
    );
}