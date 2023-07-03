import { StyledCloseButton } from "../styled";
import CloseIcon from "@mui/icons-material/Close";

export default function CloseButton({ onClose }: any) {
    return (
        <StyledCloseButton onClick={onClose}>
            <CloseIcon style={{ height: "16px", width: "16px" }} />
        </StyledCloseButton>
    );
}
