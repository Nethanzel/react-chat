import './style.css';

const Message = (props) => {

  const notFound = (e) => { /* ${window.location.origin} */
    e.target.src = `${window.location.origin}/api/user/unkuser.jpg`;
    e.target.onError = "";
    return true;
  }

  return (
    <div className="message">
      <div className="msg_">
        <img src={props.img} alt="user profile"onError={(e) => notFound(e)} />
        <p><span>{props.user} said:</span> {props.msg}</p>
      </div>
      <div className="msgTime_">
        <p>At: {props.date}</p>
      </div>
    </div>
  );
}

export default Message;


