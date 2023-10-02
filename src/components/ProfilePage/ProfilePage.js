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

    const [selectedFile, setSelectedFile] = useState(null);
    function handleFileChange(event) {
        const file = event.target.files[0];
        setSelectedFile(file);
    }

    const open = Boolean(anchorEl);
    
    return (
        <Box>
            <h5> .</h5>
            <h5> . </h5>
            <h1>Profile</h1>
            
            
            

            <Avatar
                sx={{ m: 1 }}
                src={
                selectedFile
                    ? URL.createObjectURL(selectedFile)
                    : "../../public/images/1.jpg"
                }
            />
            <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
                id="avatar-upload"
            />
            <label htmlFor="avatar-upload">
                <Button variant="contained" component="span">
                Subir Foto
                </Button>
            </label>

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
