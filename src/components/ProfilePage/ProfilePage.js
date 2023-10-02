import React, { useState, useEffect } from 'react';
import { Box, Avatar, Button, Popover } from "@mui/material";

function ProfilePage(props) {
    const token = localStorage.getItem('token');
    const storedCredentials = localStorage.getItem('credentials');
    const [storedEmail, storedPassword] = atob(storedCredentials).split(':');
    const [ProfileError, setProfileError] = useState(false);
    const [data, setData] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/users/${storedEmail}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {   
                const responseData = await response.json();
                setData(responseData);
                console.log("Datos de perfil recuperados:", responseData);
            } else {
                setProfileError(true);
                console.error('Datos de perfil no recuperados');
            }
        } catch (error) {
            console.error('Error al conectarse al servidor:', error);
        }
    };

    useEffect(() => {
        handleSubmit();
    }, []);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    
    return (
        <Box>
            <h5> .</h5>
            <h5> . </h5>
            <h1>Profile</h1>
            
            {/* Botón para cambiar foto de perfil (actualmente no hace nada) */}
            <Button variant="outlined">Cambiar foto de perfil</Button>
            
            {/* Círculo para la foto de perfil */}
            {data && (
                <div>
                    <Avatar
                        alt="User Profile Picture"
                        src="/static/images/avatar/2.jpg" // Reemplaza esto con la URL de la foto de perfil si está disponible en tus datos
                        sx={{ width: 100, height: 100, cursor: 'pointer' }}
                        onClick={handlePopoverOpen}
                    />
                    <Popover
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handlePopoverClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <Avatar
                            alt="User Profile Picture"
                            src="/static/images/avatar/2.jpg" // Reemplaza esto con la URL de la foto de perfil si está disponible en tus datos
                            sx={{ width: 200, height: 200 }}
                        />
                    </Popover>
                </div>
            )}
            {data && (
                <div>
                    <p>Name: {data.first_name}</p>
                    <p>Last Name: {data.last_name}</p>
                    <p>Phone: {data.phone}</p>
                    <p>Date of Birth: {data.dob}</p>
                </div>
            )}
        </Box>
    );
}

export default ProfilePage;
