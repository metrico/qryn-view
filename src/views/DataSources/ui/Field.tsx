import { InputGroup, Label, Input } from "../styles";

export const Field = (props: any) => {
    const { value, label, onChange, locked, type, placeholder, error} = props;
    return (
        <InputGroup>
            <Label>{label}</Label>
            <Input
                className="ds-input"
                disabled={locked}
                error={error||false}
                onChange={onChange}
                type={type}
                value={value}
                placeholder={placeholder}
            />
        </InputGroup>
    );
};
