import * as React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import { Box, Button, Container, CssBaseline, Stack, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

export const Home = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState(false);
    const [emailEmpty, setEmailEmpty] = useState(false);
    const [passwordEmpty, setPasswordEmpty] = useState(false);

    const navigate = useNavigate();
    
    const handleSubmit = () => {
        console.log('email');
        if (email && password) {
            Axios.post('http://localhost:3001/', {
                email: email,
                password: password
            })
            .then(res => {
                console.log(res);
                console.log(res.data);
                setLogin(true);
                navigate('/user');
            })
            .catch(err => {
                console.log(err);
            }); 
        }
        else {
            if (!email) {
                setEmailEmpty(true);
            }
            if (!password) {
                setPasswordEmpty(true);
            }
        }
        
    }

    return ( 
        <Container sx={{
            display: "flex", 
            flexDirection: "column", 
            justifyContent: "center", 
            alignItems: "center", 
            backgroundColor: "#F8F8F8", 
            width: "350px", 
            padding: "15px 0",
            borderRadius: "10px", 
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" 
            }}>
            <CssBaseline/>
            <Typography variant="h6" style={{marginBottom: "15px"}}>
                Connexion
            </Typography>
            <Box component="form" sx={{'& > :not(style)': { m: 1, width: '250px', display: "block" },}} noValidate autoComplete="off">
                <TextField 
                    size="small"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    sx={{"& > *": { mb: 3 } }}
                    style={emailEmpty ? {border: "1px solid red"} : {}}
                    value={email}
                    onInput={(e) => setEmailEmpty(false)}   
                    onChange={(e) => setEmail(e.target.value)}
                />
                <p style={emailEmpty ? { display: 'block', color: 'red'} : {display : 'none'}}>Veuillez entrer un e-mail.</p>
                <TextField
                    style={emailEmpty ? {border: "1px solid red"} : {}} 
                    size="small"
                    margin="normal"
                    required
                    fullWidth
                    name="motdepasse"
                    label="Mot de passe"
                    type="motdepasse"
                    id="motdepasse"
                    autoComplete="current-password"
                    value={password}
                    onInput={(e) => setPasswordEmpty(false)}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <p style={passwordEmpty ? { display:'block', color: 'red'} : {display : 'none'}}>Veuillez entrer un mot de passe.</p>
                <Link style={{fontSize: "12px"}} to="/register">Mot de passe oublié ?</Link>
                
                <Stack spacing={2} direction="row">
                    <Button onClick={handleSubmit} fullWidth variant="contained" sx={{marginBottom: "25px", marginTop: "20px"}}>Se connecter</Button>
                </Stack>
            </Box>
            <Box component="div" sx={{width: "100%", paddingTop: "25px", borderTop: "1px solid gray", display: "flex" , flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                <Typography mb={0.5} variant="body2" color="textSecondary" align="left">
                    Nouvel utilisateur ?
                </Typography>
                <Stack spacing={2} direction="row">
                    <Link style={{fontSize: "12px", textDecoration: "none" }} to="/register">
                        <Button sx={{width: "150px"}} variant="outlined">S'inscrire</Button>
                    </Link>
                </Stack>
            </Box>
        </Container>
     );
}

