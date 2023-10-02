import React, { useState, useEffect } from 'react';
import { Box, Avatar, Button, Popover } from "@mui/material";

function PostPage(props) {
    const token = localStorage.getItem('token');
    const postid = localStorage.getItem('postid');
    const [postData, setPostData] = useState(null);

    useEffect(() => {
        if (token && postid) {
            
            fetch(`http://localhost:3000/api/v1/posts/${postid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('No se pudo obtener el post.');
                }
            })
            .then((data) => {
                setPostData(data);
            })
            .catch((error) => {
                console.error('Error al obtener el post:', error);
               
            });
        }
    }, [token, postid]);

    return (
        <Box>
            <h5> .</h5>
            <h5> . </h5>
            <h1>Post</h1>
            
            {postData && (
                <div>
                    <h2>Título del Post: {postData.title}</h2>
                    <p>Contenido del Post: {postData.body}</p>
                </div>
            )}
        </Box>
    );
}

export default PostPage;
