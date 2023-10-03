import React, { useState, useEffect } from 'react';
import { Box, Button, Snackbar } from "@mui/material";
import Gallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

function PostPage(props) {
    const token = localStorage.getItem('token');
    const postid = localStorage.getItem('postid');
    const [postData, setPostData] = useState(null);
    const [mediaList, setMediaList] = useState([]);
    const [successMessage, setSuccessMessage] = useState(null);


    //Las 3 Querys 
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

    const handleUploadPhoto = (file) => {
        if (postid) { 
            const formData = new FormData();
            formData.append('photos', file);
            formData.append('post_id', postid);
            
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
                    setTimeout(() => {
                        getMediaCount();
                    }, 3000);
                } else {
                    console.error('Error al cargar la foto de perfil');
                }
            })
            .catch((error) => {
                console.error('Error al cargar la foto de perfil:', error);
            });
        }
    };

    const getMediaCount = async () => {
        setMediaList([]);
        try {
            const response = await fetch(`http://localhost:3000/api/v1/media/get_number_for_post/${postid}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                const mediaCount = data.media_count;

                for (let i = 0; i < mediaCount; i++) {
                    const mediaResponse = await fetch(`http://localhost:3000/api/v1/media/get_photos_for_post/${postid}?photo_index=${i}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    if (mediaResponse.ok) {
                        const mediaBlob = await mediaResponse.blob();
                        const mediaURL = URL.createObjectURL(mediaBlob);
                        setMediaList(prevMediaList => [...prevMediaList, mediaURL]);
                    } else {
                        console.error('Error al obtener medio:', i);
                    }
                }
            } else {
                console.error('Error al obtener el número de medios');
            }
        } catch (error) {
            console.error('Error al obtener medios:', error);
        }
    };

    //Imagen formato galleria

    const PhotoGallery = () => {
        const images = mediaList.map((photoURL, index) => ({
            original: photoURL,
            thumbnail: photoURL,
            description: `Foto ${index + 1}`,
        }));

        return (
            <div className="photo-gallery">
                <Gallery items={images} />
            </div>
        );
    };

    useEffect(() => {
        getMediaCount();
    }, []);
    


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

            <div style={{ marginTop: '20px' }}>
                <PhotoGallery />
            </div>


        </Box>
    );
}

export default PostPage;