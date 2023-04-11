import styled from "@emotion/styled";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setQueryResolution } from "../actions/setQueryResolution";
import { DEFAULT_RESOLUTION, RESOLUTION_OPTIONS } from "../helpers";

const Label = styled.div`
    color: ${({theme}: any) => theme.textColor};
    background: ${({theme}: any) => theme.buttonInactive};
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
    color: ${({theme}: any) => theme.textColor};
    background: ${({theme}: any) => theme.inputBg};
    border: 1px solid ${({theme}: any) => theme.buttonBorder};
    border-radius: 3px;
    padding: 4px 8px;
    line-height: 20px;
    flex: 1;
    max-width: 70px;
    &::-webkit-scrollbar {
        width: 5px;
        background: ${({theme}: any) => theme.inputBg};
    }
    &::-webkit-scrollbar-corner {
        background: transparent;
      }
    &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: ${({theme}: any) => theme.scrollbarThumb};
    }
`;

export default function QueryResolution() {
    const dispatch = useDispatch();
    const [resValue, setResValue]: any = useState(DEFAULT_RESOLUTION.value);

    function handleResChange(e: any): void {
        setResValue(parseInt(e.target.value));
        dispatch(setQueryResolution(parseInt(e.target.value)));
    }

    return (
        <>
            <Label>Resolution</Label>
            <ResSelect value={resValue.value} onChange={handleResChange}>
                {RESOLUTION_OPTIONS.map((res, idx) => (
                    <option key={idx} value={res.value}>
                        {res.label}
                    </option>
                ))}
            </ResSelect>
        </>
    );
}
