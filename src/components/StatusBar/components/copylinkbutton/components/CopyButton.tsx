import { UrlCopyButton } from "../../../styled";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export const CopyButton = (props: any) => {
    const { onClick } = props;
    return (
        <UrlCopyButton {...props} onClick={onClick} isActive={true}>
            <ContentCopyIcon {...props} fontSize={"small"} />
            <span>{"Copy Link"}</span>
        </UrlCopyButton>
    );
};
