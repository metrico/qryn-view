import { InputGroup, Label, Input } from "../styles";

export const Field = (props) => {
    const { value, label, onChange, locked, type, placeholder } = props;
    return (
        <InputGroup>
            <Label>{label}</Label>
            <Input
                className="ds-input"
                disabled={locked}
                onChange={onChange}
                type={type}
                value={value}
                placeholder={placeholder}
            />
        </InputGroup>
    );
};
