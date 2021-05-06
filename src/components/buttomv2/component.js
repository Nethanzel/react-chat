import './style.css';

const cButtom = (props) => {
  
  const click = props.config.click;

  return (
    <div className="customBtnv2" onClick={click}>
      <p>{props.config.caption}</p>
    </div>
  );
}

export default cButtom;
