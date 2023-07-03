
import { RowLogContent, RowTimestamp } from "./styled";
import { ILogRowProps } from "./types";

/**
 * Returns a Log Row with the row timestamp and text
 * @param param0 
 * @returns 
 */
export function LogRow({
    text,
    dateFormated,
    isMobile,
    isSplit,
    isShowTs,
}: ILogRowProps) {
    const showTimestamp = () => isShowTs && !isMobile && !isSplit;
    const dateFormatted = () => (isMobile || isSplit) && isShowTs;

    return (
        <div className="log-ts-row">
            {showTimestamp() && <RowTimestamp>{dateFormated}</RowTimestamp>}
            <RowLogContent>
                {dateFormatted() && <p>{dateFormated}</p>}
                <p>{text}</p>
            </RowLogContent>
        </div>
    );
}