import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import placeholderImage from "../TripsPage/TripCard/placeholder.png";

class TripPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: false,
      tripHasNoPosts: false,
    };
  }

  componentDidMount() {
    this.loadPosts();
  }

  loadPosts() {
    const currentTrip = JSON.parse(localStorage.getItem('currentTrip'));
    const token = localStorage.getItem('token'); 

    if (currentTrip && token) {
      this.setState({ loading: true });

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      fetch(`http://localhost:3000/api/v1/trips/${currentTrip.id}/posts`, {
        method: 'GET',
        headers: headers, 
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            this.setState({ posts: data, loading: false });
          } else {
            this.setState({ tripHasNoPosts: true, loading: false });
          }
        })
        .catch((error) => {
          console.error('Error al obtener los posts:', error);
          this.setState({ loading: false });
        });
    }
  }

  redirectToPost = (postId) => {
    localStorage.setItem('postid', postId); 
  }

  render() {
    const currentTrip = JSON.parse(localStorage.getItem('currentTrip'));
    const tripLocations = [
      { lat: -33.4513, lng: -70.6653 },
      // Add more locations as needed
    ];

    return (
      <div className='trip-box'>
        <h2>.</h2>
        <h1>Trip Page</h1>
        {currentTrip && (
          <div>
            <img src={placeholderImage} alt="Placeholder" />
            <p>Viaje: {currentTrip.name}</p>
            <p>Descripcion: {currentTrip.description}</p>
            <p>Inicio el: {currentTrip.start_date}</p>
            <p>Termino: {currentTrip.end_date}</p>
            
            
            {/* Mostrar los posts */}
            {this.state.loading && <p>Cargando posts...</p>}
            {this.state.tripHasNoPosts && <p>Este trip no tiene posts.</p>}
            {this.state.posts.length > 0 && (
              <div>
                <h2>Posts</h2>
                <ul>
                  {this.state.posts.map((post) => (
                    <li key={post.id}>
                      {post.title} 
                      <Link to="/post" onClick={() => this.redirectToPost(post.id)}>Ver Posts</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <Link to="/destination">Añadir destino</Link>

        <Map
          google={this.props.google}
          zoom={2}
          initialCenter={{ lat: -33.4513, lng: -70.6653 }}
        >
          {tripLocations.map((location, index) => (
            <Marker
              key={index}
              position={location}
              title={`Trip Location ${index + 1}`}
            />
          ))}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GAPI_KEY
})(TripPage);
