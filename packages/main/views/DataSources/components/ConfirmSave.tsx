import { cx } from "@emotion/css";
import { QrynTheme } from "@ui/theme/types";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { confirmSaveLoaderCont, confirmSaveLoaderIcon } from "./header.styles";

export type ConfirmSaveProps = {
    setIsSaved: (boolean) => void;
    theme: QrynTheme;
};

export const ConfirmSave = ({ setIsSaved, theme }: ConfirmSaveProps) => {
    return (
        <div
            className={cx(confirmSaveLoaderCont(theme))}
            onClick={() => setIsSaved(false)}
        >
            <CheckCircleIcon className={cx(confirmSaveLoaderIcon)} />{" "}
        </div>
    );
};
