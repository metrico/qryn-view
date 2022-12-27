import { forwardRef } from "react";
import Select, { components } from "react-select";
import { Icon } from "../../../views/DataSources/ui";
import { selectTheme } from "../../DataViews/components/QueryBuilder/helpers";
import { useTheme } from "../../DataViews/components/QueryBuilder/hooks";
import { cStyles } from "../../DataViews/components/QueryBuilder/styles";

export const DataSourceSelectOption = (props: any) => {
    
    const { Option } = components;

    const {
        data: { label,icon},
    } = props;

    return (
        <Option {...props}>
            <div style={{display:'flex',alignItems:'center'}}>
               <Icon icon={icon} style={{height:'18px',width:'18px',marginRight:'3px'}} />
                <span style={{fontSize:'14px'}}>{label}</span>
            </div>
        </Option>
    );
};

export const IconSelect = forwardRef ((props:any, ref:any) => {
    const {options, onSelectChange }= props;
    const mainTheme = useTheme()

    return (
        <Select
            styles={cStyles(mainTheme, 100)}
            options={options}
            ref={ref}
            components={{Option:DataSourceSelectOption}}
            theme={(theme) => selectTheme(theme, mainTheme)}
            onChange={onSelectChange}
        />
    )
})
