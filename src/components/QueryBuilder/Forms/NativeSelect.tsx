import { useMemo } from "react";
import { InputGroup, Label } from "./styled";

export interface Field {
    label: string;
    value: string;
}

export default function NativeSelect(props: any) {
    const { value, locked, onChange, opts, label, placeholder } = props;
    const formattedSelect = useMemo(() => {
        if (typeof opts[0] !== "object") {
            return opts.map((k: string) => ({ value: k, label: k }));
        } else {
            return opts;
        }
    }, [opts]);

    return (
        <InputGroup>
            {label?.length > 0 && <Label>{label}</Label>}
            <select
                disabled={locked}
                defaultValue={value.toLowerCase()}
                onChange={onChange}
            >
                {" "}
                {placeholder && <option value={""}>{placeholder}</option>}
                {formattedSelect?.map((field: Field, key: number) => (
                    <option key={key} value={field.value}>
                        {field.label}
                    </option>
                ))}
            </select>
        </InputGroup>
    );
}
