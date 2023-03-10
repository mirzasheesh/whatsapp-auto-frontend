import { validName, validEmail, validPassword } from '../validators/signining';
import Notification from '../notification/Notification';

import axios from 'axios';
import { useCallback, useState } from "react";
import { useNavigate } from 'react-router-dom';
import 'animate.css';
import "./signup.css"
export default function Sign() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [notification, setNotification] = useState("");

    const navigate = useNavigate();

    const submit = useCallback(() => {

        if (!validName(firstName)) {
            setNotification("First name is too short");
            setTimeout(() => setNotification(""), 1000);
            return;
        }

        if (!validName(lastName)) {
            setNotification("Last name is too short");
            setTimeout(() => setNotification(""), 1000);
            return;
        }

        if (!validEmail(email)) {
            setNotification("Email is not valid");
            setTimeout(() => setNotification(""), 1000);
            return;
        }

        if (!validPassword(password)) {
            setNotification("Password must have 8 or more characters");
            setTimeout(() => setNotification(""), 1000);
            return;
        }

        if (password != confirm) {
            setNotification("Both password are not same");
            setTimeout(() => setNotification(""), 1000);
            return;
        }

        axios.post(`${process.env.REACT_APP_BACKEND}/auth/signup`, {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        })
            .then((r) => {
                if (r.data.status === "success") {
                    setNotification("Account has been created successfully");
                    setTimeout(() => navigate('/signin'), 5000);
                }
            }).catch((e) => {
                if (e.response) {
                    if (e.response.data.status === 'error') {
                        setNotification("Account with this email address already exists");
                        setTimeout(() => setNotification(""), 1000);
                    }
                }
            });
    });

    return (
        <div className="wrapper ">
            <div className='sign-up animate__animated animate__backInLeft'>
                <h2 className=' signup-title '>Signup</h2>
                <div style={{ position: "relative", height: "20px" }}>

                    {(notification != "") ? <Notification className="notification animate__animated animate__shakeX" reason={notification} /> : null}
                </div>
                <input type="text" placeholder="Enter First Name" value={firstName} onChange={(thisEv) => setFirstName(thisEv.target.value)} />
                <input type="text" placeholder="Enter Last Name" value={lastName} onChange={(thisEv) => setLastName(thisEv.target.value)} />
                <input type="text" placeholder="Enter Email" value={email} onChange={(thisEv) => setEmail(thisEv.target.value)} />
                <input type="password" placeholder="Enter Password" value={password} onChange={(thisEv) => setPassword(thisEv.target.value)} />
                <input type="password" placeholder="Confirm Password" value={confirm} onChange={(thisEv) => setConfirm(thisEv.target.value)} />
                <button className='sign-up-button' onClick={() => submit()}>Signup</button>
                <p className='already'>Already have an account? <a onClick={() => navigate('/signin')}>Login</a></p>
            </div>
        </div>
    );
}