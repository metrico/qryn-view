import { ShowLogsBtn } from "../styled";

export default function ShowLogsButton({ disabled, onClick, isMobile }) {
    const SHOW_LOGS = "Show Logs";
    return (
        <ShowLogsBtn
            disabled={disabled}
            type="submit"
            onClick={onClick}
            isMobile={isMobile}
        >
            {SHOW_LOGS}
        </ShowLogsBtn>
    );
}
