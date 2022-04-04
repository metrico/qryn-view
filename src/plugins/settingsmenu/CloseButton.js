import { StyledCloseBtn } from "./styled";
import CloseIcon from "@mui/icons-material/Close";

export default function CloseButton({ onClick }) {
    return (
        <StyledCloseBtn onClick={onClick}>
            <CloseIcon />
        </StyledCloseBtn>
    );
}
