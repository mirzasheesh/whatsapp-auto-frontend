import Customer from "./Customer";
import Templates from "./Templates";
import Messenger from "./Messenger";

import { useCallback, useState } from "react";

function M1() {
    return (
        <div>
            <h2>1</h2>
        </div>
    );
}

function M4() {
    return (
        <div>
            <h2>4</h2>
        </div>
    );
}

export default function Panel() {

    const [p, setP] = useState(1);

    const showPanel = useCallback((p) => {
        if (p === 1) return <M1 />
        if (p === 2) return <Customer />
        if (p === 3) return <Templates />
        if (p === 4) return <Messenger />
        if (p === 5) return <M4 />
    });

    return (
        <div className="dashboard-tabs">
            <div className="dashNav">
                <button id="1" onClick={() => setP(1)}>Administrators</button>
                <button id="2" onClick={() => setP(2)}>Customers</button>
                <button id="2" onClick={() => setP(3)}>Templates</button>
                <button id="3" onClick={() => setP(4)}>Messages</button>
                <button id="4" onClick={() => setP(5)}>Broadcast | Campaign</button>
            </div>
            {showPanel(p)}
        </div>
    );
}