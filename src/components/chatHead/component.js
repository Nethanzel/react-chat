import './style.css';
import editIcon from "../../assets/edit.jpg";
import closeIcon from "../../assets/close.png"
import EditProfile from "../editProfile/component";
import { useHistory } from "react-router-dom";
import socket from "../socket/component";

const ChatHead = () => {

    const { getUser, showImage, setUser, setImage } = require("../dataCache/module");
    const history = useHistory();
    showImage("profileHeadImg");

    const leave = () => {
        history.push("/");
        setUser("");
        setImage("");
        socket.disconnect();
    }

    return (
        <div id="ChatHead">
            <EditProfile />
            <div className="ChatHead_cont">
                <div className="ChatHead_info">
                    <img src="" alt="user" id="profileHeadImg" />
                    <h2 id="profileHeadName">{getUser()}</h2>
                </div>
                <div className="ChatHead_controls">
                    <img src={editIcon}
                        alt="edit"
                        onClick={() => document.getElementById("profileEdit").style.display = "flex"}
                    />
                    <img src={closeIcon} alt="leave" onClick={() => leave()} />
                </div>
            </div>
        </div>
    );
}

export default ChatHead;
