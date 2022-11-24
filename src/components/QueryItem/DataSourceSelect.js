import { useMemo } from "react";
import { InputGroup } from "../../views/DataSources/styles";

import { Label } from "./style";


export const DataSourceSelect = (props) => {
    const { value, onChange, opts, label } = props;
    const formattedSelect = useMemo(() => {
        if (typeof opts[0] === "string") {
            return opts.map((k) => ({ value: k, name: k }));
        } else return opts;
    }, [opts]);
    if(opts && value) {
        return (
            <InputGroup>
                {label?.length > 0 && <Label>{label}</Label>}
                <select defaultValue={value?.value} onChange={onChange}>
                    {formattedSelect?.map((field, key) => (
                        <option key={key} value={field?.value}>
                            {field?.name}
                        </option>
                    ))}
                </select>
            </InputGroup>
        );
    } return null

};
