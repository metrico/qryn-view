import styled from "@emotion/styled";
import { useEffect, useMemo, useState } from "react";
import { type QrynTheme } from "@ui/theme/types";
const Label: any = styled.div`
    color: ${(props: any) => props.theme.contrast};
    background: ${(props: any) => props.theme.shadow};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    white-space: nowrap;
    padding: 0px 10px;
`;
const QuerySwitchCont: any = styled.div`
    display: flex;
    align-items: center;
    font-size: 12px;
    background-color: ${(props: any) => props.theme.shadow};

    border: 1px solid ${(props: any) => props.theme.accentNeutral};
    color: ${(props: any) => props.theme.contrast};
    border-radius: 3px;
    margin-right: 10px;
`;

const QuerySwitchBtn: any = styled.div<{ theme: QrynTheme; selected: boolean }>`
    cursor: pointer;
    display: flex;
    align-items: center;
    background: ${(props) =>
        props.selected ? props.theme.alphaPlusNeutral : props.theme.shadow};
    border-left: ${(props: any) =>
        props.position === "last"
            ? `1px solid ${props.theme.accentNeutral}`
            : "none"};
    border-right: ${(props: any) =>
        props.position === "first"
            ? `1px solid ${props.theme.accentNeutral}`
            : "none"};
    border-radius: ${({ position }: any) =>
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
const getBtnPos = (key: any, arr: any) => {
    const arrLen = arr.length;
    return key === 0 ? "first" : key === arrLen - 1 ? "last" : "center";
};

export default function QueryTypeSwitch(props: any) {
    const { options, defaultActive, label, onChange }: any = props;

    const defaultact = useMemo(() => defaultActive, [defaultActive]);

    const [activeBtn, setActiveBtn] = useState(defaultact);
    useEffect(() => {
        setActiveBtn(defaultActive);
    }, [defaultActive]);

    function setButtonValue(value: any) {
        setActiveBtn(value);
        onChange(value);
    }

    return (
        <>
            <Label>{label}</Label>
            <QuerySwitchCont>
                {options &&
                    options.map((value: any, key: any, arr: any) => (
                        <QuerySwitchBtn
                            key={key}
                            selected={value.value === activeBtn}
                            defaultActive={defaultActive}
                            position={getBtnPos(key, arr)}
                            onClick={() => setButtonValue(value.value)}
                        >
                            {value.label}
                        </QuerySwitchBtn>
                    ))}
            </QuerySwitchCont>
        </>
    );
}
