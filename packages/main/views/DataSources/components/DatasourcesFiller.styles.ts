import { type QrynTheme } from "@ui/theme/types";

import { css } from "@emotion/css";

const InlineFlex = (theme: QrynTheme) => css`
    display: flex;
    flex-direction: column;
    flex: 1;
    flex-wrap: wrap;
    width: 400px;
    border: 1px solid ${theme.accentNeutral};
    padding: 5px;
    border-radius: 3px;
    margin-left: 10px;
`;

const oneForAllStyle = css`
    display: flex;
    padding: 4px 12px;
    font-size: 14px;
    border-radius: 4px;
    white-space: nowrap;
    align-items: center;
    justify-content: space-between;
`;

const FieldsCont = css`
    margin: 5px;
`;

const BasicAuth = css`
    margin-left: 20px;
    display: flex;
    align-items: center;
    span {
        font-size: 12px;
    }
`;

const ForAllButton = css`
    align-items: center;
    width: 100%;
    display: flex;
    margin-top: 10px;
    justify-content: space-between;
    flex: 1;
`;

export { InlineFlex, oneForAllStyle, FieldsCont, BasicAuth, ForAllButton };
