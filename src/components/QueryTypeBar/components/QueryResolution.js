import styled from "@emotion/styled";
import { useState } from "react";
const Label = styled.div`
    color: ${(props) => props.theme.textColor};
    background: ${(props) => props.theme.buttonInactive};
    
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    padding: 0px 8px;
`;

const ResSelect = styled.select`
    cursor: pointer;

    position: relative;
    font-size: 14px;
    color: ${(props) => props.theme.textColor};
    background: ${(props) => props.theme.inputBg};
    border: 1px solid ${props => props.theme.buttonBorder};
    border-radius: 3px;
    padding: 4px 8px;
    line-height: 20px;
    flex: 1;
    max-width: 60px;
    &::-webkit-scrollbar {
        width: 5px;
        background: ${(props) => props.theme.inputBg};
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: ${(props) => props.theme.scrollbarThumb};
    }
`;

export default function QueryResolution() {
    const resolutions = ["1/1", "1/2", "1/3", "1/4", "1/10"];

    const [resValue, setResValue] = useState(resolutions[0]);

    function handleResChange(e) {
        setResValue(e);
    }

    return (
        <>
            <Label>Resolution</Label>
            <ResSelect value={resValue} onChange={handleResChange}>
                {resolutions.map((res, idx) => (
                    <option key={idx} value={res}>
                        {res}
                    </option>
                ))}
            </ResSelect>
        </>
    );
}
