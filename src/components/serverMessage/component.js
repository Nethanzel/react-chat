import './style.css';

const serverMessage = (props) => {

  return (
    <div className="serverMessage">
      
        <p><span>Server: </span>{props.msg}</p>

      <div className="serveMsgTime">
        <p>At: {props.date}</p>
      </div>
    </div>
  );
}

export default serverMessage;
