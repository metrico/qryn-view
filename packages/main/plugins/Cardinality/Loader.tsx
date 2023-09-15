import { css, cx } from "@emotion/css";
import React from "react";

const LoaderContainer = css`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    min-height: 300px;
`;

const LoaderStyle = css`
    border: 4px solid #f3f3f3; /* Light grey */
    border-top: 4px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 20px;
    height: 20px;
    margin-left: 4px;
    animation: spin 2s linear infinite;
    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

const Loader: React.FC = () => {
    return (
        <div className={cx(LoaderContainer)}>
            <div className={cx(LoaderStyle)}></div>
        </div>
    );
};

export default Loader;
