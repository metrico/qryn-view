import { css } from "@emotion/css";
import { EmptyCell } from "../EmptyCell";

export const FooterCell = (props) => {
    const cell = css`
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    `;

    const list = css`
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    `;

    if (props.value && !Array.isArray(props.value)) {
        return <span>{props.value}</span>;
    }
    if (props.value && Array.isArray(props.value) && props.value.length > 0) {
        return (
            <ul className={cell}>
                {props.value.map((v, i) => {
                    const key = Object.keys(v)[0];
                    return(
                        <li className={list} key={i}>
                        <span>{key}:</span>
                        <span>{v[key]}</span>
                        </li>
                    )
                })}
            </ul>
        );
    }
    return EmptyCell;
};