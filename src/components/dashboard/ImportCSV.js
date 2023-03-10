import axios from 'axios';
import { useCallback } from "react";

export default function ImportCSV() {

    const upload = useCallback((file) => {

        let formData = new FormData();

        formData.append("contactsCSV", file, file.name);

        axios.post(`${process.env.REACT_APP_BACKEND}/customer/import`, formData);
    });

    return (
        <div className="csv-button-wrap contact-button">
            <label>Import CSV</label>
            <input type="file" onChange={(file) => upload(file.target.files[0])} accept=".csv" style={{
                position: 'absolute',
                left: 0,
                top: 0,
                opacity: 0,
            }} />
        </div>
    );
}