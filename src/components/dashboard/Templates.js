import axios from "axios";
import { useEffect, useState } from "react";

export default function Templates() {

    const [templateList, setList] = useState([]);

    useEffect(() => {

        axios.post(`${process.env.REACT_APP_BACKEND}/template/list`)
            .then((r) => {
                if (r.data.templateList) setList(r.data.templateList);
            })
            .catch((e) => null);
    }, []);

    return (
        <div className="customerSection">
            <h4>Manage Template's</h4>
            <button>New Template</button>
            <div className="customerTable">
                <table>
                    <tbody>
                        <tr>
                            <th>Template</th>
                            <th>Header</th>
                            <th>Body Content</th>
                            <th>Footer</th>
                            <th>Buttons</th>
                        </tr>
                        {(templateList.length > 0) ? templateList.map((e) => <tr key={e.templateID}><td>{e.templateTitle}</td><td>{e.templateContent.head}</td><td>{e.templateContent.body}</td><td>{e.templateContent.foot}</td><td>{null}</td></tr>) : null}
                    </tbody>
                </table>
            </div>
        </div>
    );
}