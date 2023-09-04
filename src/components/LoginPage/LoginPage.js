import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Grid, CssBaseline, Paper, Typography, TextField, Button, Box } from '@mui/material'; // Asegúrate de importar Box

const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
    },
    paper: {
      padding: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Sutil sombra
      borderRadius: '8px', // Bordes redondeados
      background: 'white', // Fondo blanco
    },
    form: {
      marginTop: theme.spacing(2),
      flexDirection: 'column',
    },
    submit: {
      margin: theme.spacing(2, 0, 2),
      color: 'white', // Texto blanco
      '&:hover': {
        background: '#fbb03b', // Cambio de color al pasar el mouse
      },
    },
  }));
  
  

  function LoginPage(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);
    const classes = useStyles();

    const credentials = btoa(`${email}:${password}`);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        
        try {
            const response = await fetch('http://localhost:3000/api/v1/api-keys', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${credentials}`,
                    
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (response.ok) {   
                const data = await response.json();
                const { token } = data;
                localStorage.setItem('token', token);
                console.log(localStorage.token);
                window.location.href = '/home';
            } else {
                setLoginError(true);
                console.error('Inicio de sesión fallido');
            }
        } catch (error) {
            console.error('Error al conectarse al servidor:', error);
        }
    };

    return (
        <Box className={classes.root}>
            <CssBaseline />
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <TextField
                                label="Correo Electrónico"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <TextField
                                label="Contraseña"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                className={classes.submit}
                            >
                                Iniciar Sesión
                            </Button>
                        </form>
                        {loginError && (
                            <Typography variant="body2" color="error">
                                No se pudo iniciar sesión. Verifica tus datos.
                            </Typography>
                        )}
                    </div>
                </Grid>
            </Grid>
        </Box>
    );
}

export default LoginPage;
