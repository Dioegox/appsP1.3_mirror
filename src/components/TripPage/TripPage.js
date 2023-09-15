import React from "react";

function TripPage() {
  const currentTrip = JSON.parse(localStorage.getItem('currentTrip'));

  return (
    <div>
      <h1>Trip Page</h1>
      {currentTrip && (
        <p>ID del viaje: {currentTrip.id}</p>
      )}
    </div>
  );
}

export default TripPage;