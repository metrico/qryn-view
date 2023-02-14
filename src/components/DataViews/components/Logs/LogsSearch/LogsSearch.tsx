import { css, cx } from "@emotion/css";
import { ThemeProvider } from "@emotion/react";

import { useTheme } from "../../QueryBuilder/hooks";
import { LogsFormBuilder } from "../../QueryBuilder/LogsFormBuilder";

export const FlexWrap = css`
    display: flex;
    flex-wrap: wrap;
    margin-top: 3px;
`;

export default function LogsSearch(props: any) {
    const {
        handleLogValueChange,
        data: { dataSourceId, hasStats },
        searchButton,
        logsRateButton,
        statsSwitch,
        isBuilder,
    } = props;

    const handleLogChange = (e: string) => {
        // this handles a string
        handleLogValueChange(e);
    };

    const theme = useTheme();

    return (
        <ThemeProvider theme={theme}>
            <div className={cx(FlexWrap)}>
                <LogsFormBuilder
                    dataSourceId={dataSourceId}
                    labelValueChange={handleLogChange}
                />
            </div>

            <div style={{ display: "flex", margin: "10px 0px" }}>
                {searchButton}
                {!isBuilder && logsRateButton}
                {hasStats && statsSwitch}
            </div>
        </ThemeProvider>
    );
}
