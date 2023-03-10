import BackToHome from '../buttons/BackToHome';
import Sign from './Sign';

import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function Index() {

    const navigate = useNavigate();

    useEffect(() => {
        let sessionID = sessionStorage.getItem('sessionID');
        if (sessionID) navigate('/dashboard');
    }, []);

    return (
        <>
            {/* <BackToHome /> */}
            <Sign />
        </>
    );
}