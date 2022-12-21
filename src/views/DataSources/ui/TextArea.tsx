import { InputGroup, TextArea } from "../styles";
import { Label } from "../styles";

export function TextAreaField(props: any) {
    const { value, label, onChange, placeholder } = props;
    return (
        <InputGroup>
            <Label>{label}</Label>
            <TextArea
                className="ds-input"
                onChange={onChange}
                placeholder={placeholder}
                value={value}
            />
        </InputGroup>
    );
}
