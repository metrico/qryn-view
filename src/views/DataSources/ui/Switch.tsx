
import { Switch } from "@mui/material";
import { InputGroup, Label } from "../styles";

export const QrynSwitch = (props: any) => {
    const { value, onChange, locked, label } = props;
    return (
        <InputGroup>
            <Label>{label}</Label>
            <Switch
                disabled={locked}
                size={"small"}
                checked={value}
                onChange={onChange}
            />
        </InputGroup>
    );
};