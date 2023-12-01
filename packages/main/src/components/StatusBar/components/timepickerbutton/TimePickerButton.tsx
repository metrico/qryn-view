import { TimePickerButtonStyled } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { setRangeOpen } from "@ui/store/actions";

export default function TimePickerButton() {
    const dispatch: any = useDispatch();
    const timePickerOpen = useSelector((store:any) => store.rangeOpen);

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
