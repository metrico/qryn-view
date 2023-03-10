import { css } from "@emotion/css";

export const LoaderCont = (theme: any) => css`
    transition: 0.25s all;
    position: absolute;
    left: 0;
    top: 0;
    background: ${theme.viewBg};
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

export const LogoCont = css`
    display: flex;
    flex: 1;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: 0.5s all;
`;
export const CenterCircle = css`
    @keyframes rotation {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(359deg);
        }
    }
    width: 100px;
    height: 100px;
    border-radius: 50%;
    //background: background: rgb(85,85,85);
    background: linear-gradient(
        90deg,
        rgba(85, 85, 85, 1) 0%,
        rgba(0, 0, 0, 1) 50%,
        rgba(73, 73, 73, 1) 100%
    );
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.5s all;
    animation: rotation 3s infinite linear;
    p {
        color: white;
        font-size: 12px;
    }
    img {
        height: 60px;
    }
`;

export const LogoBottom = (theme: any) => css`
    color: ${theme.textColor};
    font-size: 1em;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 15px;
    letter-spacing: 2px;
`;
