import { cx, css } from "@emotion/css";

import { useEffect, useMemo, useRef, useState } from "react";
import { InputGroup, Label } from "../styles";

const FlexOne = (fullWidth) => css`
    display: flex;
    flex: ${fullWidth ? 1 : 0};
`;

export const Select = (props) => {
    const { value, locked, onChange, opts, label, name, fullWidth, width } =
        props;

    const [initialValue, setInitialValue] = useState("");
    const selectRef = useRef(null);
    const formattedSelect = useMemo(() => {
        if (typeof opts[0] === "string") {
            return opts.map((k) => ({ value: k, name: k }));
        } else return opts;
    }, [opts]);

    useEffect(() => {
        const selected = formattedSelect?.find((f) => f.name === value)?.["value"];
        if (selected && selectRef?.current?.value !== selected) {
            setInitialValue(selected);
            selectRef.current.value = selected;
        }
    }, [value]);

    return (
        <InputGroup>
            {label?.length > 0 && <Label width={width || null}>{label}</Label>}
            <select
                ref={selectRef}
                className={cx(FlexOne(fullWidth))}
                disabled={locked}
                defaultValue={initialValue}
                onChange={(e) => onChange(e, name)}
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
