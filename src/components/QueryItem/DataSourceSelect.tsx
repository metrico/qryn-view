import { useMemo, useRef, useEffect } from "react";
import { InputGroup } from "../../views/DataSources/styles";

import { Label } from "./style";
import { IconSelect } from "./components/DataSourceSelectOption";
export const DataSourceSelect = (props: any) => {
    const { value, onChange, opts, label, extValue } = props;

    const selectRef: any = useRef(null);

    useEffect(() => {
        if (value.value !== extValue && extValue !== "") {
            selectRef.current.value = extValue;
        }
    }, []);

    useEffect(() => {
        if (value.value !== extValue && extValue !== "") {
            selectRef.current.value = extValue;
        }
    }, [extValue]);
    const customSelectChange = (e: any) => {
        onChange({ target: { value: e.value } });
    };

    const customFormattedSelect = useMemo(() => {
        return opts.map((k: any) => ({
            value: k.value,
            label: k.name,
            icon: k.icon,
        }));
    }, [opts]);

    if (opts && value) {
        return (
            <InputGroup title={"Select Data Source Type"}>
                {label?.length > 0 && <Label>{label}</Label>}
                <IconSelect
                    ref={selectRef}
                    defaultValue={extValue}
                    options={customFormattedSelect}
                    onSelectChange={customSelectChange}
                />
            </InputGroup>
        );
    }
    return null;
};
