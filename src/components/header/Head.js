import LOGO from '../images/logo.png';

import { useNavigate } from 'react-router-dom';

export default function Head() {

    const navigate = useNavigate();

    return (
        <div className='left-section'>
            <img src={LOGO} alt="LOGO" onClick={() => navigate('/')} />
            <h4>WBM By S. Mirza</h4>
        </div>
    );
}