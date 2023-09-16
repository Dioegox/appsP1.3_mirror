import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const mapStyles = {
  width: "200%",
  height: "4s00px",
  position: "absolute",
  top: 100,
  left: 0,
  right: 0,
  bottom: 0,
};


class DestinationPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        address: "", // To store the user's input address
        mapCenter: {
          lat: 0, // Initialize with default values
          lng: 0,
        },
      };
    }
  
    handleChange = (address) => {
      this.setState({ address });
    };
  
    handleSelect = (address) => {
      geocodeByAddress(address)
        .then((results) => getLatLng(results[0]))
        .then((latLng) => {
            console.log("Selected LatLng:", latLng);
          this.setState({
            address: address,
            mapCenter: latLng,
          });
        })
        .catch((error) => console.error("Error", error));
    };

    getCurrentLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            this.setState({
              address: `Current Location (${latitude}, ${longitude})`,
              mapCenter: { lat: latitude, lng: longitude },
            });
          });
        } else {
          alert("Geolocation is not supported by your browser.");
        }
      };
  
    render() {
        
      const { google } = this.props;
  
      return (
        <div>
          <h1>Añade un destino</h1>
  
          {/* Search input */}
          <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: "Search for a location...",
                    className: "location-search-input",
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active
                      ? "suggestion-item--active"
                      : "suggestion-item";
                    // Add styles and suggestions as needed
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                        })}
                      >
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>

          {/* Button to show current location */}
          <button onClick={this.getCurrentLocation}>Show Current Location</button>

  
          {/* Google Map */}
          
          <Map
            google={google}
            zoom={14}
            style={mapStyles}
            initialCenter={this.state.mapCenter} // Center map based on user's selection
          >
            {/* Marker */}
            <Marker position={this.state.mapCenter} />
          </Map>
        </div>
      );
    }
  }
  
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GAPI_KEY ,
})(DestinationPage);
