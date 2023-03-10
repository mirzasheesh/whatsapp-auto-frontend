import Notification from '../notification/Notification';

import axios from 'axios';
import { useState } from 'react';

export default function CustomerNew() {

    const [customerFirstName, setFirstName] = useState("");
    const [customerLastName, setLastName] = useState("");
    const [customerNumber, setNumber] = useState("");
    const [notification, setNotification] = useState("");

    function submit() {

        if (!customerFirstName || customerFirstName.trim().length <= 1) {

            setNotification("First name is not valid");
            setTimeout(() => setNotification(""), 1000);
            return;
        }

        if (!customerNumber || customerNumber.length <= 10) {

            setNotification("Phone number is not valid");
            setTimeout(() => setNotification(""), 1000);
            return;
        }

        axios.post(`${process.env.REACT_APP_BACKEND}/customer`, {
            token: `${sessionStorage.getItem('sessionID')}`,
            firstName: customerFirstName,
            lastName: customerLastName,
            phoneNumber: customerNumber,
        })
            .then((r) => {
                if (r.data.status === "success") {
                    setFirstName("");
                    setLastName("");
                    setNumber("");
                    setNotification("Phone number successfully added");
                    setTimeout(() => setNotification(""), 1000);
                }
            })
            .catch((e) => {
                setNotification("Something has gone wrong during the process of adding a new customer");
                setTimeout(() => setNotification(""), 1000);
            });
    }

    return (
        <>
            <div className="newCustomer">
                <label>First Name: </label>
                <input onChange={(e) => setFirstName(e.target.value)} value={customerFirstName} />
                <label>Last Name: </label>
                <input onChange={(e) => setLastName(e.target.value)} value={customerLastName} />
                <label>Phone Number: </label>
                <input onChange={(e) => setNumber(e.target.value)} value={customerNumber} />
                <button onClick={() => submit()}>Submit</button>
            </div>
            <div style={{ textAlign: "center" }}>
                {(notification != "") ? <Notification reason={notification} /> : null}
            </div>
        </>
    );
}