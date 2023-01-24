import { useMemo, useRef, useEffect } from "react";
import { IconSelect } from "./components/DataSourceSelectOption";


interface Props {
    value:any; 
    onChange: (e:any) => void;
    opts:any;
    extValue:any;
    label:any;
}

export const DataSourceSelect = (props: Props) => {
    const { value, onChange, opts, extValue } = props;


    const selectRef: any = useRef(null);
    /// add the initial data source name
    useEffect(() => {
        if (value?.value !== extValue && extValue !== "" ) {
            selectRef.current.value = extValue;
        }
    }, []);

    useEffect(() => {
        if (value?.value !== extValue && extValue !== "" && selectRef?.current) {
            selectRef.current.setValue(extValue);
        }
    }, [extValue]);
    const customSelectChange = (e: any) => {
        onChange({ target: { value: e?.value } });
    };

    const customFormattedSelect = useMemo(() => {
        return opts.map((k: any) => ({
            value: k?.value,
            label: k?.name,
            icon: k?.icon,
        }));
    }, [opts]);

    if (opts ) {
        return (
            <IconSelect
                ref={selectRef}
                defaultValue={extValue}
                options={customFormattedSelect}
                onSelectChange={customSelectChange}
            />
        );
    }
    return null;
};
