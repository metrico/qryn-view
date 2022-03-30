
import { useDispatch } from "react-redux";
export function StatusBarInput(props) {
    const { label, value, dispatchAction, type } = props;
    const dispatch = useDispatch();
    const handleStatusInputChange = (e) => {
      dispatch(dispatchAction(e.target.value));
    };
  
    return (
      <div className="selector">
        <span className="label">{label}</span>
        <input
          className={type}
          value={value}
          onChange={handleStatusInputChange}
        />
      </div>
    );
  }