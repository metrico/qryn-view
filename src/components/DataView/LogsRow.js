import { formatDate, getRowColor, toggleActiveStyles } from "./helpers";
import { LogRow, RowLogContent, RowTimestamp } from "./styled";
import ValueTags from "./ValueTags";
import { useSelector, useDispatch } from "react-redux";
import setLogs from "../../actions/setLogs";

export default function LogsRow({ message }) {
    const dispatch = useDispatch();
    const messages = useSelector((store) => store.logs);

    function toggleTagsActive(idx) {
        let arrCopy = [...messages];
        arrCopy.forEach((entry) => {
            if (entry.id === idx) {
                entry.showLabels = entry.showLabels ? false : true;
            }
        });
        dispatch(setLogs(arrCopy));
    }

    return (
        <LogRow
            rowColor={getRowColor(message.tags)}
            onClick={(e) => {
                toggleTagsActive(message.id);
            }}
        >
            <div className="log-ts-row">
                <RowTimestamp>{formatDate(message.timestamp)}</RowTimestamp>
                <RowLogContent>{message.text}</RowLogContent>
            </div>
            {message.tags && (
                <div className={toggleActiveStyles(message)}>
                    <ValueTags tags={message.tags} />
                </div>
            )}
        </LogRow>
    );
}
