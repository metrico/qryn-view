//this should be a select for the history inside cardinality
import React, { type ChangeEvent } from "react";
import { type CardinalityHistoryItem } from "./history/CardinalityHistoryManager";

type HistorySelectProps = {
    history: Array<CardinalityHistoryItem["value"]>;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

const HistorySelect:React.FC<HistorySelectProps> = ({ history, onChange }) => {
    return (
        <div className="cardinality-input-history">
            <select onChange={onChange}>
                {history?.map((item, index) => {
                    return <option key={index}>{item}</option>;
                })}
            </select>
        </div>
    );
}

export default HistorySelect;