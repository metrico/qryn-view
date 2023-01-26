// export default useTracesService(){

import { css, cx } from "@emotion/css";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getData from "../../actions/getData";
import { themes } from "../../theme/themes";
import { Field, Select } from "../../views/DataSources/ui";
import { formatUrl } from "./tracesSearchUrl";
import { useTraceNames } from "./useTraceNames";
import { useTraceServiceName } from "./useTraceServiceName";

const SearchColumn = css`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
`;

const SearchRow = css`
    //align-items:center;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
`;

const TraceButton = (theme: any) => css`
    background: ${theme.primaryDark};
    border: 1px solid ${theme.buttonBorder};
    border-radius: 3px;
    color: ${theme.buttonText};
    margin-left: 5px;
    transition: 0.25s all;
    justify-content: center;
    padding: 3px 12px;
    margin-top: 5px;
    height: 30px;
    display: flex;
    align-items: center;
    align-self: flex-end;
    max-width:200px;
    cursor: pointer;
    &:hover {
        background: ${theme.primaryLight};
    }
`;

// }

export const TRACE_SEARCH_LABEL_WIDTH = 75

export default function TracesSearch(props: any) {
    const {
        name,
        data: { id, dataSourceId, dataSourceType, dataSourceURL, expr },
        onSearchChange,
    } = props;

    const dispatch = useDispatch();

    const storeTheme = useSelector(
        (store: { theme: "dark" | "light" }) => store.theme
    );
    const serviceNameOpts = useTraceServiceName({ id: dataSourceId });
    const traceNameOpts = useTraceNames({ id: dataSourceId });
    const [searchValue, setSearchValue] = useState({ name: "", value: "" });
    const [spanValue, setSpanValue] = useState(
        traceNameOpts[0] || { name: "", value: "" }
    );

    const [buttonActive, setButtonActive] = useState(false);

    const theme = useMemo(() => {
        return themes[storeTheme];
    }, [storeTheme]);
    const [urlState, setUrlState] = useState({
        searchName: searchValue.value || "",
        name: spanValue.value || "",
        tags: "",
        minDuration: "",
        maxDuration: "",
        limit: 20,
    });

    const [urlString, setUrlString] = useState("");

    useEffect(() => {
        if (serviceNameOpts.length > 0) {
            setUrlString(formatUrl(urlState));
        }

        if (searchValue.value !== "") {
            setButtonActive(true);
        } else {
            setButtonActive(false);
        }
    }, [urlState]);

    const emit = () => {
        return {
            dataSourceType,
            expr,
            queryType: "trace-search",
            limit: urlState.limit,
            name,
            id,
            direction: "forward",
            dataSourceId,
            url: dataSourceURL + "/api/" + urlString,
        };
    };

    const onServiceChange = (e: any) => {
        const value = e?.target?.value || "";
        setSearchValue({ name: value, value: value });
        setUrlState((prev) => ({ ...prev, searchName: value }));
        onSearchChange(emit());
    };

    const onSpanChange = (e: any) => {
        const value = e?.target?.value || "";
        setSpanValue({ name: value, value: value });
        setUrlState((prev) => ({ ...prev, name: value }));
        onSearchChange(emit());
    };

    const onChange = (e: any, key: any) => {
        const value = e?.target?.value || "";
        setUrlState((prev) => ({ ...prev, [key]: value }));
        onSearchChange(emit());
    };

    const onSubmit = () => {
        if (dataSourceURL && dataSourceURL !== "") {
            dispatch(
                getData(
                    dataSourceType,
                    expr,
                    "trace-search",
                    urlState.limit,
                    name,
                    id,
                    "forward",
                    dataSourceId,
                    dataSourceURL + "/api/" + urlString
                )
            );
        }
    };

    return (
        <div className={cx(SearchColumn)}>
            <div className={cx(SearchRow)}>
                <Select
                    fullWidth={true}
                    label={"Service Name"}
                    placeHolder={"Select a Service"}
                    onChange={onServiceChange}
                    value={searchValue}
                    opts={serviceNameOpts}
                    labelWidth={TRACE_SEARCH_LABEL_WIDTH}
                />

                <Select
                    fullWidth={true}
                    label={"Span Name"}
                    placeHolder={"select a span"}
                    onChange={onSpanChange}
                    value={spanValue}
                    opts={traceNameOpts}
                    labelWidth={TRACE_SEARCH_LABEL_WIDTH}
                />

                <Field
                    label={"Tags"}
                    placeholder={"http.status_code=200 error=true"}
                    onChange={(e: any) => onChange(e, "tags")}
                    value={urlState.tags}
                    labelWidth={TRACE_SEARCH_LABEL_WIDTH}
                />
                <Field
                    label={"Limit"}
                    placeholder={"Set limit, default 20"}
                    onChange={(e: any) => onChange(e, "limit")}
                    value={urlState.limit}
                    labelWidth={TRACE_SEARCH_LABEL_WIDTH}
                />

                <Field
                    label={"Min Duration"}
                    placeholder={"e.g. 1.2s, 100ms"}
                    onChange={(e: any) => onChange(e, "minDuration")}
                    value={urlState.minDuration}
                    labelWidth={TRACE_SEARCH_LABEL_WIDTH}
                />
                <Field
                    label={"Max Duration"}
                    placeholder={"e.g. 1.2s, 100ms"}
                    onChange={(e: any) => onChange(e, "maxDuration")}
                    value={urlState.maxDuration}
                    labelWidth={TRACE_SEARCH_LABEL_WIDTH}
                />

                <button className={cx(TraceButton(theme))} onClick={onSubmit}>
                    Search Traces
                </button>
            </div>
        </div>
    );
}
