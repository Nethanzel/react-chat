import './style.css';
import CButtom from "../buttomv2/component";

const ImagePreview = () => {

    const { setMessageImage, getMessageImage } = require("../dataCache/module");
    const { getUser } = require("../dataCache/module");
    const { getSocketID } = require("../socket/component");
  
    const cancel = () => {
        setMessageImage(undefined);
    }

    const send = () => {
        document.getElementById("status").innerText = `Sending image...`;
        document.getElementById("ImagePreview").style.display = "none";
        
        let userDetails = new FormData();

        userDetails.append("user", getUser());
        userDetails.append("id", getSocketID());
        userDetails.append("img", getMessageImage());

        fetch("./api/upload", { method: "POST", body: userDetails })
            .then(res => {
                if(res.status === 204) {
                    document.getElementById("status").innerText = `Your image was sent`;
                }
            })
            .catch(() => {
                document.getElementById("status").innerText = `Couldn't send your image`;
            })
    }

    return (
        <div id="ImagePreview">
        <div className="ImagePreview_container">
            <div className="imgView">
                <img id="previewImg" alt="preview" />
            </div>
            <div className="imgViewControls">
                <CButtom config={{ caption: "Cancel", click: cancel }} />
                <CButtom config={{ caption: "Send image", click: send }} />
            </div>
        </div>
        </div>
    );
}

export default ImagePreview;
