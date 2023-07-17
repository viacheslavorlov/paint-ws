import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

export const RedirectionPage = () => {
    const navigate = useNavigate()
    useEffect(() => {
        navigate(`/${Date.now()}`)
    }, [])
    return (
        <div>

        </div>
    );
};


