import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import useLabels from "../../LabelBrowser/components/LabelsSelector/useLabels";
import useLabelValues from "../../LabelBrowser/components/LabelsSelector/useLabelValues";
import NativeSelect from "../Forms/NativeSelect";
import Select from "react-select";
import { nanoid } from "nanoid";
import { themes } from "../../../theme/themes";

export const cStyles = {
    menu: (base) => ({
        ...base,
        fontSize: "12px",
    }),
    control: (base) => ({
        ...base,
        fontSize: "12px",
        height: 24,
        minHeight: 24,
        boxShadow: "none",
    }),
    input: (base) => ({
        ...base,
        fontSize: "12px",
    }),
    indicatorSeparator: (base) => ({
        display: "none",
    }),
    dropdownIndicator: (base) => ({
        padding: 0,
        svg: {
            height: 12,
        },
    }),
    clearIndicator: (base) => ({
        padding: 0,
        svg: {
            height: 12,
        },
    }),
    singleValue: (base) => ({
        ...base,
        fontSize: "12px",
        height: 24,
        minHeight: 24,
        margin: 0,
        padding: 0,
        marginTop: "4px",
    }),
};

export const OPERATORS = [
    { label: "=", value: "equals" },
    { label: "=~", value: "regexequals" },
    { label: "!=", value: "notequals" },
    { label: "!~", value: "regexnotequals" },
];

export function OperatorSelect(props) {
    const [operator, setOperator] = useState("equals");

    const theme = useSelector((store) => store.theme);

    const mainTheme = useMemo(() => {
        return themes[theme];
    }, [theme]);

    const selectStyles = useMemo(() => {
        return {
            option: (provided, state) => ({
                ...provided,
                borderBottom: "1px dotted pink",
                color: state.isSelected ? "red" : "blue",
                padding: 20,
            }),
            control: () => ({
                // none of react-select's styles are passed to <Control />
                width: 200,
            }),
            singleValue: (provided, state) => {
                const opacity = state.isDisabled ? 0.5 : 1;
                const transition = "opacity 300ms";

                return { ...provided, opacity, transition };
            },
        };
    }, [mainTheme]);

    const [ops, setOps] = useState(OPERATORS);

    const onChange = (e) => {
        setOperator(e.target.value);

        props.onChange(e.target.value);
    };

    return (
        <NativeSelect
            opts={ops}
            value={operator}
            onChange={onChange}
            label={""}
        />
    );
}

export function LabelSelect(props) {
    const { data } = props;
    const { dataSourceId } = data;
    const { loading, response } = useLabels(dataSourceId);
    const [labels, setLabels] = useState([]);
    const [label, setLabel] = useState("");

    useEffect(() => {
        props.onChange(label);
    }, [label]);

    const onChange = (e) => {
        setLabel((_) => e.target.value);
    };

    useEffect(() => {
        if (response?.data?.data) {
            setLabels((_) => response.data.data);
            setLabel((_) => response.data.data[0]);
        }
    }, [response]);

    if (!loading) {
        return (
            <NativeSelect
                opts={labels}
                value={label}
                placeholder={"Please select label"}
                onChange={onChange}
                label={""}
            />
        );
    }
    return <></>;
}

export function ValueSelect(props) {
    const { data } = props;
    const {  dataSourceId } = data;
    const start = useSelector((state) => state.start);
    const stop = useSelector((state) => state.stop);

    const [values, setValues] = useState([]);
    const { label, operator } = props;
    const { response, loading } = useLabelValues(
        dataSourceId,
        label,
        start,
        stop
    );
    const onChange = (e) => {
        props.onChange(e);
    };

    const theme = useSelector((store) => store.theme);

    const mainTheme = useMemo(() => {
        return themes[theme];
    }, [theme]);

    const isMultiple = useMemo(() => {
        if (operator === "equals" || operator === "notequals") return false;
        return true;
    }, [operator]);


    useEffect(() => {
        if (response?.data?.data) {
            setValues(response.data.data);
        }
    }, [response]);

    return (
        <Select
            isMulti={isMultiple}
            options={values.map((m) => ({ value: m, label: m }))}
            styles={cStyles}
            theme={(theme) => ({
                ...theme,
                borderRadius: 2,
                fontSize: 12,
                colors: {
                    ...theme.colors,
                    primary: mainTheme.inputBg,
                    neutral90: mainTheme.textColor,
                    neutral80: mainTheme.textColor,
                    neutral0: mainTheme.inputBg,
                    primary25: mainTheme.widgetContainer,
                    neutral5: mainTheme.widgetContainer,
                    neutral10: mainTheme.widgetContainer,
                },
            })}
            onChange={onChange}
        />
    );
}

export default function LabelSelectorItem(props) {
    const { item } = props;
    const [label, setLabel] = useState("");
    const [operator, setOperator] = useState("equals");

    const [labelGroup, setLabelGroup] = useState(item);

    const onLabelChange = (e) => {
        setLabel(e);

        const newLabel = { label: e };
        setLabelGroup((prev) => {
            return { ...prev, ...newLabel };
        });

        props.onSelectorChange({ ...labelGroup, ...newLabel });
    };

    const onValueChange = (e) => {
        setLabelGroup((prev) => ({ ...prev, value: e }));

        const newValue = { value: e };
        props.onSelectorChange({ ...labelGroup, ...newValue });
    };

    const onOperatorChange = (e) => {
        setOperator(e);
        setLabelGroup((prev) => ({ ...prev, op: e }));
        const newOperator = { op: e };
        props.onSelectorChange({ ...labelGroup, ...newOperator });
    };

    const onRemoveLabel = (e) => {
        props.onSelectorRemove(labelGroup);
    };

    const onAddLabel = (e) => {
        props.onSelectorAdd(labelGroup);
    };

    return (
        <div
            className="label-group"
            style={{ display: "flex", alignItems: "center" }}
        >
            <LabelSelect {...props} onChange={onLabelChange} />
            <OperatorSelect onChange={onOperatorChange} />
            <ValueSelect
                {...props}
                label={label}
                operator={operator}
                onChange={onValueChange}
            />
            <DeleteForeverOutlinedIcon className={'opt-icon'} fontSize={'small'} onClick={onRemoveLabel} />
            <AddIcon className={'opt-icon'} fontSize={'small'} onClick={onAddLabel} />
        </div>
    );
}
