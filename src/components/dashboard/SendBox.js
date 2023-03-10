import axios from 'axios';
import { useCallback, useMemo, useState } from "react";

export default function SendBox(props) {

    const [message, setMessage] = useState("");
    const [template, selectTemplate] = useState();

    const templateList = useMemo(() => {

        let list = [{ templateID: 0, templateTitle: "Select Template" }];

        axios.post(`${process.env.REACT_APP_BACKEND}/template/list`)
            .then((r) => {
                r.data.templateList.forEach(element => {
                    list.push(element);
                });

                selectTemplate(0);
            })
            .catch((e) => null);

        return list;
    }, []);

    const send = useCallback(() => {

        if (message.trim().length < 1 && template == 0) return;

        let packet = {
            token: props.userToken,
            toPhone: props.toPhone,
        };

        if (message.trim().length > 1) {
            packet.text = message;
        }

        if (template > 0) {
            packet.templateID = Number(template);
        }

        axios.post(`${process.env.REACT_APP_BACKEND}/message/transmit`, packet)
            .then((r) => {

                if (r.data.status === 'success') {
                    if (message != "") setMessage("");
                    selectTemplate(0);
                }
            })
            .catch((e) => {
                console.log("Catch in sending message");
            });
    });

    return (
        <div className='sendBox'>
            <select name="template" id="temp" value={template} onChange={(select) => selectTemplate(select.target.value)}>
                {templateList.map((opt) => <option key={opt.templateID} value={opt.templateID}>{opt.templateTitle}</option>)}
            </select>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={() => send()}>Send</button>
        </div>
    )
}