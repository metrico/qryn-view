import { cx } from "@emotion/css";
import { AddIconStyle, InitialAddStyle } from "./styles";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

export const AddOperatorButton = (props: any) => {
    const { mainTheme, addOperator } = props;
    return (
        <div
            className={cx(InitialAddStyle(mainTheme))}
            onClick={addOperator}
        >
            <AddOutlinedIcon
                className={cx(AddIconStyle(mainTheme))}
                fontSize="small"
                style={{height:'14px',width:'14px'}}
            />{" "}
            <small>Add Operator</small>
        </div>
    );
};
