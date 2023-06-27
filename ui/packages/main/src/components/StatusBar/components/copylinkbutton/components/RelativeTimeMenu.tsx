import {
    Checkbox,
    FormControlLabel,
    FormGroup,
    MenuItem,
    Typography,
} from "@mui/material";
import { CustomMenu } from "../../daterangepicker";
import { formControlLabelStyle, menuItemStyle, typoStyle } from "../styles";

export const RelativeTimeMenu = (props: any) => {
    const {
        anchorEl,
        open,
        handleClose,
        handleChange,
        label,
        isRelative,
        qrynTheme,
    } = props;

    const checkBoxRender = () => (
        <Checkbox style={{ paddingRight: "0px" }} checked={isRelative} disabled={!label} />
    );
    const typoRender = () => (
        <Typography style={typoStyle(qrynTheme)}>Relative time</Typography>
    );

    return (
        <CustomMenu
            id="backward-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            qryntheme={qrynTheme}
            size={"small"}
        >
            <MenuItem key={`relativeTime`} style={menuItemStyle}>
                <FormGroup>
                    <FormControlLabel
                        style={formControlLabelStyle(label)}
                        checked={isRelative||false}
                        onChange={handleChange}
                        control={checkBoxRender()}
                        label={typoRender()}
                    />
                </FormGroup>
            </MenuItem>
        </CustomMenu>
    );
};
