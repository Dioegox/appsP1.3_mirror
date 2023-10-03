import React, { useState, useEffect, useRef } from 'react';
import { Box, Avatar, Button, Snackbar } from "@mui/material";

function ProfilePage(props) {
    const token = localStorage.getItem('token');
    const storedCredentials = localStorage.getItem('credentials');
    const [storedEmail, storedPassword] = atob(storedCredentials).split(':');
    const [userId, setUserId] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [data, setData] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);


    // Las 3 Querys
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
                setUserId(responseData.id);
                console.log("Datos de perfil recuperados:", responseData);
                handleGetPhoto();
            } else {
                console.error('Datos de perfil no recuperados');
            }
        } catch (error) {
            console.error('Error al conectarse al servidor:', error);
        }
    };

    const handleUploadPhoto = (file) => {
        if (userId) { 
            const formData = new FormData();
            formData.append('photos', file);
            formData.append('user_id', userId);
            
            fetch(`http://localhost:3000/api/v1/media/upload_photos`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            })
            .then((response) => {
                if (response.ok) {
                    setSuccessMessage('Foto de perfil cargada con éxito');
                    setImageURL(URL.createObjectURL(file));
                } else {
                    console.error('Error al cargar la foto de perfil');
                }
            })
            .catch((error) => {
                console.error('Error al cargar la foto de perfil:', error);
            });
        }
    };

    const handleGetPhoto = () => {
        if (userId) { 
            fetch(`http://localhost:3000/api/v1/media/get_photos_for_user/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then((response) => {
                if (response.ok) {
                    return response.blob();
                } else {
                    console.error('Error al obtener la foto de perfil');
                }
            })
            .then((blob) => {
                const photoURL = URL.createObjectURL(blob);
                setImageURL(photoURL);
            })
            .catch((error) => {
                console.error('Error al obtener la foto de perfil:', error);
            });
        }
    };


    useEffect(() => {
        handleSubmit();
        handleGetPhoto();
    }, []);

    const intervalId = setInterval(() => {
        handleGetPhoto();
      }, 1000);

    return (
        <Box>
            <h5> .</h5>
            <h5> . </h5>
            <h1>Profile</h1>

            <Avatar
                sx={{ m: 1 }}
                src={imageURL || null} 
            />

        <Button variant="contained" component="label">
            Subir Foto
            <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => handleUploadPhoto(e.target.files[0])}
            />
        </Button>
        
            <Snackbar
                open={!!successMessage}
                autoHideDuration={3000} // Duración en milisegundos
                onClose={() => setSuccessMessage(null)}
                message={successMessage}
            />

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