import { TimePickerButtonStyled } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { setRangeOpen } from "../../../../actions";
import { ThemeProvider } from '@emotion/react';
import { themes } from '../../../../theme/themes';
export default function TimePickerButton() {
    const dispatch = useDispatch();
    const timePickerOpen = useSelector((store) => store.rangeOpen);

    function openTimePicker() {
        const shouldOpen = timePickerOpen ? false : true;

        dispatch(setRangeOpen(shouldOpen));
    }
    return (
        <TimePickerButtonStyled onClick={openTimePicker}>
            <AccessTimeIcon />
        </TimePickerButtonStyled>
    );
}
