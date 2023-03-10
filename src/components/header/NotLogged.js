import { useNavigate } from 'react-router-dom';

export default function NotLogged() {

    const navigate = useNavigate();

    return (
        <div className='right-section'>
            <button onClick={() => navigate('/signin')}>Login</button>
            <button onClick={() => navigate('/signup')}>Register</button>
        </div>
    );
}