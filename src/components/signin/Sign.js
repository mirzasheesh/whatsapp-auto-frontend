import { validEmail, validPassword } from '../validators/signining';
import Notification from '../notification/Notification';

import axios from 'axios';
import { useCallback, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./sign-in.css"

export default function Sign() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [notification, setNotification] = useState("");

    const navigate = useNavigate();

    const submit = useCallback(() => {

        if (!validEmail(email)) {
            setNotification("Email is not valid");
            setTimeout(() => setNotification(""), 1000);
            return;
        }

        if (!validPassword(password)) {
            setNotification("Password is not valid");
            setTimeout(() => setNotification(""), 1000);
            return;
        }

        axios.post(`${process.env.REACT_APP_BACKEND}/auth/signin`, {
            email: email,
            password: password,
        })
            .then((r) => {
                if (r.data.status === "success") {
                    sessionStorage.setItem('sessionID', r.data.token);
                    navigate('/dashboard');
                }
            })
            .catch((e) => {
                setNotification("Invalid credentials");
                setTimeout(() => setNotification(""), 3000);
            });
    });

    return (
        <div className='wrapper'>
            <div className='sign-in animate__animated animate__backInLeft'>
                <h2>Login</h2>
                <div style={{ position: "relative", height: "20px" }}>
                    {(notification != "") ? <Notification className="notification animate__animated animate__shakeX" reason={notification} /> : null}
                </div>
                <input type="text" placeholder="Enter Email" value={email} onChange={(thisEv) => setEmail(thisEv.target.value)} />
                <input type="password" placeholder="Enter Password" value={password} onChange={(thisEv) => setPassword(thisEv.target.value)} />
                <button className='sign-in-button' onClick={() => submit()}>Login</button>
                <p className='no-account'>Don't have an account? <a onClick={() => navigate('/signup')}>Signup</a></p>
            </div>
        </div>
    );
}