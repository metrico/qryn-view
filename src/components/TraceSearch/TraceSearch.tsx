// export default useTracesService(){

import { css, cx } from "@emotion/css";
import { useEffect, useMemo, useState, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import getData from "../../actions/getData";
import { themes } from "../../theme/themes";
import { Field /* Select */ } from "../../views/DataSources/ui";
import { formatUrl } from "./tracesSearchUrl";
import { useTraceNames } from "./useTraceNames";
import { useTraceServiceName } from "./useTraceServiceName";
import Select, { components } from "react-select";
import { useTheme } from "../DataViews/components/QueryBuilder/hooks";
import { cStyles } from "../DataViews/components/QueryBuilder/styles";
import { selectTheme } from "../DataViews/components/QueryBuilder/helpers";

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
    max-width: 200px;
    cursor: pointer;
    &:hover {
        background: ${theme.primaryLight};
    }
`;

// }

export const TRACE_SEARCH_LABEL_WIDTH = 75;


export const SelectOptionStyle = {
    display: "flex",
    alignItems: "center",
    flex: 1,
    width: "100%",
};

export const SingleValueStyle = {
    display: "flex",
    alignItems: "flex-end",
    flex: 1,
    width: "100%",
};

export function Placeholder(props: any) {
    const { defaultValue, options } = props;

    const defaultOption = useMemo(() => {
        const found = options?.find((f: any) => f?.value === defaultValue);
        return {
            label: found?.label,
        };
    }, [defaultValue, options]);

    return (
        <div style={SingleValueStyle}>
            <div>{defaultOption.label}</div>
        </div>
    );
}

export const DataSourceSelectOption = (props: any) => {
    const { Option } = components;

    const {
        data: { label, icon },
    } = props;

    return (
        <Option {...props}>
            <div style={SelectOptionStyle}>
                <span style={{ fontSize: "12px" }}>{label}</span>
            </div>
        </Option>
    );
};

export const DataSourceSelectSingleValue = (props: any) => {
    const {
        data: { icon, label },
    } = props;
    return (
        <div style={SingleValueStyle}>
            <div>{label}</div>
        </div>
    );
};

export const SearchSelect = forwardRef((props: any, ref: any) => {
    const { options, onSelectChange, label, labelWidth } = props;

    const mainTheme = useTheme();

    return (
        <div
            style={{
                marginTop: "5px",
                display: "flex",
                alignItems: "center",
                flex: 1,
                whiteSpace: "nowrap",
            }}
        >
            <label
                style={{
                    width: `${labelWidth}px`,
                    fontSize: "12px",
                    color: mainTheme.textColor,
                    padding: "0px 10px",
                }}
            >
                {label}
            </label>

            <Select
                styles={cStyles(mainTheme, 100, true)}
                placeholder={<Placeholder {...props} />}
                options={options}
                ref={ref}
                components={{
                    Option: DataSourceSelectOption,
                    SingleValue: DataSourceSelectSingleValue,
                }}
                theme={(theme) => selectTheme(theme, mainTheme)}
                onChange={onSelectChange}
            />
        </div>
    );
});

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
    const [searchValue, setSearchValue] = useState({
        name: "",
        value: "",
        label: "",
    });
    const [spanValue, setSpanValue] = useState(
        traceNameOpts[0] || { name: "", value: "", label: "" }
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
        console.log(e);
        const value = e?.value || "";
        setSearchValue({ name: value, value: value, label: value });
        setUrlState((prev) => ({ ...prev, searchName: value }));
        onSearchChange(emit());
    };

    const onSpanChange = (e: any) => {
        console.log(e);
        const value = e?.value || "";
        setSpanValue({ name: value, value: value, label: value });
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
                <SearchSelect
                    {...props}
                    defaultValue={""}
                    label={"Service Name"}
                    options={serviceNameOpts}
                    onSelectChange={onServiceChange}
                    labelWidth={TRACE_SEARCH_LABEL_WIDTH}
                />

                <SearchSelect
                    {...props}
                    defaultValue={""}
                    label={"Span Name"}
                    options={traceNameOpts}
                    onSelectChange={onSpanChange}
                    labelWidth={TRACE_SEARCH_LABEL_WIDTH}
                />
                {/* <Select
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
                /> */}

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
