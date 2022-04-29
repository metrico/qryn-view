
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setQueryLimit } from "../../../actions";

const InputGroup = styled.div`
display:flex;
margin-right:10px;
`;

const Label = styled.div`
color:${props => props.theme.textColor};
background: ${props => props.theme.buttonInactive};
display:flex;
align-items: center;
justify-content: center;
font-size: 12px;
padding:0px 8px;
`;

const Input = styled.input`
flex:1;
background : ${props => props.theme.inputBg};
color: ${props => props.theme.textColor};
border: 1px solid ${props => props.theme.buttonBorder};
border-radius: 3px;
max-width: 60px;
padding-left: 8px;
`;

export default function QueryLimit() {
    const dispatch = useDispatch;
    const limit = useSelector((store) => store.limit);
    const [editedValue, setEditedValue] = useState(limit);

    useEffect(() => {
        setEditedValue(limit);
    }, [limit, setEditedValue]);
    function onLimitChange(e){
        const limit = e.target.value

        dispatch(setQueryLimit(limit))
    }
    return (
        <InputGroup>
            <Label>Query Limit</Label>
            <Input type={'number'} value={editedValue} onChange={onLimitChange} />
        </InputGroup>
    );
}
