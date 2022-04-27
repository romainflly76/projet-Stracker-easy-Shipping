import React from "react";
import GoogleMapReact from "google-map-react";
import "./MissionMap.css";
import LocationPin from "./LocationPin";
import { useJsApiLoader } from "@react-google-maps/api";

const isEmpty = (obj) => !obj || Object.keys(obj).length === 0;

// Props passées en parametre de la fonction
// Default Location location par defaut ROUEN, Location= localisation mission
const MissionMap = ({ defaultLocation, location, zoomLevel }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDl1v5GDCgPyhsSyizrT7bmlOac7wlJnCI",
  });

  const [coordinates, setCoordinates] = React.useState({});

  React.useEffect(() => {
    if (!isEmpty(location)) {
      setCoordinates(location);
    } else {
      setCoordinates(defaultLocation);
    }
  }, [defaultLocation, location]);

  return isLoaded ? (
    <div className="map">
      <div className="google-map">
        <GoogleMapReact
          //yesIWantToUseGoogleMapApiInternals accéder à la carte Google Maps et aux objets cartographiques
          yesIWantToUseGoogleMapApiInternals
          bootstrapURLKeys={{ key: "AIzaSyDl1v5GDCgPyhsSyizrT7bmlOac7wlJnCI" }}
          center={coordinates}
          defaultZoom={zoomLevel}
        >
          {!isEmpty(location) && (
            <LocationPin
              lat={coordinates.lat}
              lng={coordinates.lng}
              text={coordinates.address}
            />
          )}
        </GoogleMapReact>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default React.memo(MissionMap);
