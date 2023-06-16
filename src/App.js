import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginScreen from "./components/LoginScreen";
import HomeScreen from "./components/HomeScreen";
import Details from "./components/Details";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/details" element={<Details />} />
        {/* Add more routes for other app screens */}
      </Routes>
    </Router>
  );
};

export default App;
