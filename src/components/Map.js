import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import LocationPin from "./LocationPin";

const containerStyle = {
  width: "100%",

  height: "600px",
};

const center = {
  lat: 49.44246,
  lng: 1.10439,
};

function MyComponent() {
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

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      defaultCenter={center}
      defaultZoom={100}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
