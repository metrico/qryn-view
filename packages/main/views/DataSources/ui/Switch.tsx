import CustomSwitch from "@ui/qrynui/CustomSwitch/CustomSwitch";
import { InputGroup, Label } from "../styles";

export const QrynSwitch = (props: any) => {
    const { value, onChange, locked, label } = props;
    return (
        <InputGroup>
            <Label>{label}</Label>
            <CustomSwitch
                disabled={locked}
                defaultActive={value}
                onChange={onChange}
            />
        </InputGroup>
    );
};