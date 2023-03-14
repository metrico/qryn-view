import CopyLinkButton from "../copylinkbutton/CopyLinkButton";
import { ThemeProvider } from "@emotion/react";
import { useTheme } from "../../../DataViews/components/QueryBuilder/hooks";
import { css, cx } from "@emotion/css";

const StatusOptions = css`
    display: flex;
    align-items: center;
`;

const StatusSelectors = css`
    display: flex;
    align-items: center;
    .selector {
        margin-left: 10px;
        .label {
            flex: 1;
            color: #bfbfbf;
            white-space: nowrap;
            text-transform: uppercase;
            border-radius: 3px;
            font-size: 12px;
        }
    }
    & div {
        display: flex;
        align-items: center;
    }
`;

export function StatusBarSelectors() {
    const theme = useTheme();

    return (
        <ThemeProvider theme={theme}>
            <div className={cx(StatusOptions)}>
                <div className={cx(StatusSelectors)}>
                    <CopyLinkButton />
                </div>
            </div>
        </ThemeProvider>
    );
}
