import {css} from '@emotion/css'

export const QueriesContainer = (theme:any) => css`
    background: ${theme.mainBgColor};
    border: 1px solid ${theme.buttonBorder};
    border-radius: 3px;
    margin: 6px;
`;