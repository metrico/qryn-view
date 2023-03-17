import { addLabel } from "./helpers";
import ZoomIn from "@mui/icons-material/ZoomIn";
import ZoomOut from "@mui/icons-material/ZoomOut";
import { IFilterButtonProps } from "./types";
import { IconStyles } from "./styled";

/**
 * 
 * @param param0 
 * @returns Label filters (+ / - ) buttons for log rows
 */
export function FilterButtons({ label, value, actQuery }: IFilterButtonProps) {
    return (
        <>
            <span
                aria-label="Filter for value"
                title="Filter for value"
                onClick={(e) => addLabel(e, label, value, false, actQuery)}
                className={"icon"}
            >
                <ZoomIn color="primary" style={IconStyles} />
            </span>
            <span
                aria-label="Filter out value"
                title="Filter out value"
                onClick={(e) => addLabel(e, label, value, true, actQuery)}
                className={"icon"}
            >
                <ZoomOut color="primary" style={IconStyles} />
            </span>
        </>
    );
}
