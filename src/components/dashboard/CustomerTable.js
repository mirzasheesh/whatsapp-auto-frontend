import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from "react";
import SendBox from "./SendBox";

export default function CustomerTable() {

    const [contacts, setContacts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        let cache = sessionStorage.getItem('contacts');

        if (cache) {
            cache = JSON.parse(cache).customers;
            if (Array.isArray(cache) && cache.length > 0) setContacts(cache);
        }

        axios.post(`${process.env.REACT_APP_BACKEND}/customer/a`, {
            token: `${sessionStorage.getItem('sessionID')}`,
        })
            .then((r) => {
                if (r.data.customers) {
                    sessionStorage.setItem('contacts', JSON.stringify({
                        customers: r.data.customers,
                    }));
                    setContacts(r.data.customers);
                }
            })
            .catch((e) => null);
    }, []);

    const connect = useCallback((phoneNumber, name) => {

        let a = document.getElementById('3');
        a.click();

        setTimeout(() => {

            let b = document.getElementById(Number(phoneNumber));

            if (b) {

                b.click();
                return;
            }

            let x = confirm(`Say Hi to ${name}`);

            if(!x) return;

            axios.post(`${process.env.REACT_APP_BACKEND}/message/transmit`, {
                token: `${sessionStorage.getItem('sessionID')}`,
                toPhone: phoneNumber,
                text: 'Hi',
            })
            .then((r) => {
                if (r.data.status === 'success') {

                    setTimeout(() => {

                        let b = document.getElementById(Number(phoneNumber));
                        b.click();
                        return;
                    }, 500);
                }
            })
            .catch((e) => alert('Error in sending the message to this user'));

            return;
        }, 500);

        return;
    });

    return (
        <div className="customerTable">
            <table>
                <tbody>
                    <tr>
                        <th>Customer Name</th>
                        <th>Phone Number</th>
                        <th>Contact</th>
                    </tr>
                    {(contacts.length > 0) ? contacts.map((person) => <tr key={person.phoneNumber} ><td>{person.customerName}</td><td>{person.phoneNumber}</td><td><button onClick={() => connect(person.phoneNumber, person.customerName)}>Connect</button></td></tr>) : null}
                </tbody>
            </table>
        </div>
    );
}