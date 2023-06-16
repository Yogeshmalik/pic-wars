import "./App.css";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginSignupScreen from './components/LoginScreen';
// import HomeScreen from './components/HomeScreen';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginSignupScreen} />
        {/* <Route path="/home" component={HomeScreen} /> */}
        {/* Add more routes for other app screens */}
      </Switch>
    </Router>
  );
};

export default App;
