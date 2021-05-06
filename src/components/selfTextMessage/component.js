import './style.css';

const selfMessage = (props) => {

  const notFound = (e) => { /*  */
    e.target.src = `${window.location.origin}/api/user/unkuser.jpg`;
    e.target.onError = "";
    return true;
  }

  return (
    <div className="selfMessage">
      <div className="msg">
        <p><span>You said :</span>{props.msg}</p>
        <img src={props.img} alt="user profile" onError={(e) => notFound(e)} />
      </div>

      <div className="msgTime">
        <p>At: {props.date}</p>
      </div>
    </div>
  );
}

export default selfMessage;
