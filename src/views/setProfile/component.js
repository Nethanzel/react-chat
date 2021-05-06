import logo from '../../assets/party.png';
import './style.css';
import CButtom from "../../components/buttom/component";
import CForm from "../../components/userForm/component";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import socket from "../../components/socket/component";

const ProfileSetting = () => {

  const history = useHistory();
  const { getUser, getImage, setUser } = require("../../components/dataCache/module");

  useEffect(() => { if(getUser().length > 2) { history.push("/party") } });

  const Done = () => {
    let user = getUser();
    let userImage = getImage();

    if(user.length > 2) {
      let userDetails = new FormData();
      userDetails.append("user", user);
      userDetails.append("img", userImage);

      fetch("./api/profile", { method: "POST", body: userDetails })
        .then(res => {
          if(res.status === 204) {
            socket.connect();
            socket.emit("join", {user});
            history.push("/party");
          } else if(res.status === 401) {
            setUser("");
            alert("That name is already being used");
            document.getElementById("ufNameInput").value = "";
          }
        })
    } else {
      alert("Your username is too short!")
    }
  }

  return (
    <div className="profileView">
      <div className="card">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>How do you want others to call you?</h1>
        <CForm />
        <CButtom config={{ caption: "I'm done!", click: Done }} />
      </div>
    </div>
  );
}

export default ProfileSetting;
