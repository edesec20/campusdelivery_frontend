/**
 * Project: campusdelivery
 * Created by: Selina Edelsbrunner
 * Date: 07.06.2024
 * Time: 08:39
 */
import React, { useState } from 'react';
import { Box, Button, Container, Input, TextField, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './css/formstyle.css';
import { getUser } from "../Utility";

const CreateTrip = () => {
    const navigate = useNavigate();
    const [destination, setDestination] = useState<string>("");
    const [time, setTime] = useState<string>(null);
    const [maxNumberOfOrders, setMaxNumberOfOrders] = useState<number>(null);
    const [error, setError] = useState<string>("");

    const onHandleBekanntgabe = () => {
        if (!destination || !time || !maxNumberOfOrders) {
            setError("Please fill out all fields.");
            return;
        }

        axios.post(`http://localhost:3003/trip/new?email=${getUser()}`, {
            destination: destination,
            time: time,
            maxNumberOfOrders: maxNumberOfOrders,
        }).then((response) => {
            console.log(response.data);
            navigate("/tripOverview");
        }).catch((error) => {
            console.error(error);
            setError("Trip could not be created!");
        });
    }

    return (
        <Container maxWidth="xs">
            <Box className="form-container">
                <Typography variant="h4" component="h1" gutterBottom>
                    Einkauf bekanntgeben
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <TextField
                    label="Destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    required
                    fullWidth
                    margin="normal"
                />
                <Input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                    fullWidth
                />
                <TextField
                    label="Maximum Orders"
                    value={maxNumberOfOrders}
                    onChange={(e) => setMaxNumberOfOrders(Number(e.target.value))}
                    required
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth
                        onClick={onHandleBekanntgabe}>
                    Einkauf bekanntgeben
                </Button>
            </Box>
        </Container>
    );
};

export default CreateTrip;
