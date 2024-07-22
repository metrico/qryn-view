import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { cx } from '@emotion/css'
import { confirmSaveLoaderIcon, inputErrorCont } from "./header.styles";

export const WARNING_ERRORS = {
    mixed_content: "Insecure Mixed Content. Mixing HTTP and HTTPS is insecure and is not supported.",
    complete_url: "Please complete API URL"
}

export type InputErrorWarningProps = {
    error:  keyof typeof WARNING_ERRORS
}

export const InputErrorWarning = (props: InputErrorWarningProps) => {
    const {error} = props 
    return (
        <div className={cx(inputErrorCont)}>
            <ErrorOutlineIcon className={cx(confirmSaveLoaderIcon)} />{" "}
            <span>{WARNING_ERRORS[error]}</span>
        </div>
    );
};
