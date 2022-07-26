import { setPanelsData } from "../../../actions/setPanelsData";
import styled from "@emotion/styled";
import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

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

const JSONClone = (arr) => {
    const arrToJSON = JSON.stringify(arr);
    const actArr = JSON.parse(arrToJSON);
    return actArr;
};

export default function QueryLimit(props) {
    const dispatch = useDispatch();
    const panels = useSelector(({ panels }) => panels);
    const [editedValue, setEditedValue] = useState(props.data.limit);

    const limitFromProps = useMemo(() => props.data.limit, [props.data.limit]);

    useEffect(() => {
        setEditedValue(limitFromProps);
    }, [limitFromProps, setEditedValue]);

    function onLimitChange(e) {
        const limitTxt = e.target.value;
        const panelName = props.name;
        const panel = panels[panelName];
        const actPanels = JSONClone(panels);
        let actQueries = JSONClone(panel.queries);
        for (let query of actQueries) {
            if (query.id === props.data.id) {
                query.limit = limitTxt;
            }
        }

        const finalPanel = {
            ...actPanels,
            [panelName]: {
                queries: [...actQueries],
            },
        };

        dispatch(setPanelsData(finalPanel));
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
