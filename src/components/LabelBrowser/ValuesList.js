import React, { useState, useEffect } from "react";
import { Legend } from "./Legend";
import { useSelector, useDispatch } from "react-redux";
import RefreshIcon from '@mui/icons-material/Refresh';
import loadLabels from "../../actions/LoadLabels";
import { queryBuilder } from "./helpers/querybuilder";
import { setQuery } from "../../actions"
import loadLabelValues from "../../actions/loadLabelValues"

import Tooltip from '@mui/material/Tooltip';
import store from "../../store/store";
export const LabelsFetchError = () => {
    const labelError = useSelector((store) => store.apiErrors)

    return (
        <>{
            labelError !== '' && (
                <div className="label-error">
                    <span> {labelError}</span>
                </div>
            )
        }

        </>



    )
}

export const ValuesList = (props) => {
    const [labelsSelected, setLabelsSelected] = useState([]);
    const labels = useSelector(state => { 
        const selected = state.labels.filter((f) => f.selected);
        console.log(JSON.stringify(selected) !== JSON.stringify(labelsSelected))
        if (JSON.stringify(selected) !== JSON.stringify(labelsSelected)) {
            setLabelsSelected(selected);
        }
        return state.labels
    })
    
    const [labelList, setLabelList] = useState(labels);

    const dispatch = useDispatch()
    const debug = useSelector((store) => store.debug)
    const apiUrl = useSelector((store) => store.apiUrl)
    if(debug) console.log('🚧 LOGIC/LabelBrowser/ValuesList', apiUrl)
    const labelsBrowserOpen = useSelector((store) => store.labelsBrowserOpen)

    const CLOSE = "close"
    /**
     * TODO: FILTER VALUES INSIDE LABELS
     */
    // const filterValues = useCallback(
    //     () =>

    //         labelList.filter((label) => {
    //             return label?.name
    //                 ?.toLowerCase()
    //                 .includes(filteredValue.toLowerCase());
    //         }

    //         ),
    //     [JSON.stringify(labelList), filteredValue]
    // );

    useEffect(() => {
        dispatch(loadLabels(apiUrl))
     //   setLabelList(labels)

    }, [apiUrl]);


    useEffect(() => {
        setLabelList(labels); // LABELS

    }, [labels]);
    
    const handleRefresh = (e) => {
        e.preventDefault()
        dispatch(loadLabels(apiUrl))
    }

    const onLabelOpen = (e, value) => {
        e.preventDefault();
        value.selected = !value.selected;
        //  setLabel(value);
        const selected = labelList.filter((f) => f.selected);
        setLabelsSelected(selected);

        //   setFilteredPlaceholder(value);

        const query = queryBuilder(labelList);
        dispatch(setQuery(query))

        //this.setState({ ...this.state, query });

        dispatch(loadLabelValues(value, labelList, apiUrl));
        // loads label values into labelList

    };


    const onLabelValueClick = (e, value) => {
        e.preventDefault()
        value.selected = !value.selected;
        value.inverted = false;
        onLabelValueChange();
    };

    const selectedList = () => {
        return labelsSelected.length > 0
    }
    const onLabelValueChange = () => {

        const query = queryBuilder(labels);
        dispatch(setQuery(query))
    };

    const styleValue = (value) => {
        if (value.selected) {
            return {
                'borderColor': '#11abab',
                color: "#11abab",
            };
        } else return {};
    };
    return (labelsBrowserOpen &&
        <div className={"labels-container"}>
            <div className={"valuesList"}>
                <div className={"valuelist-title"}>
                    <Legend
                        title={"Select labels to search in"}
                        text={"Which labels would you like to consider for your search?"} />
                    <LabelsFetchError />
                    <div className={"valuelist-content"}>

                        <button
                            className={"refresh-button"}
                            onClick={handleRefresh}
                            title={'Refresh Labels List'}
                        >
                            <RefreshIcon
                                fontSize={"small"}
                            />
                        </button>
                        {labelList &&
                            labelList?.map((value, key) => (
                                <small
                                    title={value.name}
                                    key={key}
                                    id={value.name}
                                    style={styleValue(value)}
                                    onClick={(e) => onLabelOpen(e, value)}
                                >
                                    {value.name}
                                </small>
                            ))}

                    </div>

                    {/* <div className="valuelist-filter">
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
                </div> */}

                </div>

                {selectedList() && (
                    <div className={"values-container"}>
                        <div className={"values-container-column"}>
                            {labelsSelected.map((labelSelected, skey) => (
                                <div className={"values-column"} key={skey}>
                                    <div className={"values-column-title"}>
                                        <span>
                                            {labelSelected.name} ({labelSelected.values.length})
                                        </span>
                                        <span className={"close-column"}
                                            onClick={(e) =>
                                                onLabelOpen(e, labelSelected)
                                            }
                                        >{CLOSE}</span>
                                    </div>
                                    <div className={"valuelist-content column"}>
                                        {labelSelected?.values?.map(
                                            (value, key) => (
                                                <Tooltip title={value.name} key={key} placement="bottom">
                                                    <small
                                                        className={"label-value"}
                                                        style={styleValue(value)}
                                                        onClick={(e) => onLabelValueClick(e, value)}
                                                    >
                                                        {value.name}
                                                    </small>
                                                </Tooltip>
                                                
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
