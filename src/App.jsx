import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./pages/Navbar";
import TimezoneConverter from "./pages/TimezoneConverter";
import Footer from "./pages/Footer";

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <TimezoneConverter /> */}
      <>
        <Routes>
          <Route path="/" element={<TimezoneConverter />}></Route>
        </Routes>
        <Footer />
      </>
    </div>
  );
}

export default App;
