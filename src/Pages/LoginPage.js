import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

export const LoginPage = ({ auth }) => {
    const navigate = useNavigate();
    const loggedIn = auth.isSignedIn.get();

    useEffect(() => {
        if (loggedIn) navigate('/')    
    }, [loggedIn, navigate])

    if (loggedIn) return null

    return (
        <Button onClick={() => auth.signIn()} color="inherit">Login</Button>        
    )
}