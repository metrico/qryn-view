import React, { useState, useEffect } from "react";
import { Legend } from "./Legend";
import { useSelector, useDispatch } from "react-redux";
import RefreshIcon from "@mui/icons-material/Refresh";
import loadLabels from "../../actions/loadLabels";
import { queryBuilder } from "./helpers/querybuilder";
import { setQuery } from "../../actions";
import loadLabelValues from "../../actions/loadLabelValues";
import Tooltip from "@mui/material/Tooltip";
import styled from "@emotion/styled";

import { ThemeProvider } from "@emotion/react";
import { themes } from "../../theme/themes";

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
const ValuesListStyled = styled.div`
    background: ${(props) => props.theme.widgetContainer};
    .valuelist-content {
        small {
            color: ${(props) => props.theme.textColor};
            background: ${(props) => props.theme.buttonDefault} !important;
            border: 1px solid ${(props) => props.theme.buttonBorder};
            margin: 5px;
            padding: 4px 8px;
            border-radius: 3px;
            line-height: 1.5;
            font-size: 12px;
            cursor: pointer;
            align-items: center;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            max-width: 23ch;
            transition: 1s all;
            &:hover {
                background: ${({ theme }) => theme.buttonHover};
            }
        }
    }

    button {
        color: ${(props) => props.theme.textColor};
        background: ${(props) => props.theme.buttonDefault} !important;
        border: 1px solid ${(props) => props.theme.buttonBorder} !important;
        padding: 13px 8px;
        &:hover {
            background: ${(props) => props.theme.buttonHover};
        }
    }
    .values-container {
        .values-column {
            background: ${(props) => props.theme.buttonHover};
        }
        .values-column-title {
            color: ${(props) => props.theme.textColor};
            background: ${(props) => props.theme.historyRow};
            border-bottom: 2px solid ${(props) => props.theme.widgetTitleBorder};
        }
    }
`;
export const LabelsFetchError = () => {
    const labelError = useSelector((store) => store.apiErrors);
    const theme = useSelector((store) => store.theme);

    return (
        <ThemeProvider theme={themes[theme]}>
            <ErrorContainer>
                {labelError !== "" && (
                    <LabelErrorStyled>
                        <span> {labelError}</span>
                    </LabelErrorStyled>
                )}
            </ErrorContainer>
        </ThemeProvider>
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

    const theme = useSelector((store) => store.theme);
    const dispatch = useDispatch();
    const debug = useSelector((store) => store.debugMode);
    const apiUrl = useSelector((store) => store.apiUrl);

    const labelsBrowserOpen = useSelector((store) => store.labelsBrowserOpen);
    const CLEAR = "clear";

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

        dispatch(loadLabelValues(value, labelList, apiUrl));
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

    return (
        labelsBrowserOpen && (
            <ThemeProvider theme={themes[theme]}>
                <ValuesListStyled>
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
                                            <RefreshIcon
                                                style={{
                                                    height: "18px",
                                                    width: "18px",
                                                }}
                                            />
                                        </button>
                                        {labelList &&
                                            labelList?.map((value, key) => (
                                                <small
                                                    title={value.name}
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
                                        {labelsSelected.map(
                                            (labelSelected, skey) => (
                                                <div
                                                    className={"values-column"}
                                                    key={skey}
                                                >
                                                    <div
                                                        className={
                                                            "values-column-title"
                                                        }
                                                    >
                                                        <span>
                                                            {labelSelected.name}{" "}
                                                            (
                                                            {
                                                                labelSelected
                                                                    .values
                                                                    .length
                                                            }
                                                            )
                                                        </span>
                                                        <span
                                                            className={
                                                                "close-column"
                                                            }
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
                                                                <Tooltip
                                                                    title={
                                                                        value.name
                                                                    }
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
                                                                        onClick={(
                                                                            e
                                                                        ) =>
                                                                            onLabelValueClick(
                                                                                e,
                                                                                value
                                                                            )
                                                                        }
                                                                    >
                                                                        {
                                                                            value.name
                                                                        }
                                                                    </small>
                                                                </Tooltip>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </ValuesListStyled>
            </ThemeProvider>
        )
    );
};
