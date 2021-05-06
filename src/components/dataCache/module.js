import unkUser from "../../assets/unkuser.jpg";
let userName = "";
let userImage = undefined;
let messageImage = undefined;

export function setUser(input) {
    userName = input;
}

export function getUser() {
    return userName;
}

export function setImage(input) {
    userImage = input;
}

export function getImage() {
    if(!userImage) {
     return unkUser;   
    }   
    return userImage;
}

export function showImage(e) {
    if(!userImage) {
        let el = document.getElementById(e);
        if(el) {
            el.src = unkUser;
        }
    } else { imgCoocker(userImage, e) }
}

const imgCoocker = (file, e) => {
    let baseURL = "";
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        baseURL = reader.result;
        document.getElementById(e).src = baseURL;
    };
}

export function setMessageImage(input) {
    if(!input) {
        document.getElementById("ImagePreview").style.display = "none";
    } else {
        messageImage = input;
        var fr = new FileReader();
        fr.onload = function () {
            document.getElementById("previewImg").src = fr.result;
        }
        fr.readAsDataURL(messageImage);
        document.getElementById("ImagePreview").style.display = "flex";
    }
}

export function getMessageImage() {
    return messageImage;
}