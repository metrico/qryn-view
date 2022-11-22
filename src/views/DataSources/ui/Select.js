import { useMemo } from "react";
import { InputGroup, Label } from "../styles";



export const Select = (props) => {
    const { value, locked, onChange, opts, label, name } = props;

    const formattedSelect = useMemo(() => {
        if (typeof opts[0] === "string") {
            return opts.map((k) => ({ value: k, name: k }));
        } else return opts;
    }, [opts]);

    return (
        <InputGroup>
            {label?.length > 0 && <Label>{label}</Label>}
            <select
                disabled={locked}
                defaultValue={value}
                onChange={e => onChange(e,name)}
            >
                {formattedSelect?.map((field, key) => (
                    <option key={key} value={field.value}>
                        {field.name}
                    </option>
                ))}
            </select>
        </InputGroup>
    );
};