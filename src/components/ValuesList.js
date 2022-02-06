import React, { useState, useEffect, useCallback } from "react";
import { Legend } from "./Legend";


export const ValuesList = (props) => {
    // dispatch event from click
    // dispatch => value selected
    const [labelList, setLabelList] = useState(props.labelList);
    const [filteredValue, setFilteredValue] = useState("");

    const [labelsSelected, setLabelsSelected] = useState([]);
    const [valueHeader, setValueHeader] = useState(props.valueHeader);
    const [labelValue, setLabelValue] = useState(props.labelValue);
    const [label, setLabel] = useState("");
    const [hidden, setHidden] = useState("props.hidden");
/**
 * TODO: FILTER VALUES INSIDE LABELS
 */
    const filterValues = useCallback(
        () => 

            labelList.filter((label) => {
                return label?.name
                    ?.toLowerCase()
                    .includes(filteredValue.toLowerCase());
            }
        
          ),
        [JSON.stringify(labelList), filteredValue]
    );

    useEffect(() => {
        setLabelList(props.labelList);
        return () => {};
    }, [props.labelList]);

    useEffect(() => {
        setHidden(props.hidden);

        return () => {};
    }, [props.hidden]);

    useEffect(() => {
        setLabelValue(props.labelValue);
        return () => {};
    }, [props.labelValue]);

    const onValueClick = (e, value) => {
        value.selected = !value.selected;
        setLabel(value);

        const selected = filterValues().filter((f) => f.selected);
        setLabelsSelected(selected);
        e.preventDefault();
        //   setFilteredPlaceholder(value);
        props.onValueChange(value);
    };
    const onLabelValueClick = (e, value) => {
        value.selected = !value.selected;
        props.onLabelValueChange(value);
    };

    const styleValue = (value) => {
        if (value.selected) {
            return {
                'borderColor':'#11abab',
                color: "#11abab",
            };
        } else return {};
    };
    return (
        <div className="labels-container" hidden={hidden}>
            <div className="valuesList">
                <div className="valuelist-title">
                    <Legend 
                    title="1. Select labels to search in" 
                    text="Which labels would you like to consider for your search?" />
            <div className="valuelist-content">
                    {labelList&&
                        labelList.map((value, key) => (
                            <small
                                title={value.name}
                                key={key}
                                id={value.name}
                                style={styleValue(value)}
                                onClick={(e) => onValueClick(e, value)}
                            >
                                {value.name} 
                            </small>
                        ))}
                </div> 
                <div className="valuelist-filter">
                <div className="valuelist-filter-title">
                <Legend 
                    title=" 2. Find values for the selected labels" 
                    text="Choose the label values that you would like to use for the query. Use the search field to find values across selected labels." />
               
                    
                    </div>
                    <input
                        id="filteredValue"
                        placeholder={`${valueHeader} ( ${(filterValues() && filterValues().length)} )`}
                        value={filteredValue || ""}
                        autoComplete="off"
                        onChange={(e) => setFilteredValue(e.target.value)}
                    />
                </div>
                </div>
             
                { labelsSelected && (
                    <div className="values-container">
                        <div className="values-container-column">
                            {labelsSelected?.map((labelSelected, key) => (
                                <div className="values-column" key={key}>
                                    <div className="values-column-title"> 
                                    <span>
                                        {labelSelected?.name} ({labelSelected?.values?.length})
                                        </span>
                                        <span className="close-column"
                                              onClick={(e) =>
                                                onValueClick(e, labelSelected)
                                            }
                                        >close</span>
                                    </div>
                                    <div className="valuelist-content column">
                                        {labelSelected.values.length &&
                                            labelSelected.values.map(
                                                (value, key) => (
                                                    <small
                                                        key={key}
                                                        className="label-value"
                                                        style={styleValue( value )}
                                                        onClick={(e) => onLabelValueClick( e,value )}
                                                    >
                                                        {value.name}
                                                    </small>
                                                )
                                            )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
