import styled from "@emotion/styled";

export const MenuButton = styled.button`
    display: none;
    background: none;
    border: none;
    margin-left: 10px;
    color: ${(props) => (props.isActive ? "orange" : "#ddd")};
    cursor: pointer;

    @media screen and (max-width: 850px) {
        display: flex;
    }
    @media screen and (max-width: 560px) {
        flex: 1;
        justify-content: flex-end;
    }
`;

export const StatusBarCont = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
`;

export const StatusCont = styled.div`
    input {
        color: orange;
        background: #121212;
        border: none;
        margin: 3px;
        padding: 3px 6px;
        font-size: 13px;
        border-radius: 3px;
        &.limit {
            width: 50px;
        }
        &.url {
            width: 175px;
        }
        &.date-time-range {
            width: 120px;
        }
    }

    @media screen and (max-width: 565px) {
        display: none;
    }
`;
export const ApiSelectorStyled = styled.div`
    display: flex;
    align-items: center;
    @media screen and (max-width:850px) {
      display: none;
  }
    .selector {
        margin-left: 10px;
        .label {
            flex: 1;
            color: #bfbfbf;
            min-width: 51px;
            padding: 6px 6px;
            margin: 5px;
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            background: #12121267;
            border-radius: 4px;
        }
    }
    & div {
        display: flex;
        align-items: center;
    }
`;


export const UrlCopyButton = styled.button`
    display: flex;
    align-items: center;
    height: 20px;
    font-size: 18px;
    border: none;
    margin: 3px;
    padding: 5px 8px;
    background: #7b7b7b3b;
    color: ${({ isActive }) => (isActive ? "orange" : "#7b7b7b")};
    font-size: 0.9em;
    cursor: ${({ isActive }) => (isActive ? "pointer" : "not-allowed")};
    align-items: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    transition: 0.2s all;
    span {
        margin-left: 4px;
        text-transform: uppercase;
        font-size: 0.85em;
        color: #d1d1d1;
    }
    &:hover {
        background: #9e9e9e3b;
    }
`;