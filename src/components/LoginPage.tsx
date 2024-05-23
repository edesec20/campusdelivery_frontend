/**
 * Project: campusdelivery
 * Created by: Selina Edelsbrunner
 * Date: 16.05.2024
 * Time: 07:58
 */

import React, {FormEvent, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Box, Button, Container, Input, TextField, Typography} from "@mui/material";
import axios from "axios";
import './css/formstyle.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        console.log("onHandleLogin!")
        event.preventDefault();
        setError('');
        setSuccess('');
        try {


            const response = await axios.post("localhost:3003/user/login", {
                email, password
            });

            if (response.data.email === email && response.data.password === password) {
                setSuccess('Login successful')
                console.log("login success")
                navigate("/")
            } else if (response.status === 404) {
                setError('Invalid password or username!')
                console.log("login failed -> invalid password")
                console.log(email)
                console.log(password)
            } else if (response.status === 400) {
                setError("An error occurred while logging in")
                console.log("login failed while logging in!")
                console.log(email)
                console.log(password)
            }

        }catch (error1){
            setError("User doesn't exist");
            console.log("An error occurred: ", error1);
        }
    }

    return (
        <Container maxWidth="xs">
            <Box className="form-container">
                <form onSubmit={handleLogin} className="form">
                    <Typography variant="h4" component="h1" gutterBottom>
                        Login
                    </Typography>
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Login
                    </Button>
                </form>
                {error && <Typography color="error" className="feedback">{error}</Typography>}
                {success && <Typography color="primary" className="feedback">{success}</Typography>}
                <Link to="/registration" className="registration-link">
                    Registrieren?
                </Link>
            </Box>
        </Container>
    );
};

export default LoginPage;