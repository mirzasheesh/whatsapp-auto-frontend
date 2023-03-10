import { useNavigate } from 'react-router-dom';

export default function BackToHome() {
    
    const navigate = useNavigate();
    
    return (
        <div>
            <button onClick={() => navigate('/')}>🡐 Back</button>
        </div>
    );
}