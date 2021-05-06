import './style.css';

const cButtom = (props) => {
  
  const click = props.config.click;

  return (
    <div className="customBtn" onClick={click}>
      <p>{props.config.caption}</p>
    </div>
  );
}

export default cButtom;
