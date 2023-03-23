import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import useLabels from "../../LabelBrowser/components/LabelsSelector/useLabels";
import useLabelValues from "../../LabelBrowser/components/LabelsSelector/useLabelValues";
import NativeSelect from "../Forms/NativeSelect";
import Select from "react-select";
import { useTheme } from "../../../theme";

export const cStyles = {
    menu: (base: any) => ({
        ...base,
        fontSize: "12px",
    }),
    control: (base: any) => ({
        ...base,
        fontSize: "12px",
        height: 24,
        minHeight: 24,
        boxShadow: "none",
    }),
    input: (base: any) => ({
        ...base,
        fontSize: "12px",
    }),
    indicatorSeparator: (base: any) => ({
        display: "none",
    }),
    dropdownIndicator: (base: any) => ({
        padding: 0,
        svg: {
            height: 12,
        },
    }),
    clearIndicator: (base: any) => ({
        padding: 0,
        svg: {
            height: 12,
        },
    }),
    singleValue: (base: any) => ({
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

export function OperatorSelect(props: any) {
    const [operator, setOperator] = useState("equals");

    const [ops] = useState(OPERATORS);

    const onChange = (e: any) => {
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

export function LabelSelect(props: any) {
    const { data } = props;
    const { dataSourceId } = data;
    const { loading, response }: any = useLabels(dataSourceId);
    const [labels] = useState([]);
    const [label, setLabel] = useState("");

    useEffect(() => {
        props.onChange(label);
        //eslint-disable-next-line
    }, [label]);

    const onChange = (e: any) => {
        setLabel((_) => e.target.value);
    };

    useEffect(() => {
        if (response?.data?.data) {
            setLabel((_) => response?.data?.data[0]);
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

export function ValueSelect(props: any) {
    const { data } = props;
    const { dataSourceId } = data;
    const start = useSelector((state: any) => state.start);
    const stop = useSelector((state: any) => state.stop);

    const [values, setValues] = useState([]);
    const { label, operator } = props;
    const { response }: any = useLabelValues(dataSourceId, label, start, stop);
    const onChange = (e: any) => {
        props.onChange(e);
    };
    const mainTheme = useTheme();
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

export default function LabelSelectorItem(props: any) {
    const { item } = props;
    const [label, setLabel] = useState("");
    const [operator, setOperator] = useState("equals");

    const [labelGroup, setLabelGroup] = useState(item);

    const onLabelChange = (e: any) => {
        setLabel(e);

        const newLabel = { label: e };
        setLabelGroup((prev: any) => {
            return { ...prev, ...newLabel };
        });

        props.onSelectorChange({ ...labelGroup, ...newLabel });
    };

    const onValueChange = (e: any) => {
        setLabelGroup((prev: any) => ({ ...prev, value: e }));

        const newValue = { value: e };
        props.onSelectorChange({ ...labelGroup, ...newValue });
    };

    const onOperatorChange = (e: any) => {
        setOperator(e);
        setLabelGroup((prev: any) => ({ ...prev, op: e }));
        const newOperator = { op: e };
        props.onSelectorChange({ ...labelGroup, ...newOperator });
    };

    const onRemoveLabel = (e: any) => {
        props.onSelectorRemove(labelGroup);
    };

    const onAddLabel = (e: any) => {
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
            <DeleteForeverOutlinedIcon
                className={"opt-icon"}
                fontSize={"small"}
                onClick={onRemoveLabel}
            />
            <AddIcon
                className={"opt-icon"}
                fontSize={"small"}
                onClick={onAddLabel}
            />
        </div>
    );
}
