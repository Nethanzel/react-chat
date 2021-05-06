import './style.css';
import Chat from "../../components/chat/component";
import Preview from "../../components/imagePreview/component";
import send from "../../assets/send.png";
import imageAdd from "../../assets/imageAdd.png";
import ChatHead from "../../components/chatHead/component";
import socket from "../../components/socket/component";
import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom";

function Party() {

  const history = useHistory();
  const { getUser, setMessageImage } = require("../../components/dataCache/module");
  const [joined, setJoined] = useState(false);
  const [inputContent, setinputContent] = useState("");

  useEffect(() => {
    let user = getUser();

    if(!user) {
      setJoined(false);
      return history.push("/profile");    
    } else {
      if(!joined) {
        setJoined(true);
      }
    }

    socket.on("writting", data => {
      document.getElementById("status").innerText = `${data.user} is writting...`;
    });

    socket.on("write_stop", () => {
      document.getElementById("status").innerText = "";
    });

    return function cleanup() {
      socket.off("writting");
      socket.off("write_stop");
    }

  }, [getUser, history, joined, setJoined]);

  const sendMessage = (message) => {
    if(joined) {
      if(inputContent.length > 0) {
        let messageJSON = {
          msg: message,
          user: getUser()
        }
        socket.emit("message", messageJSON);
        socket.emit("write_stop", {});
        setinputContent("");
        document.getElementById("msgInp").value = "";
        document.getElementById("msgInp").focus();
      }
    }
  }

  const getInput = (e) => {
    let input = e.target.value;
    setinputContent(input);
    if(input.length < 1) {
      socket.emit("write_stop", {});
    } else {
      socket.emit("writting", {user: getUser()});
    }
  }

  const imageSend = (e) => {
    setMessageImage(e.target.files[0]);
  }

  return (
    <div className="party">
      <Preview />
      <ChatHead />
      <div className="partyView">
        
        <div className="partyView_msgView" id="chatView">
          <Chat />
        </div>

        <div className="partyView_controlsView options">
          <p id="status"></p>
        </div>

        <div className="partyView_controlsView">

          <textarea type="text" placeholder="Write your message..."
            onChange={(e) => getInput(e)}
            onKeyUp={(e) => { if(e.code === "Enter") {sendMessage(inputContent)} }}
            id="msgInp"
          />

          <img src={send} alt="send" onClick={() => sendMessage(inputContent)} />

          <label htmlFor="imageSender">
            <img src={imageAdd} alt="insert" />
          </label>

          <input
            type="file"
            accept="image/x-png,image/gif,image/jpeg"
            id="imageSender"
            onChange={(e) => imageSend(e)} 
          />

        </div>
      </div>
    </div>
  );
}

export default Party;
