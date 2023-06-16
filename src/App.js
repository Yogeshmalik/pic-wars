import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from "react-router-dom";
import LoginScreen from "./components/LoginScreen";
// import HomeScreen from './components/HomeScreen';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginScreen />} />
        {/* <Route path="/home" component={HomeScreen} /> */}
        {/* Add more routes for other app screens */}
      </Routes>
    </Router>
  );
};

export default App;
