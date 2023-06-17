import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginScreen from "./components/LoginScreen";
import HomeScreen from "./components/HomeScreen";
import Details from "./components/Details";
import Shows from "./components/Shows";
import Photos from "./components/Photos";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="/shows" element={<Shows />} />
        <Route path="/details/:showId" element={<Details />} />
        {/* Add more routes for other app screens */}
      </Routes>
    </Router>
  );
};

export default App;
