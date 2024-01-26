import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navigation from "./components/Navigation";


function App() {
  return (
    <>
      <img
        src="./Logo_art.jpg"
        style={{ width: "900px", border: "black double 10px" }}
      />
      <Navigation />
    </>
  );
}

export default App;
