
import { useDispatch } from "react-redux";
import { ThemeProvider, useSelector } from '@emotion/react';
import { themes } from "../../../../theme/themes";
export function StatusBarInput(props) {
    const { label, value, dispatchAction, type } = props;
    const dispatch = useDispatch();
    const handleStatusInputChange = (e) => {
      dispatch(dispatchAction(e.target.value));
    };
  
    const theme = useSelector((store) => store.theme);
    return (
      <ThemeProvider theme={themes[theme]}>
      <div className="selector">
        <span className="label">{label}</span>
        <input
          className={type}
          value={value}
          onChange={handleStatusInputChange}
        />
      </div>
      </ThemeProvider>
    );
  }