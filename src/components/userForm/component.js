import unkUser from '../../assets/unkuser.jpg';
import './style.css';

const userForm = () => {

    let { setUser, setImage } = require("../dataCache/module");

    const imageLoad = (e) => {
       setImage(e.target.files[0]);
       var fr = new FileReader();
        fr.onload = function () {
            document.getElementById("userImg").src = fr.result;
        }
        fr.readAsDataURL(e.target.files[0]);
    }

    return (
        <div className="card_controls">
            <form>
                <div className="card_controls_sep">
                    <p>Choose your username: *</p>
                    <input type="text" onChange={ (e) => setUser(e.target.value) } id="ufNameInput" />
                </div>
                <div className="card_controls_sep">
                    <p>Choose a picture to show (optional):</p>
                    <img alt="profile" src={unkUser} id="userImg" />
                    <input type="file" accept="image/x-png,image/gif,image/jpeg" onChange={imageLoad.bind(this)} />
                </div>
            </form>
        </div>
    );
  }
  
  export default userForm;
