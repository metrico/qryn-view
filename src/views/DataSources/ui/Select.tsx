import { cx, css } from "@emotion/css";

import { useEffect, useMemo, useRef, useState } from "react";
import { InputGroup, Label } from "../styles";

const FlexOne = (fullWidth: any) => css`
    display: flex;
    flex: ${fullWidth ? 1 : 0};
`;

export const Select = ({
    value,
    locked,
    onChange,
    opts,
    label,
    name,
    fullWidth,
    width,
}: any) => {
    const [initialValue, setInitialValue] = useState("");
    const selectRef: any = useRef(null);
    function formatCharsLength(char: string) {
        if (char?.length < 60) {
            return char;
        }
        return `${char.substring(0, 60)}...`;
    }
    const formattedSelect = useMemo(() => {
        if (typeof opts[0] === "string") {
            return opts.map((k: string) => ({
                value: k,
                name: formatCharsLength(k),
            }));
        } else
            return opts?.map((m: any) => ({
                ...m,
                name: formatCharsLength(m.name),
            }));
    }, [opts]);

    useEffect(() => {
        const selected = formattedSelect?.find((f: any) => f.name === value)?.[
            "value"
        ];
        if (selected && selectRef?.current?.value !== selected) {
            setInitialValue(selected);
            selectRef.current.value = selected;
        }
    }, [value]);

    return (
        <InputGroup width={width}>
            {label?.length > 0 && <Label width={width || null}>{label}</Label>}
            <select
                ref={selectRef}
                className={cx(FlexOne(fullWidth))}
                disabled={locked}
                defaultValue={initialValue}
                onChange={(e) => onChange(e, name)}
            >
                {formattedSelect?.map((field: any, key: number) => (
                    <option
                        key={key}
                        value={field.value}
                    >
                        {field.name}
                    </option>
                ))}
            </select>
        </InputGroup>
    );
};
