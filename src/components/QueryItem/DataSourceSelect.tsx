import { useMemo, useRef, useEffect } from "react";
import { InputGroup } from "../../views/DataSources/styles";

import { Label } from "./style";

export const DataSourceSelect = (props: any) => {
    const { value, onChange, opts, label, extValue } = props;

    const selectRef: any = useRef(null);

    useEffect(() => {
        if (value.value !== extValue) {
            selectRef.current.value = extValue;
        }
    }, []);

    useEffect(() => {
        if (value.value !== extValue) {
            selectRef.current.value = extValue;
        }
    }, [extValue]);

    const formattedSelect = useMemo(() => {
        if (typeof opts[0] === "string") {
            return opts.map((k: any) => ({ value: k, name: k }));
        } else return opts;
    }, [opts]);

    if (opts && value) {
        return (
            <InputGroup title={"Select Data Source Type"}>
                {label?.length > 0 && <Label>{label}</Label>}
                <select
                    ref={selectRef}
                    defaultValue={extValue}
                    onChange={onChange}
                >
                    {formattedSelect?.map((field: any, key: number) => (
                        <option key={key} value={field?.value}>
                            {field?.name}
                        </option>
                    ))}
                </select>
            </InputGroup>
        );
    }
    return null;
};
