import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarMap from "./components/NavbarMap";
import Map from "./components/Map";
import Footer from "./components/FooterMap";

function App() {
  return (
    <div className="App">
      <NavbarMap />
      <br />
      <Map />
      <br />
      <Footer />
    </div>
  );
}

export default App;
