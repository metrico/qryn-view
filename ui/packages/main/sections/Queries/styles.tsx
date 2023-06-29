import {css} from '@emotion/css'

export const QueriesContainer = (theme:any) => css`
    background: ${theme.background};
    border: 1px solid ${theme.accentNeutral};
    border-radius: 3px;
    margin: 6px;
`;