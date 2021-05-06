import './style.css';
import CButtom from "../buttomv2/component";
import socket from "../socket/component";
import { useState } from "react";

const EditProfile = () => {

    const { getUser, setUser, showImage, setImage } = require("../dataCache/module");
    let imgLoaded = undefined;
    let newUser = "";
    showImage("spPreview");

    const [name, setName] = useState(getUser());
    
    const cancel = () => {
        setName(getUser());
        showImage("spPreview");
        updateHead("profileHeadImg", name);

        document.getElementById("profileEdit").style.display = "none";
        document.getElementById("nwName").value = "";
        document.getElementById("nwImage").value = null;
        imgLoaded = undefined;
        newUser = "";
    }

    const edit = () => {

        if(newUser.length > 0 && newUser.length < 3) {
            return alert("New name is too short");
        } else if (!newUser && !imgLoaded) {
            return alert("Set any new thing about you");
        }

        document.getElementById("profileEdit").style.display = "none";
        document.getElementById("status").innerText = `Updating your profile...`;
        let userData = new FormData();
        userData.append("id", socket.id);
        userData.append("user", newUser.length < 1 ? undefined : newUser);
        userData.append("img", imgLoaded);

        fetch("./api/update", {method: "POST", body: userData})
            .then(res => {
                if(res.status === 204) {
                    document.getElementById("nwName").value = "";
                    document.getElementById("nwImage").value = null;
                    document.getElementById("status").innerText = `Your profile was updated`;
                    if(newUser) {
                        socket.emit("change", {user: getUser()});
                        setUser(newUser);
                        setName(newUser);
                    }
                    if(imgLoaded) {
                        setImage(imgLoaded);
                        showImage("spPreview");
                    }
                    updateHead("spPreview", getUser());
                    newUser = "";
                    imgLoaded = undefined;
                }
            });
    }

    const showPreview = (e) => {
        var fr = new FileReader();
        imgLoaded = e.target.files[0];
        fr.onload = () => {
            document.getElementById("spPreview").src = fr.result;
        }
        fr.readAsDataURL(imgLoaded);
    }

    const setNewUser = (e) => {
        newUser = e.target.value;
    }

    const updateHead = (img, name) => {
        showImage(img)
        document.getElementById("profileHeadName").innerText = name;
    }

    return (
        <div id="profileEdit">
            <div className="profileEdit_container">
                <h1>Update your profile</h1>
                <div className="profileEdit_controls">
                    <div>
                        <h2>Set a new name:</h2>
                        <input 
                            type="text"
                            placeholder="Your new name is..."
                            onChange={(e) => setNewUser(e)} 
                            id="nwName"
                        />
                        <p>Your current name is "<span id="cnPreview">{name}</span>"</p>
                    </div>
                    <div>
                        <h2>Update your photo</h2>
                        <img src="" alt="img update" id="spPreview" />
                        <input 
                            type="file"
                            accept="image/x-png,image/gif,image/jpeg"
                            onChange={(e) => showPreview(e)}
                            id="nwImage"
                        />
                    </div>
                </div>
                <div className="profileEdit_actions">
                    <CButtom config={{ caption: "Cancel", click: cancel }} />
                    <CButtom config={{ caption: "Update", click: edit }} />
                </div>
            </div>
        </div>
    );
}

export default EditProfile;
