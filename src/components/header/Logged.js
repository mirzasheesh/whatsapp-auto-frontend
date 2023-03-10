import { useNavigate } from 'react-router-dom';

export default function Logged() {

    const navigate = useNavigate();

    function logOut() {
        sessionStorage.removeItem('sessionID');
        sessionStorage.clear();
        navigate('/signin');
    }

    return (
        <div className='right-section'>
            <button onClick={() => navigate('/dashboard')}>My Account</button>
            <button onClick={() => logOut()}>Logout</button>
        </div>
    );
}