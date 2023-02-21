import { forwardRef, useMemo } from "react";
import Select, { components } from "react-select";
import { Icon } from "../../../views/DataSources/ui";
//import { InfoContent } from "../../DataViews/components/InfoContent";
import { selectTheme } from "../../DataViews/components/QueryBuilder/helpers";
import { useTheme } from "../../DataViews/components/QueryBuilder/hooks";
import { cStyles } from "../../DataViews/components/QueryBuilder/styles";

export const SelectIconStyle = {
    height: "18px",
    width: "18px",
    marginRight: "3px",
};

export const SelectOptionStyle = {
    display: "flex",
    alignItems: "center",
};

export const SingleValueStyle = {
    display: "flex",
    alignItems: "flex-end",
};
export const SingleValueIconStyle = {
    height: "14px",
    width: "14px",
    marginRight: "3px",
};

export function Placeholder(props: any) {
    const { defaultValue, options } = props;

    const defaultOption = useMemo(() => {
        const found = options?.find((f: any) => f?.value === defaultValue);
        return {
            icon: found?.icon,
            label: found?.label,
        };
    }, [defaultValue, options]);

    return (
        <div style={SingleValueStyle}>
            <Icon icon={defaultOption.icon} style={SingleValueIconStyle} />
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
                <Icon icon={icon} style={SelectIconStyle} />
                <span style={{ fontSize: "14px" }}>{label}</span>
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
            <Icon icon={icon} style={SingleValueIconStyle} />
            <div>{label}</div>
        </div>
    );
};

export const IconSelect = forwardRef((props: any, ref: any) => {
    const { options, onSelectChange } = props;
    const mainTheme = useTheme();

    return (
        <Select
            styles={cStyles(mainTheme, 100)}
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
    );
});
