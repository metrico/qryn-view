import { useMemo } from "react";
import { InputGroup, Label } from "./styled";

export interface Field {
    name: string;
    value: string;
}


export default function Select (props:any) {

    const { value, locked, onChange, opts, label } = props;

    const formattedSelect = useMemo(() => {
        if (typeof opts[0] === "string") {
            return opts.map((k:string) => ({ value: k, name: k }));
        } else return opts;
    }, [opts]);

    return (
        <InputGroup>
            {label?.length > 0 && <Label>{label}</Label>}
            <select
                disabled={locked}
                defaultValue={value.toLowerCase()}
                onChange={onChange}
            >
                {formattedSelect?.map((field:Field, key:number) => (
                    <option key={key} value={field.value}>
                        {field.name}
                    </option>
                ))}
            </select>
        </InputGroup>
    );
}