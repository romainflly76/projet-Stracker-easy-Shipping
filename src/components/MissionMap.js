import React from "react";
import GoogleMapReact from "google-map-react";
import "./MissionMap.css";
import LocationPin from "./LocationPin";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const isEmpty = (obj) => !obj || Object.keys(obj).length === 0;

const MissionMap = ({ location, defaultLocation, zoomLevel }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDl1v5GDCgPyhsSyizrT7bmlOac7wlJnCI",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  //   const containerStyle = {
  //     width: "100%",

  //     height: "300px",
  //   };

  return isLoaded ? (
    <div className="map">
      {/* <h2 className="map-h2">Affichage MAP</h2> */}

      <div className="google-map">
        <GoogleMapReact
          //   mapContainerStyle={containerStyle}
          bootstrapURLKeys={{ key: "AIzaSyDl1v5GDCgPyhsSyizrT7bmlOac7wlJnCI" }}
          defaultCenter={defaultLocation}
          defaultZoom={zoomLevel}
          //   onLoad={onLoad}
          //   onUnmount={onUnmount}
        >
          {!isEmpty(location) && (
            <LocationPin
              lat={location.lat}
              lng={location.lng}
              text={location.address}
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
