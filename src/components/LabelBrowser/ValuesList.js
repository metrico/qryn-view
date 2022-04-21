import React, { useState, useEffect } from "react";
import { Legend } from "./Legend";
import { useSelector, useDispatch } from "react-redux";
import RefreshIcon from "@mui/icons-material/Refresh";
import loadLabels from "../../actions/loadLabels";
import { queryBuilder } from "./helpers/querybuilder";
import { setQuery } from "../../actions";
import loadLabelValues from "../../actions/loadLabelValues";

import Tooltip from "@mui/material/Tooltip";
import store from "../../store/store";
import styled from "@emotion/styled";

const ErrorContainer = styled.div`
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const LabelErrorStyled = styled.div`
    padding: 10px;
    color: orangered;
    border: 1px solid orangered;
    border-radius: 3px;
    font-size: 1em;
`;

export const LabelsFetchError = () => {
    const labelError = useSelector((store) => store.apiErrors);

    return (
        <ErrorContainer>
            {labelError !== "" && (
                <LabelErrorStyled>
                    <span> {labelError}</span>
                </LabelErrorStyled>
            )}
        </ErrorContainer>
    );
};

export const ValuesList = (props) => {
    const [labelsSelected, setLabelsSelected] = useState([]);
    const labels = useSelector((state) => {
        const selected = state.labels.filter((f) => f.selected);
        if (JSON.stringify(selected) !== JSON.stringify(labelsSelected)) {
            setLabelsSelected(selected);
        }
        return state.labels;
    });

    const [labelList, setLabelList] = useState(labels);

    const dispatch = useDispatch();
    const debug = useSelector((store) => store.debugMode);
    const apiUrl = useSelector((store) => store.apiUrl);
    if (debug) console.log('🚧 LOGIC/LabelBrowser/ValuesList', apiUrl)
    const labelsBrowserOpen = useSelector((store) => store.labelsBrowserOpen);
    const CLEAR = "clear";
    useEffect(() => {
        dispatch(loadLabels(apiUrl));
    }, [apiUrl]);

    useEffect(() => {
        setLabelList(labels); // LABELS
    }, [labels]);

    const handleRefresh = (e) => {
        e.preventDefault();
        dispatch(loadLabels(apiUrl));
    };

    const onLabelOpen = (e, value) => {
        e.preventDefault();
        value.selected = !value.selected;
        const selected = labelList.filter((f) => f.selected);
        setLabelsSelected(selected);

        const query = queryBuilder(labelList);
        dispatch(setQuery(query));

        //this.setState({ ...this.state, query });

        dispatch(loadLabelValues(value, labelList, apiUrl));
        // loads label values into labelList
    };

    const onLabelValueClick = (e, value) => {
        e.preventDefault();
        value.selected = !value.selected;
        value.inverted = false;
        onLabelValueChange();
    };

    const selectedList = () => {
        return labelsSelected.length > 0;
    };
    const onLabelValueChange = () => {
        const query = queryBuilder(labels);
        dispatch(setQuery(query));
    };

    const styleValue = (value) => {
        if (value.selected) {
            return {
                borderColor: "#11abab",
                color: "#11abab",
            };
        } else return {};
    };
    const isString = (value) => {
        return typeof value === 'string'
    }
    return (
        labelsBrowserOpen && (
            <div className={"labels-container"}>
                <div className={"valuesList"}>
                    {labelList.length > 0 ? (
                        <div className={"valuelist-title"}>
                            <Legend
                                title={"Select labels to search in"}
                                text={
                                    "Which labels would you like to consider for your search?"
                                }
                            />

                            <div className={"valuelist-content"}>
                                <button
                                    className={"refresh-button"}
                                    onClick={handleRefresh}
                                    title={"Refresh Labels List"}
                                >
                                    <RefreshIcon fontSize={"small"} />
                                </button>
                                {labelList &&
                                    labelList?.map((value, key) => (
                                        <small
                                            title={value?.name || ''}
                                            key={key}
                                            id={value.name}
                                            style={styleValue(value)}
                                            onClick={(e) =>
                                                onLabelOpen(e, value)
                                            }
                                        >
                                            {value.name}
                                        </small>
                                    ))}
                            </div>
                        </div>
                    ) : (
                        <LabelsFetchError />
                    )}

                    {selectedList() && (
                        <div className={"values-container"}>
                            <div className={"values-container-column"}>
                                {labelsSelected.map((labelSelected, skey) => (
                                    <div className={"values-column"} key={skey}>
                                        <div className={"values-column-title"}>
                                            <span>

                                                {labelSelected.name} (
                                                {labelSelected.values.length})
                                            </span>
                                            <span
                                                className={"close-column"}
                                                onClick={(e) =>
                                                    onLabelOpen(
                                                        e,
                                                        labelSelected
                                                    )
                                                }
                                            >
                                                {CLEAR}
                                            </span>
                                        </div>
                                        <div
                                            className={
                                                "valuelist-content column"
                                            }
                                        >

                                            {labelSelected?.values?.map(
                                                (value, key) => (

                                                    isString(value.name) ? (
                                                        <Tooltip
                                                            title={value?.name || ''}
                                                            key={key}
                                                            placement="bottom"
                                                        >

                                                            <small
                                                                className={
                                                                    "label-value"
                                                                }
                                                                style={styleValue(
                                                                    value
                                                                )}
                                                                onClick={(e) =>
                                                                    onLabelValueClick(
                                                                        e,
                                                                        value
                                                                    )
                                                                }
                                                            >

                                                                {value.name}
                                                            </small>
                                                        </Tooltip>
                                                    ) : (<small key={key}>unknown</small>)

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
        )
    );
};
