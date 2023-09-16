import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'; // Import Map, GoogleApiWrapper, and Marker

import placeholderImage from "../TripsPage/TripCard/placeholder.png";

class TripPage extends Component {
  render() {
    const currentTrip = JSON.parse(localStorage.getItem('currentTrip'));

    // Define an array of trip locations (latitude and longitude)
    const tripLocations = [
      { lat: -33.4513, lng: -70.6653 }, // Replace with actual coordinates
      // Add more locations as needed
    ];

    return (
      <div>
        <h1>Trip Page</h1>
        {currentTrip && (
          <div>
            <img src={placeholderImage} alt="Placeholder" />
            <p>Viaje: {currentTrip.name}</p>
            <p>Descripcion: {currentTrip.description}</p>
            <p>Inicio el: {currentTrip.start_date}</p>
            <p>Termino: {currentTrip.end_date}</p>
          </div>
        )}

        <Link to="/destination">Añadir destino</Link>

        {/* Add the Google Map */}
        <Map
          google={this.props.google}
          zoom={2} // Adjust the initial zoom level as needed
          initialCenter={{ lat: -33.4513, lng: -70.6653 }} // Set the initial center point
        >
          {/* Create markers for trip locations */}
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
