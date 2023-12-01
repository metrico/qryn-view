import { css, cx } from "@emotion/css";
import { useState, useEffect, InputHTMLAttributes, ChangeEvent } from "react";
import sanitizeWithSigns from "@ui/helpers/sanitizeWithSigns";

export const page_select = (theme: any) => css`
    color: ${theme.contrast};
    background: ${theme.deep};
    border: 1px solid ${theme.accentNeutral};
    border-radius: 3px;
    padding: 3px 8px;
    font-size: 12px;
`;

type Props = {
    theme: any;
    value: string | number;
    onChange: (value: string | number) => void;
    debounce?: number;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">;

export const DebouncedInput: React.FC<Props> = ({
    value: initialValue,
    onChange,
    debounce = 500,
    theme,

    ...props
}) => {
    const [value, setValue] = useState<number | string>(initialValue);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) =>
        setValue(event.target.value);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value);
        }, debounce);

        return () => clearTimeout(timeout);
        
    }, [value]);

    return (
        <input
            {...props}
            className={cx(page_select(theme))}
            value={sanitizeWithSigns(String(value))}
            onChange={handleInputChange}
        />
    );
};

export default DebouncedInput;
