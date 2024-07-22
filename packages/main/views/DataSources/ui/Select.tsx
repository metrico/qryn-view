import { cx, css } from "@emotion/css";
import DOMPurify from "isomorphic-dompurify";
import { useEffect, useMemo, useRef, useState } from "react";
import { InputGroup, Label } from "../styles";

const FlexOne = (fullWidth: any) => css`
    display: flex;
    min-width: 100px;
    flex: ${fullWidth ? 1 : 0};
    -ms-flex: ${fullWidth ? 1 : 0};
`;

export const Select = ({
    value,
    locked,
    onChange,
    opts,
    label,
    labelWidth,
    name,
    fullWidth,
    width,
}: any) => {
    const [initialValue, setInitialValue] = useState("");
    const selectRef: any = useRef(null);

    const formattedSelect = useMemo(() => {
        if (opts && opts[0] && typeof opts[0] === "string") {
            return opts?.map((k: string) => ({
                value: k,
                name: k,
            }));
        } else return opts;
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
            {label?.length > 0 && (
                <Label width={labelWidth || null}>{label}</Label>
            )}
            <select
                ref={selectRef}
                className={cx(FlexOne(fullWidth))}
                disabled={locked}
                defaultValue={DOMPurify.sanitize(initialValue)}
                onChange={(e) => onChange(e, name)}
            >
                {formattedSelect?.map((field: any, key: number) => (
                    <option key={key} value={DOMPurify.sanitize(field.value)}>
                        {field.name}
                    </option>
                ))}
            </select>
        </InputGroup>
    );
};
