import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarMap from "./components/NavbarMap";
import Map from "./components/Map";
import Footer from "./components/FooterMap";
import MissionMap from "./components/MissionMap";
import { useFetchMission } from "./Hook/useFetchMission";

const location = {
  lat: 49.44246,
  lng: 1.10439,
};

// Condition si l'objet n'existe pas (undefiened ou null et qu'il n'a pas de clé)
const isEmpty = (obj) => !obj || Object.keys(obj).length === 0;

function App() {
  // Fonction du hook FetchMission
  const { mission, fetchMission } = useFetchMission();

  const getStartAddress = () => {
    if (!isEmpty(mission)) {
      return {
        lat: mission.startaddress.lat,
        lng: mission.startaddress.lng,
        address:
          mission.startaddress.street +
          " " +
          mission.startaddress.zipcode +
          " " +
          mission.startaddress.city,
      };
    }
    return null;
  };
  console.log(getStartAddress());
  return (
    <div className="App">
      <NavbarMap mission={mission} fetchMission={fetchMission} />
      <br />
      <MissionMap location={getStartAddress()} zoomLevel={17} />
      <br />
      <Footer />
    </div>
  );
}

export default App;
