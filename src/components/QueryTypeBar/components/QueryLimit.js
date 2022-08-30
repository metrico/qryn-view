import styled from "@emotion/styled";
import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setRightPanel } from "../../../actions/setRightPanel";
import { setLeftPanel } from "../../../actions/setLeftPanel";

const InputGroup = styled.div`
    display: flex;
    margin-right: 10px;
`;

const Label = styled.div`
    color: ${(props) => props.theme.textColor};
    background: ${(props) => props.theme.buttonInactive};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    padding: 0px 8px;
`;

const Input = styled.input`
    flex: 1;
    background: ${(props) => props.theme.inputBg};
    color: ${(props) => props.theme.textColor};
    border: 1px solid ${(props) => props.theme.buttonBorder};
    border-radius: 3px;
    max-width: 60px;
    padding-left: 8px;
`;

export function panelAction(name, value) {
    if (name === "left") {
        return setLeftPanel(value);
    }
    return setRightPanel(value);
}

export default function QueryLimit(props) {
    const dispatch = useDispatch();
    const { id } = props.data;
    const { name } = props;
    const panelQuery = useSelector((store) => store[name]);
    const [editedValue, setEditedValue] = useState(props.data.limit);
    const limitFromProps = useMemo(() => props.data.limit, [props.data.limit]);

    useEffect(() => {
        setEditedValue(limitFromProps);
    }, [limitFromProps, setEditedValue]);

    function onLimitChange(e) {
        const limitTxt = e.target.value;
        const panel = [...panelQuery];

        panel.forEach((query) => {
            if (query.id === id) {
                query.limit = limitTxt;
            }
        });

        dispatch(panelAction(name, panel));
    }

    return (
        <InputGroup>
            <Label>Query Limit</Label>
            <Input
                type={"number"}
                value={editedValue}
                onChange={onLimitChange}
            />
        </InputGroup>
    );
}
