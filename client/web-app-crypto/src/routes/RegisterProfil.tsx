import * as React from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { Box, Button, Container, CssBaseline, Stack, TextField, Typography} from '@mui/material';
import { Routes, Route, Outlet, Link, useNavigate } from 'react-router-dom';

type CreateUserResponse = {
    name: string;
    email: string;
    password: string;
  };



function RegisterProfil() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nameEmpty, setNameEmpty] = useState(false);
    const [emailEmpty, setEmailEmpty] = useState(false);
    const [passwordEmpty, setPasswordEmpty] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = () => {
        if (name && email && password) {
            Axios.post<CreateUserResponse>('http://localhost:3001/register', {
                name: name,
                email: email,
                password: password
            })
            .then(res => {
                console.log(res);
                console.log(res.data);
                navigate('/');
            })
            .catch(err => {
                console.log(err);
            }); 
        }
        else {
            if (!name) {
                setNameEmpty(true);
            }
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
        }} >
            <CssBaseline />
            <Typography variant="h6" style={{marginBottom: "15px"}}>
                Créez un compte
            </Typography>
            <Box component="form" sx={{'& > :not(style)': { m: 1, width: '250px', display: "block" },}} noValidate autoComplete="off">
                <TextField 
                    size="small"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Nom d'utilisateur"
                    name="name"
                    autoComplete="user"
                    sx={{"& > *": { mb: 3 } }}
                    onInput={(e) => setNameEmpty(false)}
                    onChange={(e) => setName(e.target.value)}
                />
                <p style={nameEmpty ? { display: 'block', color: 'red'} : {display : 'none'}}>Veuillez entrer un nom d'utilisateur.</p>
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
                    onInput={(e) => setEmailEmpty(false)}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <p style={emailEmpty ? { display: 'block', color: 'red'} : {display : 'none'}}>Veuillez entrer un e-mail.</p>
                <TextField 
                    size="small"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Mot de passe"
                    type="motdepasse"
                    id="password"
                    autoComplete="current-password"
                    sx={{"& > *": { mb: 5 } }}
                    onInput={(e) => setPasswordEmpty(false)}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <p style={passwordEmpty ? { display: 'block', color: 'red'} : {display : 'none'}}>Veuillez entrer un mot de passe.</p>

                <Stack spacing={2} direction="row">
                    <Link onClick={handleSubmit} style={{fontSize: "12px", textDecoration: "none" }} to="/register">
                        <Button sx={{width: "100%"}} variant="contained">Créer mon compte</Button>
                    </Link>
                </Stack>
                <Box component="div" sx={{width: "100%", paddingTop: "25px", borderTop: "1px solid gray", display: "flex" , justifyContent: "center", alignItems: "center"}}>
                    <Typography mb={0.5} variant="body2" color="textSecondary" align="left">
                        Vous avez déjà un compte ?
                    </Typography>
                    <Stack spacing={2} direction="row">
                        <Link style={{fontSize: "12px", textDecoration: "none" }} to="/">
                            Me connecter
                        </Link>
                    </Stack>
                </Box>
            </Box>
        </Container>
    );
}

export default RegisterProfil;