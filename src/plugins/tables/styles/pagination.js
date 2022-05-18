import { css } from "@emotion/css";

export const getPaginationStyles = () => {
    return {
        container: css`
            float: right;
        `,
        item: css`
            display: inline-block;
            padding-left: 10px;
            margin-bottom: 5px;
        `,
        ellipsis: css`
            transform: rotate(90deg);
        `,
    };
};
