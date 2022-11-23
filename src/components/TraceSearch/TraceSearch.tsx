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
    display: flex;
    flex-wrap: wrap;
`;

const RowPadding = css`
    padding: 10px;
`;
const FlexEnd = css`
    justify-content: flex-end;
`;

const TraceButton = (theme: any, buttonActive: boolean) => css`
    background: ${buttonActive ? theme.primaryDark : ""};
    border: 1px solid ${theme.buttonBorder};
    border-radius: 3px;
    color: ${buttonActive ? theme.buttonText : theme.textColor};
    margin-left: 5px;
    transition: 0.25s all;
    justify-content: center;
    padding: 3px 12px;
    height: 28px;
    display: "flex";
    disabled: ${buttonActive};
    cursor: ${buttonActive ? "pointer" : "not-allowed"};

    &:hover {
        background: ${buttonActive ? theme.primaryLight : ""};
    }
`;

// }

export default function TracesSearch(props: any) {
    const {
        name,
        data: { id, dataSourceId, dataSourceType, dataSourceURL, expr },
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

    const onServiceChange = (e: any) => {
        const value = e?.target?.value || "";
        setSearchValue({ name: value, value: value });
        setUrlState((prev) => ({ ...prev, searchName: value }));
    };

    const onSpanChange = (e: any) => {
        const value = e?.target?.value || "";
        setSpanValue({ name: value, value: value });
        setUrlState((prev) => ({ ...prev, name: value }));
    };

    const onChange = (e: any, key: any) => {
        const value = e?.target?.value || "";
        setUrlState((prev) => ({ ...prev, [key]: value }));
    };

    const onSubmit = () => {
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
    };

    return (
        <div className={cx(SearchColumn)}>
            {/* <p>url: {urlString}</p> */}
            <div className={cx(SearchRow)}>
                <Select
                    label={"Service Name"}
                    placeHolder={"Select a Service"}
                    onChange={onServiceChange}
                    value={searchValue}
                    opts={serviceNameOpts}
                />

                <Select
                    label={"Span Name"}
                    placeHolder={"select a span"}
                    onChange={onSpanChange}
                    value={spanValue}
                    opts={traceNameOpts}
                />
            </div>
            <div className={cx(SearchRow)}>
                <Field
                    label={"tags"}
                    placeholder={"http.status_code=200 error=true"}
                    onChange={(e: any) => onChange(e, "tags")}
                    value={urlState.tags}
                />
                <Field
                    label={"limit"}
                    placeholder={"Set limit, default 20"}
                    onChange={(e: any) => onChange(e, "limit")}
                    value={urlState.limit}
                />
            </div>
            <div className={cx(SearchRow)}>
                <Field
                    label={"minDuration"}
                    placeholder={"e.g. 1.2s, 100ms"}
                    onChange={(e: any) => onChange(e, "minDuration")}
                    value={urlState.minDuration}
                />
                <Field
                    label={"maxDuration"}
                    placeholder={"e.g. 1.2s, 100ms"}
                    onChange={(e: any) => onChange(e, "maxDuration")}
                    value={urlState.maxDuration}
                />
            </div>
            <div className={cx(SearchRow, RowPadding, FlexEnd)}>
                <button
                    className={cx(TraceButton(theme, buttonActive))}
                    onClick={onSubmit}
                >
                    Search Traces
                </button>
            </div>
        </div>
    );
}
