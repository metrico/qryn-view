import { cx } from "@emotion/css";
import { AddIconStyle, InitialAddStyle } from "./styles";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

export const InitialAddButton = (props: any) => {
    const { mainTheme, resetLabelsState } = props;
    return (
        <div
            className={cx(InitialAddStyle(mainTheme))}
            onClick={resetLabelsState}
        >
            <AddOutlinedIcon
                className={cx(AddIconStyle(mainTheme))}
                fontSize="small"
                style={{height:'14px',width:'14px'}}
            />{" "}
            <small>Add Labels</small>
        </div>
    );
};
