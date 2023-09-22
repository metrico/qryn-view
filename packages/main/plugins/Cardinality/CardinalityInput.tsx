//this is a react input that should be managed externally by value and onChange. This also could be modifyed via onfocus and onblur. the onchange should be only onenter on this case
// this input should also have a selector for the history of the last ten string input values. change the value of the input should change the history and the value of the input

import React from "react";
import { type CardinalityHistoryItem } from "./history/CardinalityHistoryManager";
import {CardinalityCustomMenu} from "./CustomMenu";
type CardinalityInputProps = {
    name: string;
    value: string | number;
    label: string;
    size: string;
    inputSize?: string;
    type: string;
    onChange: (event: any) => void;
    onKeyDown: (event: any) => void;
    onHistoryChange: (event: any) => void;
    history?: Array<CardinalityHistoryItem["value"]>;
    hasHistory?: boolean;
};

const CardinalityInput: React.FC<CardinalityInputProps> = ({
    name,
    value,
    label,
    size,
    inputSize = "",
    type,
    onChange,
    onHistoryChange,
    onKeyDown,
    history,
    hasHistory,
}) => {
    return (
        <div className={`form-group ${size}`}>
            <label>{label}</label>
            <input
                name={name}
                className={inputSize}
                type={type}
                value={value}
                onKeyDown={onKeyDown}
                onChange={onChange}
            />
            {hasHistory && history?.length > 0 && (
                <CardinalityCustomMenu
                    id={name}
                    menuItems={history}
                
                    handleClose={onHistoryChange}
                />
            )}
      
        </div>
    );
};

export default CardinalityInput;
