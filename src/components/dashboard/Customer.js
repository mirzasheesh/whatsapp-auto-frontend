import CustomerNew from './CustomerNew';
import CustomerTable from './CustomerTable';

import { useState } from "react";
import ImportCSV from './ImportCSV';

export default function Customer() {

    const [newContact, setNewContact] = useState(false);

    return (
        <div className="customerSection">
            <h4>Manage Your Customer's</h4>
            <div className='TwoBuns'>
                <button className='contact-button' onClick={() => (newContact) ? setNewContact(false) : setNewContact(true)} >{(newContact) ? "List Customers" : "New Customer"}</button>
                <ImportCSV />
            </div>
            {(newContact) ? <CustomerNew /> : <CustomerTable />}
        </div>
    );
}