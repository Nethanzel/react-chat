import './style.css';

const Message = (props) => {

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
    <div className="message">
      <div className="msg_">
        <img src={props.img} alt="user profile" onError={(e) => notFound(e)} />
        <div>
          <span>{props.user} sent an image :</span>{props.msg}
          <img src={props.content} alt="media view" onLoad={() => loaded()} />
        </div>
      </div>

      <div className="msgTime_">
        <p>At: {props.date}</p>
      </div>
    </div>
  );
}

export default Message;



