import logo from '../../assets/party.png';
import './style.css';
import CButtom from "../../components/buttom/component";
import { useHistory } from "react-router-dom";

const LandingView = () => {

  const history = useHistory();

  const Done = () => { history.push("/profile") }

  return (
    <div className="landingView">
      <div className="card">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Hey, Welcome!</h1>
        <h2>Would you like to join the party?!</h2>
        <CButtom config={{caption: "Join the party", click: Done}}/>
      </div>
        
    </div>
  );
}

export default LandingView;
