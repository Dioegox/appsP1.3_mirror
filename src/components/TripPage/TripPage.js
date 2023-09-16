import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

// Import the image using require
import placeholderImage from "../TripsPage/TripCard/placeholder.png";

function TripPage() {
  const currentTrip = JSON.parse(localStorage.getItem('currentTrip'));

  return (
    <div>
      <h1>Trip Page</h1>
      {currentTrip && (
        <div>
          <img src={placeholderImage} alt="Placeholder" />
          <p>Viaje: {currentTrip.name}</p>
          <p>Descripcion: {currentTrip.description}</p>
          <p style={{ margin: '20px 0' }}>a</p>
          
          <p>Inicio el: {currentTrip.start_date}</p>
          <p>termino: {currentTrip.end_date}</p>
          
          
        </div>
      )}

      <Link to="/destination">Añadir destino</Link>
    </div>
  );
}

export default TripPage;
