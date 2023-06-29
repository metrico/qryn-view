import styled from "@emotion/styled";

const Label = styled.div`
    color: ${(props: any) => props.theme.contrast};
    background: ${(props: any) => props.theme.accentNeutral};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    padding: 0px 8px;
`;
const SwitchCont = styled.div`
    display: flex;
    align-items: center;
    font-size: 12px;
    background-color: ${(props: any) => props.theme.accentNeutral};

    border: 1px solid ${(props: any) => props.theme.accentNeutral};
    color: ${(props: any) => props.theme.contrast};
    border-radius: 3px;
    margin-right: 10px;
`;

const SwitchBtn: any = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    background: ${(props: any) =>
        props.selected ? props.theme.neutral : props.theme.accentNeutral};
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

export const styles = {
    Label,
    SwitchCont,
    SwitchBtn,
};
