import Header from '../header/Index';
import Dashboard from './Dashboard';
import Panel from './Panel';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./dashboard.css"
export default function Index() {

    const [token, setToken] = useState(sessionStorage.getItem('sessionID') || null);
    const [user, setUser] = useState({});

    const navigate = useNavigate();

    useEffect(() => {

        if (token == null) {
            navigate('/signin');
            return;
        }

        axios.post(`${process.env.REACT_APP_BACKEND}/user`, {
            token: token,
        })
            .then((thisUser) => {
                if (thisUser.data) {
                    let firstName = thisUser.data.firstName;
                    if (firstName) setUser(thisUser.data);
                }
            })
            .catch((e) => {
                console.log("Catch in fetching user");
            });

    }, [token]);

    return (
        <>
            <Header />
            <div className='tab-wrapper'>
                <Dashboard firstName={user.firstName} />
                <Panel />
            </div>
        </>
    );
}