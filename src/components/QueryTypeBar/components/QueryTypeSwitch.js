import styled from "@emotion/styled";
import { useState } from "react";
const Label = styled.div`
color:${props => props.theme.textColor};
background: ${props => props.theme.buttonInactive};
display:flex;
align-items: center;
justify-content: center;
font-size: 12px;
padding:0px 8px;
`;
const QuerySwitchCont = styled.div`
    height:30px;
    display: flex;
    align-items: center;
    font-size: 12px;
    background-color: ${(props) => props.theme.buttonInactive};

    border: 1px solid ${(props) => props.theme.buttonBorder};
    color: ${(props) => props.theme.textColor};
    border-radius: 3px;
    margin-right:10px;
`;

const QuerySwitchBtn = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    background: ${(props) =>
        props.selected ? props.theme.buttonDefault : props.theme.buttonInactive};
    border-left: ${(props) =>
        props.position === "last"
            ? `1px solid ${props.theme.buttonBorder}`
            :  "none" };
    border-right: ${(props) =>
        props.position === "first"
            ? `1px solid ${props.theme.buttonBorder}`
            :  "none" };
    border-radius: ${({ position }) =>
        position === "first"
            ? "3px 0px 0px 3px"
            : position === "last"
            ? "0px 3px 3px 0px"
            : "0px"};
    flex: 1;
    height: 90%;
    
    padding: 0px 12px;
    font-size: 12px;
    line-height: 20px;
`;
const getBtnPos = (key, arr) => {
    const arrLen = arr.length;
    return key === 0 ? "first" : key === arrLen - 1 ? "last" : "center";
};

export default function QueryTypeSwitch(props) {
    const { options, defaultActive, onChange } = props;

    const [activeBtn, setActiveBtn] = useState(defaultActive);

    function setButtonValue(value) {
        setActiveBtn(value);
        onChange(value)
    }

    return (<>
    
   
        <Label>Query Type</Label>
        <QuerySwitchCont>
           
            {options &&
                options.map((value, key, arr) => (
                    <QuerySwitchBtn
                        key={key}
                        selected={value.value === activeBtn}
                        position={getBtnPos(key, arr)}
                        onClick={(e) => setButtonValue(value.value)}
                    >
                        {value.label}
                    </QuerySwitchBtn>
                ))}
        </QuerySwitchCont>
        </>
    );
}
