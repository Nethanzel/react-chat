import './style.css';

const selfImage = (props) => {

  const loaded = () => {
    let view = document.getElementById("chatView");
      if(view) {
        view.scrollTop = view.scrollHeight;
      }
  }

  const notFound = (e) => { /* ${window.location.origin} */
    e.target.src = `${window.location.origin}/api/user/unkuser.jpg`;
    e.target.onError = "";
    return true;
  }

  return (
    <div className="selfMessage">
      <div className="msg">
        <div>
          <span>You sent an image :</span>{props.msg}
          <img src={props.content} alt="media view" onLoad={() => loaded()}/>
        </div>
        
        <img src={props.img} alt="user profile" onError={(e) => notFound(e)}/>
      </div>

      <div className="msgTime">
        <p>At: {props.date}</p>
      </div>
    </div>
  );
}

export default selfImage;
