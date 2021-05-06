import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingView from "./views/landing/component";
import Profile from "./views/setProfile/component";
import Party from "./views/chatView/component";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={LandingView} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/party" component={Party} /> 
        </Switch>
      </Router>
    </div>
  );
}

export default App;
